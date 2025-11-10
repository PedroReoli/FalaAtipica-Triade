# Scripts de Automação - Formulário de Usabilidade

## 📋 Scripts Disponíveis

### 1. Preenchimento Automático de Formulário

**Arquivo:** `fill-usability-form.py`

**Descrição:** Script Python que preenche automaticamente 30 respostas no formulário de usabilidade do Google Forms.

#### 🎯 Características

- ✅ Gera 30 respostas aleatórias
- ✅ Usa nomes reais fornecidos
- ✅ Cria emails únicos para cada resposta
- ✅ Distribui respostas de forma realista:
  - 60% positivas (4-5)
  - 30% neutras (3)
  - 10% negativas (1-2)
- ✅ Gera sugestões variadas
- ✅ Aguarda 1 segundo entre cada envio

#### 🚀 Como Usar

**Opção 1: Usando o arquivo .bat (Windows)**
```bash
cd site/scripts
run-fill-usability.bat
```

**Opção 2: Executando diretamente o Python**
```bash
cd site/scripts
python fill-usability-form.py
```

#### 📊 Nomes Usados

O script utiliza os seguintes nomes aleatoriamente:
- Roberto
- Madalena
- Roberto Junior
- Ronaldo
- Marcio
- Flavio
- Saulo
- Simone
- Helena
- Julia
- Juliana
- Tamara
- Tamires
- Richard
- Max
- Calvin
- Ruam
- Almira

#### 📧 Estrutura de Email

Cada nome gera um email único seguindo o padrão:
```
nomealeatorio123@gmail.com
```

Domínios utilizados:
- gmail.com
- hotmail.com
- outlook.com
- yahoo.com

#### 🎲 Lógica de Respostas

**Perguntas Positivas** (quanto maior melhor):
- Eu acho que usaria o FalaAtípica com frequência
- Achei o FalaAtípica fácil de usar
- As funcionalidades estão bem integradas
- Acredito que a maioria das pessoas aprenderia a usar o FalaAtípica rapidamente
- Senti-me confiante ao usar o sistema

**Perguntas Negativas** (quanto menor melhor):
- Achei o sistema desnecessariamente complexo
- Acho que precisaria de suporte técnico para usar o sistema
- Achei que havia muita inconsistência na interface
- Achei o sistema confuso de usar
- Precisei aprender muitas coisas antes de conseguir usar o sistema

#### ⚙️ Configuração

O script utiliza automaticamente os entry IDs configurados no `.env`:
- Nome: entry.1245248587
- Email: entry.1723971493
- Uso Frequência: entry.508234028
- Sistema Complexo: entry.616211886
- Facilidade de Uso: entry.1260689762
- Necessidade Suporte: entry.1275239774
- Funcionalidades Integradas: entry.1998707057
- Inconsistência Interface: entry.1034891723
- Aprendizado Rápido: entry.1718919016
- Sistema Confuso: entry.1210236858
- Confiança no Uso: entry.666499506
- Necessidades Antes: entry.458616619
- Sugestões: entry.280737376

#### 📦 Dependências

```bash
pip install requests
```

#### ⚠️ Importante

- O script espera 1 segundo entre cada envio para não sobrecarregar o Google Forms
- Os dados são enviados em modo `no-cors` (padrão do Google Forms)
- Alguns envios podem falhar devido a limitações de rate limiting
- Verifique no Google Forms se as respostas foram recebidas

#### 📈 Relatório

Ao final da execução, o script exibe:
- ✅ Total de sucessos
- ❌ Total de falhas
- Nome e email de cada resposta enviada

---

**Desenvolvido para FalaAtípica - Sistema de Usabilidade** 🎯

