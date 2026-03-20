const fs = require("fs");
const path = require("path");

const outDir = path.resolve("assets/brand/sketch-illustrations");
fs.mkdirSync(outDir, { recursive: true });

const palettes = [
  { name: "lagoon", line: "#5f8f8a", fill: "#d7eeea", fill2: "#b9ddd7", accent: "#f3c7b5", bg: "#f7fbfa" },
  { name: "terracotta", line: "#9b7767", fill: "#f3ddd3", fill2: "#eac6b7", accent: "#c8dec9", bg: "#fffaf7" },
  { name: "moss", line: "#6c8b73", fill: "#deebdf", fill2: "#c3d8c4", accent: "#f1d9c7", bg: "#fbfcf7" },
  { name: "river", line: "#6b8fa8", fill: "#d8eaf5", fill2: "#bdd7e6", accent: "#f4d9cf", bg: "#f8fbfd" },
  { name: "clay", line: "#a37d6a", fill: "#f4e4d9", fill2: "#e7cdbf", accent: "#d6e6d7", bg: "#fffaf6" },
  { name: "lotus", line: "#877794", fill: "#eadff1", fill2: "#d8c7e4", accent: "#cfe7de", bg: "#fcf9fe" },
];

const manifest = [];

function writeSvg(name, category, width, height, svg, usage) {
  const file = `${name}.svg`;
  fs.writeFileSync(path.join(outDir, file), svg);
  manifest.push({ file, name, category, width, height, usage });
}

function svgWrap({ width = 512, height = 512, bg = "transparent", body }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  ${bg === "transparent" ? "" : `<rect width="${width}" height="${height}" fill="${bg}"/>`}
  ${body}
</svg>
`;
}

function wavePath(y, amp, freq, phase, width) {
  const step = width / 8;
  let d = `M 0 ${y}`;
  for (let i = 0; i < 8; i++) {
    const x1 = i * step + step / 3;
    const x2 = i * step + (2 * step) / 3;
    const x = (i + 1) * step;
    const y1 = y + Math.sin(i + phase) * amp * freq;
    const y2 = y - Math.cos(i + phase) * amp;
    d += ` C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`;
  }
  return d;
}

function makeWaveDivider(index) {
  const p = palettes[index % palettes.length];
  const y = 88 + (index % 5) * 8;
  const amp = 12 + (index % 4) * 4;
  const body = `
  <path d="${wavePath(y, amp, 1.1, index, 512)}" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="${wavePath(y + 28, amp * 0.8, 1.3, index + 1, 512)}" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>
  <path d="${wavePath(y + 50, amp * 0.65, 1.4, index + 2, 512)}" stroke="${p.accent}" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
  `;
  return svgWrap({ width: 512, height: 180, bg: p.bg, body });
}

function makeDroplet(index) {
  const p = palettes[index % palettes.length];
  const shift = index % 5;
  const body = `
  <path d="M256 82 C210 150 170 200 170 266 C170 338 224 392 256 392 C289 392 342 338 342 266 C342 201 303 151 256 82Z" fill="${p.fill}" stroke="${p.line}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M226 ${160 + shift * 4} C238 ${136 + shift * 3} 250 122 266 104" stroke="${p.accent}" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
  <path d="M210 280 C225 ${302 + shift * 2} 238 ${314 + shift * 3} 257 324" stroke="${p.fill2}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="${228 + shift * 5}" cy="${188 + shift * 3}" r="12" fill="${p.bg}" opacity="0.9"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeLeaf(index) {
  const p = palettes[index % palettes.length];
  const tilt = (index % 7) * 10 - 30;
  const body = `
  <g transform="translate(256 256) rotate(${tilt}) translate(-256 -256)">
    <path d="M108 274 C146 152 270 94 390 132 C366 250 308 368 186 394 C142 370 118 328 108 274Z" fill="${p.fill}" stroke="${p.line}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M150 330 C210 292 270 228 342 160" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
    <path d="M208 300 C202 264 188 236 166 210" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>
    <path d="M248 270 C248 234 264 202 292 178" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>
    <path d="M286 238 C302 260 314 286 316 314" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
  </g>`;
  return svgWrap({ body, bg: p.bg });
}

function makeReed(index) {
  const p = palettes[index % palettes.length];
  const count = 5 + (index % 4);
  let stems = "";
  for (let i = 0; i < count; i++) {
    const x = 92 + i * 58;
    const h = 170 + ((index + i) % 5) * 24;
    const bend = ((index + i) % 3) * 12 - 12;
    stems += `<path d="M${x} 430 C ${x + bend} 350, ${x + bend * 1.2} 290, ${x + bend * 0.6} ${430 - h}" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>`;
    stems += `<ellipse cx="${x + bend * 0.5}" cy="${405 - h}" rx="11" ry="28" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>`;
    stems += `<path d="M${x} ${330 + i * 4} C ${x - 24} ${300 + i * 2}, ${x - 36} ${280 + i * 2}, ${x - 42} ${254 + i * 2}" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>`;
    stems += `<path d="M${x} ${298 + i * 5} C ${x + 26} ${272 + i * 2}, ${x + 36} ${244 + i * 2}, ${x + 42} ${218 + i * 2}" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>`;
  }
  const water = `<path d="${wavePath(444, 8, 1.1, index, 512)}" stroke="${p.fill2}" stroke-width="5" stroke-linecap="round"/>`;
  return svgWrap({ body: `${stems}${water}`, bg: p.bg });
}

function makeStoneCluster(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <ellipse cx="148" cy="320" rx="76" ry="52" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>
  <ellipse cx="252" cy="340" rx="92" ry="60" fill="${p.fill2}" stroke="${p.line}" stroke-width="5"/>
  <ellipse cx="364" cy="314" rx="68" ry="48" fill="${p.accent}" stroke="${p.line}" stroke-width="5" opacity="0.8"/>
  <path d="M98 310 C122 298 146 296 176 302" stroke="${p.bg}" stroke-width="4" stroke-linecap="round"/>
  <path d="M214 334 C244 314 280 312 316 324" stroke="${p.bg}" stroke-width="4" stroke-linecap="round"/>
  <path d="M334 306 C352 296 368 294 388 300" stroke="${p.bg}" stroke-width="4" stroke-linecap="round"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeSun(index) {
  const p = palettes[index % palettes.length];
  const rays = [];
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12;
    const x1 = 256 + Math.cos(angle) * 112;
    const y1 = 256 + Math.sin(angle) * 112;
    const x2 = 256 + Math.cos(angle) * 176;
    const y2 = 256 + Math.sin(angle) * 176;
    rays.push(`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${p.accent}" stroke-width="6" stroke-linecap="round"/>`);
  }
  const body = `
  ${rays.join("")}
  <circle cx="256" cy="256" r="104" fill="${p.fill}" stroke="${p.line}" stroke-width="6"/>
  <path d="M210 250 C226 224 248 214 278 218 C304 222 320 236 330 256" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="M212 300 C244 322 282 322 312 300" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeCloud(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <path d="M130 324 C92 322 72 296 74 266 C76 236 98 214 128 214 C138 172 176 144 220 150 C248 108 318 110 344 152 C392 144 438 182 438 236 C466 244 486 270 484 304 C482 344 450 366 412 364 L154 364 C144 364 136 362 128 356 C118 348 114 336 130 324Z" fill="${p.fill}" stroke="${p.line}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M166 260 C196 234 234 224 278 228" stroke="${p.fill2}" stroke-width="5" stroke-linecap="round"/>
  <path d="M194 294 C236 278 278 276 320 286" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeRoot(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <path d="M256 60 C256 112 256 148 256 202" stroke="${p.line}" stroke-width="6" stroke-linecap="round"/>
  <path d="M256 198 C224 236 198 264 170 304" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="M256 198 C286 236 316 266 350 312" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="M210 250 C190 270 174 290 148 346" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>
  <path d="M188 286 C164 300 146 326 132 372" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
  <path d="M304 252 C332 276 352 304 376 350" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>
  <path d="M330 292 C356 310 372 336 390 382" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="256" cy="48" rx="46" ry="22" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeMicrobe(index) {
  const p = palettes[index % palettes.length];
  const spikes = 8 + (index % 5);
  let spikePaths = "";
  for (let i = 0; i < spikes; i++) {
    const angle = (Math.PI * 2 * i) / spikes;
    const x1 = 256 + Math.cos(angle) * 118;
    const y1 = 256 + Math.sin(angle) * 118;
    const x2 = 256 + Math.cos(angle) * 170;
    const y2 = 256 + Math.sin(angle) * 170;
    spikePaths += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q ${(256 + Math.cos(angle + 0.1) * 182).toFixed(1)} ${(256 + Math.sin(angle + 0.1) * 182).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>`;
  }
  const body = `
  ${spikePaths}
  <circle cx="256" cy="256" r="114" fill="${p.fill}" stroke="${p.line}" stroke-width="6"/>
  <circle cx="218" cy="232" r="20" fill="${p.fill2}" stroke="${p.line}" stroke-width="4"/>
  <circle cx="300" cy="278" r="28" fill="${p.accent}" stroke="${p.line}" stroke-width="4" opacity="0.8"/>
  <circle cx="274" cy="212" r="12" fill="${p.bg}"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeWetlandSection(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <path d="M48 334 L464 334 L464 394 L48 394 Z" fill="${p.fill2}" stroke="${p.line}" stroke-width="5"/>
  <path d="M48 290 C112 276 168 280 228 292 C278 302 338 302 464 286 L464 334 L48 334 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>
  <path d="${wavePath(276, 10, 1.1, index, 416).replace("M 0", "M 48")}" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="136" cy="362" r="14" fill="${p.bg}" opacity="0.8"/>
  <circle cx="228" cy="368" r="10" fill="${p.bg}" opacity="0.8"/>
  <circle cx="322" cy="358" r="16" fill="${p.bg}" opacity="0.8"/>
  <path d="M116 290 C114 254 114 226 116 186" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="M182 296 C182 258 182 232 180 192" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="M252 298 C250 260 250 224 252 178" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="M322 298 C324 258 326 230 324 196" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <path d="M392 292 C392 256 392 228 392 188" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="116" cy="170" rx="18" ry="34" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>
  <ellipse cx="182" cy="176" rx="18" ry="34" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>
  <ellipse cx="252" cy="164" rx="18" ry="34" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>
  <ellipse cx="324" cy="178" rx="18" ry="34" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>
  <ellipse cx="392" cy="168" rx="18" ry="34" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeSoilLayer(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <path d="M42 172 C118 152 190 164 266 178 C332 192 398 196 470 176 L470 244 L42 244 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="5"/>
  <path d="M42 244 C116 226 194 234 264 248 C338 262 404 266 470 250 L470 318 L42 318 Z" fill="${p.fill2}" stroke="${p.line}" stroke-width="5"/>
  <path d="M42 318 C122 308 200 314 274 328 C348 342 414 344 470 334 L470 402 L42 402 Z" fill="${p.accent}" stroke="${p.line}" stroke-width="5" opacity="0.75"/>
  <path d="${wavePath(176, 10, 1.1, index, 428).replace("M 0", "M 42")}" stroke="${p.bg}" stroke-width="4" stroke-linecap="round"/>
  <path d="${wavePath(252, 8, 1.2, index + 1, 428).replace("M 0", "M 42")}" stroke="${p.bg}" stroke-width="4" stroke-linecap="round"/>
  <path d="${wavePath(332, 7, 1.0, index + 2, 428).replace("M 0", "M 42")}" stroke="${p.bg}" stroke-width="4" stroke-linecap="round"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeWatercolorBlob(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <path d="M132 182 C146 110 254 84 334 126 C402 162 424 242 384 320 C350 388 252 422 176 384 C114 352 94 278 132 182Z" fill="${p.fill}" opacity="0.9"/>
  <path d="M118 202 C138 122 252 96 332 140 C394 174 412 252 374 316 C338 376 256 402 184 372 C124 344 98 274 118 202Z" stroke="${p.line}" stroke-width="5" stroke-linejoin="round" stroke-dasharray="10 14"/>
  <circle cx="194" cy="214" r="24" fill="${p.fill2}" opacity="0.85"/>
  <circle cx="316" cy="198" r="18" fill="${p.accent}" opacity="0.7"/>
  <circle cx="294" cy="304" r="32" fill="${p.bg}" opacity="0.65"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeBorder(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <rect x="24" y="24" width="464" height="464" rx="28" stroke="${p.line}" stroke-width="5" stroke-dasharray="${12 + (index % 4) * 2} ${18 - (index % 3) * 2}"/>
  <path d="M48 86 C86 48 120 42 162 48" stroke="${p.accent}" stroke-width="5" stroke-linecap="round"/>
  <path d="M350 48 C394 44 428 52 462 86" stroke="${p.fill2}" stroke-width="5" stroke-linecap="round"/>
  <path d="M52 432 C92 466 130 474 174 464" stroke="${p.fill2}" stroke-width="5" stroke-linecap="round"/>
  <path d="M344 468 C392 474 434 456 462 426" stroke="${p.accent}" stroke-width="5" stroke-linecap="round"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeCornerFlourish(index) {
  const p = palettes[index % palettes.length];
  const flip = index % 2 === 0 ? 1 : -1;
  const body = `
  <g transform="translate(${flip === 1 ? 0 : 512} 0) scale(${flip} 1)">
    <path d="M68 74 C104 82 132 108 146 144 C152 174 150 204 136 236" stroke="${p.line}" stroke-width="6" stroke-linecap="round"/>
    <path d="M110 86 C168 90 204 120 218 176" stroke="${p.fill2}" stroke-width="5" stroke-linecap="round"/>
    <path d="M70 162 C102 146 130 140 162 144" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="154" cy="140" rx="18" ry="34" fill="${p.fill}" stroke="${p.line}" stroke-width="4"/>
    <ellipse cx="214" cy="176" rx="14" ry="28" fill="${p.fill2}" stroke="${p.line}" stroke-width="4"/>
  </g>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeBadge(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <path d="M256 74 L314 96 L366 78 L394 134 L446 168 L430 228 L460 280 L420 328 L424 390 L362 404 L324 446 L262 432 L204 450 L160 408 L98 394 L94 332 L58 278 L86 224 L70 162 L126 132 L152 80 L214 96 Z" fill="${p.fill}" stroke="${p.line}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="256" cy="256" r="88" fill="${p.bg}" stroke="${p.fill2}" stroke-width="5"/>
  <path d="M202 256 C218 224 240 208 270 206 C304 206 326 222 340 252 C332 286 308 308 272 316 C234 316 212 298 202 256Z" stroke="${p.accent}" stroke-width="5" fill="none" stroke-linejoin="round"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makeScene(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <path d="M0 318 C80 286 152 282 232 306 C306 330 382 332 512 288 V512 H0 Z" fill="${p.fill}" opacity="0.95"/>
  <path d="M0 362 C76 336 154 336 230 360 C312 386 398 386 512 344 V512 H0 Z" fill="${p.fill2}" opacity="0.92"/>
  <path d="M0 410 C96 396 188 404 278 430 C360 454 432 456 512 430 V512 H0 Z" fill="${p.accent}" opacity="0.6"/>
  <path d="${wavePath(272, 16, 1.1, index, 512)}" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="${96 + (index % 4) * 32}" cy="112" r="42" fill="${p.fill2}" stroke="${p.line}" stroke-width="5"/>
  <path d="M348 308 C348 258 348 220 346 174" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="346" cy="156" rx="22" ry="42" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>
  <path d="M394 316 C394 270 396 238 396 188" stroke="${p.line}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="396" cy="174" rx="18" ry="38" fill="${p.accent}" stroke="${p.line}" stroke-width="4"/>
  `;
  return svgWrap({ body, bg: p.bg });
}

function makePatternTile(index) {
  const p = palettes[index % palettes.length];
  const body = `
  <rect width="256" height="256" fill="${p.bg}"/>
  <path d="${wavePath(62, 7, 1.1, index, 256)}" stroke="${p.fill2}" stroke-width="4" stroke-linecap="round"/>
  <path d="${wavePath(126, 7, 1.1, index + 1, 256)}" stroke="${p.accent}" stroke-width="4" stroke-linecap="round"/>
  <path d="${wavePath(190, 7, 1.1, index + 2, 256)}" stroke="${p.line}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="${44 + (index % 4) * 42}" cy="${46 + (index % 5) * 24}" r="14" fill="${p.fill}" stroke="${p.line}" stroke-width="3"/>
  <circle cx="${172 + (index % 3) * 18}" cy="${188 - (index % 4) * 22}" r="18" fill="${p.fill2}" stroke="${p.line}" stroke-width="3"/>
  `;
  return svgWrap({ width: 256, height: 256, bg: p.bg, body });
}

const generators = [
  {
    category: "dividers",
    fn: makeWaveDivider,
    usage: "Separador horizontal para secciones, hero, CTA o footer.",
    names: [
      "onda-suave-laguna",
      "onda-clara-rio",
      "onda-pastel-cauce",
      "onda-triple-brisa",
      "onda-lenta-aguamarina",
      "onda-terra-agua",
      "onda-editorial-humedal",
      "onda-jardin-pluvial",
      "onda-borde-estanque",
      "onda-flujo-natural",
      "onda-ribera-clara",
      "onda-bruma-verde",
      "onda-trazo-corriente",
      "onda-balsa-organica",
      "onda-canal-sereno",
      "onda-filtro-vivo",
      "onda-superficie-calma",
      "onda-senda-del-agua",
    ],
  },
  {
    category: "icons",
    fn: makeDroplet,
    usage: "Icono decorativo para bloques de agua, saneamiento y sostenibilidad.",
    names: [
      "gota-agua-brisa",
      "gota-limpia-laguna",
      "gota-calma-rio",
      "gota-humedal-pastel",
      "gota-viva-cauce",
      "gota-clara-jardin",
      "gota-trazo-natural",
      "gota-organica-brote",
      "gota-ambiental-suave",
      "gota-reserva-serena",
      "gota-flujo-verde",
      "gota-naciente-agua",
      "gota-eco-armonia",
      "gota-purificacion-clara",
      "gota-ciclo-hidrico",
      "gota-renueva-agua",
    ],
  },
  {
    category: "icons",
    fn: makeLeaf,
    usage: "Ilustracion organica para marca, naturaleza y bioconstruccion.",
    names: [
      "hoja-territorio-claro",
      "hoja-suave-brote",
      "hoja-organica-ribera",
      "hoja-natural-monte",
      "hoja-ligera-agua",
      "hoja-senda-verde",
      "hoja-brisa-tierra",
      "hoja-viva-pastel",
      "hoja-cauce-botanico",
      "hoja-jardin-humedal",
      "hoja-eco-trazo",
      "hoja-loto-rustico",
      "hoja-filtro-vivo",
      "hoja-cobijo-natural",
      "hoja-ladera-verde",
      "hoja-brote-editorial",
    ],
  },
  {
    category: "wetlands",
    fn: makeReed,
    usage: "Elemento vegetal para humedales, filtros y fondos tematicos.",
    names: [
      "juncos-borde-humedal",
      "juncos-orilla-serena",
      "juncos-lamina-de-agua",
      "juncos-filtro-natural",
      "juncos-ribera-pastel",
      "juncos-vivero-organico",
      "juncos-canal-vivo",
      "juncos-estanque-claro",
      "juncos-purificacion-verde",
      "juncos-jardin-agua",
      "juncos-raiz-filtrante",
      "juncos-paisaje-humedo",
      "juncos-biologico-suave",
      "juncos-margen-natural",
    ],
  },
  {
    category: "textures",
    fn: makeStoneCluster,
    usage: "Piedras suaves para cards, fondos y marcos de seccion.",
    names: [
      "piedras-rio-calmo",
      "piedras-canto-redondo",
      "piedras-jardin-seco",
      "piedras-lecho-filtrante",
      "piedras-base-natural",
      "piedras-estanque-suave",
      "piedras-ribera-pastel",
      "piedras-sustrato-vivo",
      "piedras-borde-organico",
      "piedras-suelo-humedo",
      "piedras-terra-calma",
      "piedras-flujo-mineral",
    ],
  },
  {
    category: "icons",
    fn: makeSun,
    usage: "Sello ilustrado para energia, territorio y ciclos naturales.",
    names: [
      "sol-ciclo-natural",
      "sol-calido-habitat",
      "sol-territorio-sereno",
      "sol-jornada-verde",
      "sol-luz-del-agua",
      "sol-cosecha-pastel",
      "sol-eco-radial",
      "sol-tierra-y-brisa",
      "sol-claro-bioclimatico",
      "sol-respiro-natural",
    ],
  },
  {
    category: "icons",
    fn: makeCloud,
    usage: "Nube decorativa para encabezados, heroes y bloques editoriales.",
    names: [
      "nube-brisa-clara",
      "nube-lluvia-suave",
      "nube-cielo-pastel",
      "nube-estacion-humeda",
      "nube-jardin-pluvial",
      "nube-aire-natural",
      "nube-neblina-verde",
      "nube-ciclo-del-agua",
      "nube-cima-serena",
      "nube-ambiente-calmo",
    ],
  },
  {
    category: "soil",
    fn: makeRoot,
    usage: "Red organica para secciones de tierra, procesos y estructura natural.",
    names: [
      "raices-suelo-vivo",
      "raices-red-organica",
      "raices-estructura-natural",
      "raices-territorio-humedo",
      "raices-filtracion-tierra",
      "raices-trama-verde",
      "raices-cimiento-vivo",
      "raices-base-biologica",
      "raices-capilar-del-suelo",
      "raices-conexion-natural",
    ],
  },
  {
    category: "science",
    fn: makeMicrobe,
    usage: "Visual abstracto para tratamiento, biologia y depuracion del agua.",
    names: [
      "microvida-agua-viva",
      "microvida-filtracion-natural",
      "microvida-depuracion-clara",
      "microvida-biofiltro-pastel",
      "microvida-trama-biologica",
      "microvida-ciclo-microbiano",
      "microvida-laguna-activa",
      "microvida-tratamiento-vivo",
      "microvida-equilibrio-agua",
      "microvida-filtro-organico",
      "microvida-humedal-biologico",
      "microvida-capa-activa",
    ],
  },
  {
    category: "systems",
    fn: makeWetlandSection,
    usage: "Corte simplificado de humedal para piezas educativas o decorativas.",
    names: [
      "corte-humedal-juncos",
      "corte-humedal-cauce",
      "corte-humedal-filtrante",
      "corte-humedal-vivo",
      "corte-humedal-pastel",
      "corte-humedal-ecologico",
      "corte-humedal-ribera",
      "corte-humedal-jardin",
      "corte-humedal-estanque",
      "corte-humedal-natural",
    ],
  },
  {
    category: "soil",
    fn: makeSoilLayer,
    usage: "Capas de suelo para fondos, diagramas y narrativa de bioconstruccion.",
    names: [
      "capas-suelo-arcilla",
      "capas-suelo-grava",
      "capas-suelo-filtrante",
      "capas-suelo-organico",
      "capas-suelo-rustico",
      "capas-suelo-terreno",
      "capas-suelo-bioclimatico",
      "capas-suelo-humedo",
      "capas-suelo-natural",
      "capas-suelo-sustrato",
    ],
  },
  {
    category: "backgrounds",
    fn: makeWatercolorBlob,
    usage: "Mancha pastel para destacar citas, titulos o modulos.",
    names: [
      "mancha-pastel-laguna",
      "mancha-pastel-terracota",
      "mancha-pastel-musgo",
      "mancha-pastel-ribera",
      "mancha-pastel-agua-clara",
      "mancha-pastel-cauce",
      "mancha-pastel-hojarasca",
      "mancha-pastel-jardin",
      "mancha-pastel-filtro",
      "mancha-pastel-bioconstruccion",
    ],
  },
  {
    category: "frames",
    fn: makeBorder,
    usage: "Marco tipo sketch para quotes, fotos o diagramas.",
    names: [
      "marco-editorial-rio",
      "marco-organico-humedal",
      "marco-bioclimatico-suave",
      "marco-pastel-tierra",
      "marco-natural-cauce",
      "marco-trazo-jardin",
      "marco-sereno-laguna",
      "marco-rustico-vivo",
    ],
  },
  {
    category: "frames",
    fn: makeCornerFlourish,
    usage: "Esquina decorativa para layouts editoriales y secciones suaves.",
    names: [
      "esquina-botanica-laguna",
      "esquina-botanica-ribera",
      "esquina-botanica-suave",
      "esquina-botanica-jardin",
      "esquina-botanica-cauce",
      "esquina-botanica-monte",
      "esquina-botanica-filtro",
      "esquina-botanica-tierra",
    ],
  },
  {
    category: "badges",
    fn: makeBadge,
    usage: "Insignia organica para iconos destacados o portadas de recursos.",
    names: [
      "sello-organico-agua",
      "sello-organico-humedal",
      "sello-organico-territorio",
      "sello-organico-biofiltro",
      "sello-organico-natural",
      "sello-organico-vivo",
      "sello-organico-sustrato",
      "sello-organico-ribera",
    ],
  },
  {
    category: "backgrounds",
    fn: makeScene,
    usage: "Escena pastel para headers, separadores y portadas visuales.",
    names: [
      "paisaje-ribera-pastel",
      "paisaje-humedal-sereno",
      "paisaje-laguna-suave",
      "paisaje-territorio-verde",
      "paisaje-jardin-pluvial",
      "paisaje-bioclimatico-calmo",
      "paisaje-cauce-organico",
      "paisaje-estanque-natural",
    ],
  },
  {
    category: "patterns",
    fn: makePatternTile,
    usage: "Patron repetible para fondos y texturas de marca.",
    names: [
      "patron-rio-canto",
      "patron-gota-musgo",
      "patron-ondas-arcilla",
      "patron-laguna-clara",
      "patron-ribera-suave",
      "patron-hojas-y-agua",
      "patron-cauce-pastel",
      "patron-sustrato-organico",
      "patron-piedras-y-rio",
      "patron-lluvia-serena",
      "patron-jardin-humedo",
      "patron-ecosistema-vivo",
    ],
  },
];

for (const group of generators) {
  for (let i = 1; i <= group.names.length; i++) {
    const name = group.names[i - 1];
    const svg = group.fn(i - 1);
    const dims = group.category === "patterns" ? { w: 256, h: 256 } : group.category === "dividers" ? { w: 512, h: 180 } : { w: 512, h: 512 };
    writeSvg(name, group.category, dims.w, dims.h, svg, group.usage);
  }
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

const readme = [
  "# Sketch Illustrations",
  "",
  "Coleccion de elementos decorativos en SVG tipo sketch con colores pasteles.",
  "",
  `Total de assets: ${manifest.length}`,
  "",
  "Categorias:",
  ...[...new Set(manifest.map((m) => `- ${m.category}`))],
  "",
  "Uso sugerido:",
  "- fondos suaves de hero",
  "- divisores entre secciones",
  "- marcos editoriales",
  "- iconos para cards o bullets",
  "- patrones de textura",
  "- apoyo visual para humedales, agua, suelo y bioconstruccion",
].join("\n");

fs.writeFileSync(path.join(outDir, "README.md"), readme);

console.log(`Generated ${manifest.length} sketch illustration assets in ${outDir}`);
