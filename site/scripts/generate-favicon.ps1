# Script PowerShell para gerar favicons do FalaAtípica
# Requer PowerShell 5.0 ou superior

Write-Host "🎨 Gerando favicons do FalaAtípica..." -ForegroundColor Cyan
Write-Host ""

# Configurações
$LogoPath = Join-Path $PSScriptRoot "../public/images/falaatipica-logo.png"
$OutputDir = Join-Path $PSScriptRoot "../public"

# Verificar se a logo existe
if (-not (Test-Path $LogoPath)) {
    Write-Host "❌ Logo não encontrada em: $LogoPath" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Logo encontrada: $LogoPath" -ForegroundColor Green
Write-Host "📁 Diretório de saída: $OutputDir" -ForegroundColor Green
Write-Host ""

# Função para copiar arquivo
function Copy-FaviconFile {
    param(
        [string]$Source,
        [string]$Destination
    )
    
    try {
        Copy-Item $Source $Destination -Force
        $fileName = Split-Path $Destination -Leaf
        Write-Host "✅ Copiado: $fileName" -ForegroundColor Green
        return $true
    }
    catch {
        $fileName = Split-Path $Destination -Leaf
        Write-Host "❌ Erro ao copiar $fileName`: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Função para gerar manifest.json
function New-Manifest {
    $manifest = @{
        name = "FalaAtípica"
        short_name = "FalaAtípica"
        description = "Sistema completo de auxílio para crianças com atraso de fala"
        start_url = "/"
        display = "standalone"
        background_color = "#054776"
        theme_color = "#1e88e5"
        icons = @(
            @{
                src = "/favicon.png"
                sizes = "any"
                type = "image/png"
            },
            @{
                src = "/apple-touch-icon.png"
                sizes = "180x180"
                type = "image/png"
            }
        )
    }
    
    try {
        $manifestPath = Join-Path $OutputDir "manifest.json"
        $manifest | ConvertTo-Json -Depth 3 | Out-File -FilePath $manifestPath -Encoding UTF8
        Write-Host "✅ manifest.json gerado" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Erro ao gerar manifest.json: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Executar cópias
$successCount = 0
$tasks = @(
    @{ source = $LogoPath; dest = Join-Path $OutputDir "favicon.png" },
    @{ source = $LogoPath; dest = Join-Path $OutputDir "apple-touch-icon.png" },
    @{ source = $LogoPath; dest = Join-Path $OutputDir "favicon.ico" }
)

# Copiar arquivos
foreach ($task in $tasks) {
    if (Copy-FaviconFile -Source $task.source -Destination $task.dest) {
        $successCount++
    }
}

# Gerar manifest.json
if (New-Manifest) {
    $successCount++
}

Write-Host ""
Write-Host "📊 Resumo:" -ForegroundColor Yellow
Write-Host "✅ $successCount/$($tasks.Count + 1) arquivos processados com sucesso" -ForegroundColor Green

if ($successCount -eq ($tasks.Count + 1)) {
    Write-Host ""
    Write-Host "🎉 Favicons copiados com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Arquivos gerados:" -ForegroundColor Cyan
    Write-Host "   • favicon.png"
    Write-Host "   • favicon.ico"
    Write-Host "   • apple-touch-icon.png"
    Write-Host "   • manifest.json"
    Write-Host ""
    Write-Host "💡 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   1. Adicione os links no <head> do HTML"
    Write-Host "   2. Teste em diferentes dispositivos"
    Write-Host "   3. Para melhor qualidade, use o script com ImageMagick"
} else {
    Write-Host ""
    Write-Host "⚠️  Alguns arquivos não foram processados. Verifique os erros acima." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Pressione qualquer tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
