$port = 4173
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Set-Location $root

if (Get-Command py -ErrorAction SilentlyContinue) {
  Write-Host "Servidor local iniciado en http://localhost:$port con py"
  py -m http.server $port
  exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  Write-Host "Servidor local iniciado en http://localhost:$port con python"
  python -m http.server $port
  exit $LASTEXITCODE
}

Write-Error "No se encontro py ni python en el sistema. Instala Python o ejecuta la web desde otro servidor local."
exit 1
