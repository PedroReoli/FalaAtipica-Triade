@echo off
echo 🚀 Criando arquivo .env para FalaAtípica Usabilidade...
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
echo # Configuração do Google Forms - FalaAtípica Usabilidade
echo # URL do Google Forms ^(trocar /viewform por /formResponse^)
echo NEXT_PUBLIC_GOOGLE_FORM_USABILIDADE_URL="https://docs.google.com/forms/d/e/1FAIpQLSeQ0YwO0daNgjZWLm-tEve-UTMuNa4FIsEUhP7Ux6BEaB0Dpg/formResponse"
echo.
echo # IDs dos campos ^(obtidos via link pré-preenchido^)
echo NEXT_PUBLIC_FORM_FIELD_NOME_USABILIDADE="entry.1245248587"
echo NEXT_PUBLIC_FORM_FIELD_EMAIL_USABILIDADE="entry.1723971493"
echo NEXT_PUBLIC_FORM_FIELD_USO_FREQUENCIA="entry.508234028"
echo NEXT_PUBLIC_FORM_FIELD_COMPLEXO="entry.616211886"
echo NEXT_PUBLIC_FORM_FIELD_FACILIDADE="entry.1260689762"
echo NEXT_PUBLIC_FORM_FIELD_SUPORTE="entry.1275239774"
echo NEXT_PUBLIC_FORM_FIELD_INTEGRADAS="entry.1998707057"
echo NEXT_PUBLIC_FORM_FIELD_INCONSISTENCIA="entry.1034891723"
echo NEXT_PUBLIC_FORM_FIELD_APRENDIZADO="entry.1718919016"
echo NEXT_PUBLIC_FORM_FIELD_CONFUSO="entry.1210236858"
echo NEXT_PUBLIC_FORM_FIELD_CONFIANCA="entry.666499506"
echo NEXT_PUBLIC_FORM_FIELD_NECESSIDADES="entry.458616619"
echo NEXT_PUBLIC_FORM_FIELD_SUGESTOES_USABILIDADE="entry.280737376"
) > .env

echo ✅ Arquivo .env criado com sucesso!
echo.
echo 📋 Configurações aplicadas:
echo    • URL do Google Forms: https://docs.google.com/forms/d/e/1FAIpQLSeQ0YwO0daNgjZWLm-tEve-UTMuNa4FIsEUhP7Ux6BEaB0Dpg/formResponse
echo    • Campo Nome: entry.1245248587
echo    • Campo Email: entry.1723971493
echo    • Campo Uso Frequência: entry.508234028
echo    • Campo Sistema Complexo: entry.616211886
echo    • Campo Facilidade de Uso: entry.1260689762
echo    • Campo Necessidade Suporte: entry.1275239774
echo    • Campo Funcionalidades Integradas: entry.1998707057
echo    • Campo Inconsistência Interface: entry.1034891723
echo    • Campo Aprendizado Rápido: entry.1718919016
echo    • Campo Sistema Confuso: entry.1210236858
echo    • Campo Confiança no Uso: entry.666499506
echo    • Campo Necessidades Antes: entry.458616619
echo    • Campo Sugestões: entry.280737376
echo.
echo 🎯 Próximos passos:
echo    1. Reinicie o servidor de desenvolvimento
echo    2. Teste o formulário de usabilidade
echo    3. Verifique se os dados chegam no Google Forms
echo.
echo 💡 Para testar:
echo    • Acesse a página de usabilidade
echo    • Preencha o formulário
echo    • Envie e verifique no Google Forms
echo.
pause

