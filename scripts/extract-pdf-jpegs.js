const fs = require("fs");
const path = require("path");

function getJpegSize(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    if (length < 2) {
      return null;
    }

    offset += 2 + length;
  }

  return null;
}

function extractJpegsFromPdf(pdfPath, outputDir) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  fs.mkdirSync(outputDir, { recursive: true });

  const manifest = [];
  let index = 0;
  let cursor = 0;

  while (cursor < pdfBuffer.length - 1) {
    const soi = pdfBuffer.indexOf(Buffer.from([0xff, 0xd8]), cursor);
    if (soi === -1) {
      break;
    }

    const eoi = pdfBuffer.indexOf(Buffer.from([0xff, 0xd9]), soi + 2);
    if (eoi === -1) {
      break;
    }

    const jpegBuffer = pdfBuffer.subarray(soi, eoi + 2);
    const size = getJpegSize(jpegBuffer);
    const filename = `image-${String(index + 1).padStart(3, "0")}.jpg`;
    const filePath = path.join(outputDir, filename);

    fs.writeFileSync(filePath, jpegBuffer);

    manifest.push({
      file: filename,
      bytes: jpegBuffer.length,
      width: size?.width ?? null,
      height: size?.height ?? null,
    });

    index += 1;
    cursor = eoi + 2;
  }

  const manifestPath = path.join(outputDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  return manifest;
}

function main() {
  const [, , pdfArg, outputArg] = process.argv;

  if (!pdfArg) {
    console.error("Usage: node scripts/extract-pdf-jpegs.js <pdf-path> [output-dir]");
    process.exit(1);
  }

  const pdfPath = path.resolve(pdfArg);
  const outputDir = path.resolve(outputArg || path.join("assets", "brand", path.basename(pdfPath, path.extname(pdfPath))));

  const manifest = extractJpegsFromPdf(pdfPath, outputDir);

  console.log(`Extracted ${manifest.length} JPEG asset(s) to ${outputDir}`);
  manifest.forEach((asset) => {
    console.log(`${asset.file}\t${asset.width || "?"}x${asset.height || "?"}\t${asset.bytes} bytes`);
  });
}

main();
