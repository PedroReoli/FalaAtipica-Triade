@echo off
echo 🎨 Gerando favicons do FalaAtípica...
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Instale Node.js primeiro.
    pause
    exit /b 1
)

REM Executar script simples
echo 📁 Executando script de geração de favicons...
node scripts/simple-favicon.js

echo.
echo ✅ Script concluído!
echo.
echo 💡 Para melhor qualidade, instale ImageMagick e execute:
echo    node scripts/generate-favicon.js
echo.
pause
