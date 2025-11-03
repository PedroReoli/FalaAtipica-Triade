@echo off
echo ============================================================
echo   Preenchimento Automatico - Formulario de Usabilidade
echo ============================================================
echo.

REM Mudar para o diretório do script
cd /d "%~dp0"

REM Verificar qual comando Python funciona
set PYTHON_CMD=
python --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python
    goto :found_python
)

py --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=py
    goto :found_python
)

python3 --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python3
    goto :found_python
)

echo [ERRO] Python nao esta instalado ou nao esta no PATH
echo Por favor, instale Python 3: https://www.python.org/downloads/
pause
exit /b 1

:found_python
echo [OK] Python encontrado: %PYTHON_CMD%
echo.

REM Verificar se requests está instalado
%PYTHON_CMD% -c "import requests" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Instalando biblioteca 'requests'...
    %PYTHON_CMD% -m pip install requests --user
    if errorlevel 1 (
        echo [AVISO] Erro ao instalar requests. Tentando continuar mesmo assim...
    )
    echo.
)

echo Executando script de preenchimento...
echo.

REM Executar o script Python
%PYTHON_CMD% fill-usability-form.py

echo.
pause

