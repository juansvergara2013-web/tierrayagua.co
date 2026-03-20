param(
  [Parameter(Mandatory = $true)]
  [string]$SourcePath,

  [Parameter(Mandatory = $true)]
  [string]$OutputPath,

  [string]$HexColor = "#21483D",

  [int]$AlphaThreshold = 24
)

Add-Type -AssemblyName System.Drawing

function Convert-HexToColor {
  param([string]$Value)

  $clean = $Value.TrimStart("#")
  if ($clean.Length -ne 6) {
    throw "HexColor debe tener formato RRGGBB."
  }

  $r = [Convert]::ToInt32($clean.Substring(0, 2), 16)
  $g = [Convert]::ToInt32($clean.Substring(2, 2), 16)
  $b = [Convert]::ToInt32($clean.Substring(4, 2), 16)

  return [System.Drawing.Color]::FromArgb(255, $r, $g, $b)
}

$source = Resolve-Path $SourcePath
$targetColor = Convert-HexToColor $HexColor

$bitmap = [System.Drawing.Bitmap]::new($source.Path)
$output = [System.Drawing.Bitmap]::new($bitmap.Width, $bitmap.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $bitmap.Height; $y++) {
  for ($x = 0; $x -lt $bitmap.Width; $x++) {
    $pixel = $bitmap.GetPixel($x, $y)
    $brightness = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))

    if ($brightness -le $AlphaThreshold) {
      $output.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      continue
    }

    $alpha = [Math]::Min(255, [Math]::Max(0, [int](($brightness / 255.0) * 255)))
    $output.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $targetColor.R, $targetColor.G, $targetColor.B))
  }
}

$outputDir = Split-Path -Parent $OutputPath
if ($outputDir) {
  New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$output.Save((Resolve-Path -LiteralPath $outputDir).Path + "\" + (Split-Path -Leaf $OutputPath), [System.Drawing.Imaging.ImageFormat]::Png)

$bitmap.Dispose()
$output.Dispose()

Write-Output "Logo exportado a $OutputPath"
