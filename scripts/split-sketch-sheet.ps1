$source = Join-Path $PSScriptRoot "..\assets\brand\sketch-illustrations\imagenes--dividir.png"
$outputDir = Join-Path $PSScriptRoot "..\assets\brand\sketch-illustrations\fraccionadas"
$manifestPath = Join-Path $outputDir "manifest.json"

$cuts = @(
  @{ file = "01-humedal-superficial.png"; name = "Humedal superficial"; x = 20; y = 50; width = 540; height = 280 },
  @{ file = "02-laboratorio-y-registro.png"; name = "Laboratorio y registro"; x = 555; y = 10; width = 450; height = 320 },
  @{ file = "03-construccion-rural.png"; name = "Construccion rural"; x = 1020; y = 20; width = 470; height = 290 },
  @{ file = "04-humedal-en-paisaje.png"; name = "Humedal en paisaje"; x = 20; y = 280; width = 540; height = 300; maskTop = 90 },
  @{ file = "05-diagrama-biofiltro.png"; name = "Diagrama biofiltro"; x = 515; y = 240; width = 545; height = 330; maskTop = 78 },
  @{ file = "06-impacto-en-rio.png"; name = "Impacto en rio"; x = 1060; y = 270; width = 430; height = 310 },
  @{ file = "07-descarga-en-humedal.png"; name = "Descarga en humedal"; x = 15; y = 575; width = 540; height = 280; maskTop = 100 },
  @{ file = "08-sistema-en-vivienda.png"; name = "Sistema en vivienda"; x = 480; y = 545; width = 580; height = 305; maskTop = 110 },
  @{ file = "09-proteccion-planetaria.png"; name = "Proteccion planetaria"; x = 1045; y = 555; width = 445; height = 300; maskTop = 150 }
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $source)) {
  throw "No se encontro el archivo fuente: $source"
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$image = [System.Drawing.Bitmap]::new($source)
$manifest = @()

try {
  foreach ($cut in $cuts) {
    $rect = [System.Drawing.Rectangle]::new($cut.x, $cut.y, $cut.width, $cut.height)
    $target = Join-Path $outputDir $cut.file
    $crop = $image.Clone($rect, $image.PixelFormat)

    try {
      if ($cut.ContainsKey("maskTop") -and $cut.maskTop -gt 0) {
        $graphics = [System.Drawing.Graphics]::FromImage($crop)
        try {
          $brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
          $graphics.FillRectangle($brush, 0, 0, $cut.width, $cut.maskTop)
          $brush.Dispose()
        }
        finally {
          $graphics.Dispose()
        }
      }

      $crop.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $crop.Dispose()
    }

    $manifest += [PSCustomObject]@{
      file = $cut.file
      name = $cut.name
      x = $cut.x
      y = $cut.y
      width = $cut.width
      height = $cut.height
      source = "imagenes--dividir.png"
    }
  }
}
finally {
  $image.Dispose()
}

$manifest | ConvertTo-Json -Depth 3 | Set-Content -Path $manifestPath -Encoding UTF8

Write-Host "Se generaron $($cuts.Count) imagenes en $outputDir"
