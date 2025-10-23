@echo off
echo ========================================
echo   ORGANIZANDO PASTA DE IMAGENS
echo ========================================

REM Criar estrutura de pastas
echo Criando estrutura de pastas...
mkdir "public\images\logos" 2>nul
mkdir "public\images\icons" 2>nul
mkdir "public\images\favicons" 2>nul
mkdir "public\images\assets" 2>nul

REM Mover logos
echo Movendo logos...
move "public\images\falaatipica-logo.png" "public\images\logos\" 2>nul
move "public\images\falaatipica-logo-letras.png" "public\images\logos\" 2>nul

REM Mover favicons
echo Movendo favicons...
move "public\favicon.ico" "public\images\favicons\" 2>nul
move "public\favicon.png" "public\images\favicons\" 2>nul
move "public\favicon-16x16.png" "public\images\favicons\" 2>nul
move "public\favicon-32x32.png" "public\images\favicons\" 2>nul
move "public\apple-touch-icon.png" "public\images\favicons\" 2>nul
move "public\android-chrome-192x192.png" "public\images\favicons\" 2>nul
move "public\android-chrome-512x512.png" "public\images\favicons\" 2>nul

REM Mover ícones SVG
echo Movendo ícones SVG...
move "public\file.svg" "public\images\icons\" 2>nul
move "public\globe.svg" "public\images\icons\" 2>nul
move "public\window.svg" "public\images\icons\" 2>nul

REM Mover outros assets
echo Movendo outros assets...
move "public\next.svg" "public\images\assets\" 2>nul
move "public\vercel.svg" "public\images\assets\" 2>nul

REM Criar links simbólicos para favicons na raiz (para compatibilidade)
echo Criando links simbólicos para compatibilidade...
copy "public\images\favicons\favicon.ico" "public\favicon.ico" 2>nul
copy "public\images\favicons\favicon.png" "public\favicon.png" 2>nul
copy "public\images\favicons\apple-touch-icon.png" "public\apple-touch-icon.png" 2>nul

echo.
echo ========================================
echo   ORGANIZAÇÃO CONCLUÍDA!
echo ========================================
echo.
echo Estrutura criada:
echo public\images\logos\          - Logos do projeto
echo public\images\icons\          - Ícones SVG
echo public\images\favicons\       - Favicons e ícones de app
echo public\images\assets\         - Outros assets
echo.
echo Links simbólicos criados na raiz para compatibilidade.
echo.
pause
