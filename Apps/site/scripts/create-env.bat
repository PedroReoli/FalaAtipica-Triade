@echo off
echo 🚀 Criando arquivo .env para FalaAtípica Parcerias...
echo.

REM Verificar se o arquivo .env já existe
if exist ".env" (
    echo ⚠️  Arquivo .env já existe!
    echo.
    set /p overwrite="Deseja sobrescrever? (s/n): "
    if /i "%overwrite%" neq "s" (
        echo ❌ Operação cancelada.
        pause
        exit /b 1
    )
)

REM Criar arquivo .env
echo 📝 Criando arquivo .env...
(
echo # Configuração do Google Forms - FalaAtípica Parcerias
echo # URL do Google Forms ^(trocar /viewform por /formResponse^)
echo NEXT_PUBLIC_GOOGLE_FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLScFAaA4nSu-3sgfVpiPeubZXcsRnUa7upch6uuFs7QE22ORQA/formResponse"
echo.
echo # IDs dos campos ^(obtidos via link pré-preenchido^)
echo NEXT_PUBLIC_FORM_FIELD_NOME_EMPRESA="entry.176801527"
echo NEXT_PUBLIC_FORM_FIELD_EMAIL="entry.1213378608"
echo NEXT_PUBLIC_FORM_FIELD_ENDERECO="entry.1975365640"
echo NEXT_PUBLIC_FORM_FIELD_TELEFONE="entry.1131483063"
echo NEXT_PUBLIC_FORM_FIELD_DO_QUE_GOSTOU="entry.844015958"
echo NEXT_PUBLIC_FORM_FIELD_SUGESTOES="entry.834064701"
echo NEXT_PUBLIC_FORM_FIELD_MOTIVO_PARCERIA="entry.762848011"
) > .env

echo ✅ Arquivo .env criado com sucesso!
echo.
echo 📋 Configurações aplicadas:
echo    • URL do Google Forms: https://docs.google.com/forms/d/e/1FAIpQLScFAaA4nSu-3sgfVpiPeubZXcsRnUa7upch6uuFs7QE22ORQA/formResponse
echo    • Campo Nome da Empresa: entry.176801527
echo    • Campo Email: entry.1213378608
echo    • Campo Endereço: entry.1975365640
echo    • Campo Telefone: entry.1131483063
echo    • Campo Do que gostou: entry.844015958
echo    • Campo Sugestões: entry.834064701
echo    • Campo Motivo da parceria: entry.762848011
echo.
echo 🎯 Próximos passos:
echo    1. Reinicie o servidor de desenvolvimento
echo    2. Teste o formulário de parcerias
echo    3. Verifique se os dados chegam no Google Forms
echo.
echo 💡 Para testar:
echo    • Acesse a página de parcerias
echo    • Preencha o formulário
echo    • Envie e verifique no Google Forms
echo.
pause
