# 📊 Análise de Usabilidade - FalaAtípica

Script Python para processar dados de formulário de usabilidade e gerar planilha Excel completa com cálculos, gráficos e análise.

## 🎯 Funcionalidades

- ✅ Parse automático de arquivo HTML do Google Forms
- ✅ Processamento e validação de dados
- ✅ Cálculo de estatísticas descritivas (média, mediana, desvio padrão, etc.)
- ✅ Geração de planilha Excel com múltiplas abas:
  - **Dados Brutos**: Todas as respostas organizadas
  - **Estatísticas**: Métricas calculadas por pergunta
  - **Distribuição**: Distribuição de notas por pergunta
  - **Análise**: Análise qualitativa e conclusões
  - **Gráficos**: Gráficos de barras e pizza
- ✅ Formatação profissional com cores do projeto
- ✅ Análise automática com avaliações por pergunta

## 📋 Requisitos

- Python 3.7 ou superior
- Bibliotecas Python (instaladas automaticamente):
  - `pandas`
  - `openpyxl`
  - `beautifulsoup4`
  - `matplotlib`
  - `numpy`
  - `lxml`

## 🚀 Como Usar

### Opção 1: Usando o arquivo .bat (Windows - Recomendado)

```bash
cd auto
run-analise-usabilidade.bat
```

O script irá:
1. Verificar se Python está instalado
2. Instalar dependências automaticamente (se necessário)
3. Executar a análise
4. Gerar o arquivo `Analise_Usabilidade.xlsx` na raiz do projeto

### Opção 2: Executando diretamente o Python

```bash
cd auto
python analise-usabilidade.py
```

### Opção 3: Instalando dependências manualmente

```bash
cd auto
pip install -r requirements-usabilidade.txt
python analise-usabilidade.py
```

## 📁 Estrutura de Arquivos

```
FalaAtipica-Triade/
├── Respostas ao formulário 1.html    # Arquivo HTML de entrada (Google Forms)
├── Analise_Usabilidade.xlsx          # Planilha gerada (saída)
└── auto/
    ├── analise-usabilidade.py         # Script principal
    ├── run-analise-usabilidade.bat    # Script de execução (Windows)
    ├── requirements-usabilidade.txt    # Dependências Python
    └── README-ANALISE-USABILIDADE.md  # Este arquivo
```

## 📊 Estrutura da Planilha Gerada

### Aba 1: Dados Brutos
- Todas as respostas do formulário
- Colunas: Data, Nome, Email, 10 Perguntas, Sugestão
- Formatação com bordas e cores

### Aba 2: Estatísticas
- Métricas calculadas para cada pergunta:
  - Média
  - Mediana
  - Desvio Padrão
  - Mínimo
  - Máximo
  - Total de Respostas

### Aba 3: Distribuição
- Distribuição de notas (1 a 5) para cada pergunta
- Facilita visualização de padrões

### Aba 4: Análise
- Resumo geral da análise
- Avaliação por pergunta (Excelente/Bom/Regular/Precisa Melhorias)
- Observações sobre variabilidade
- Conclusões e recomendações

### Aba 5: Gráficos
- Gráfico de barras: Média de notas por pergunta
- Gráfico de pizza: Distribuição de notas (exemplo)

## 🎨 Cores Utilizadas

O script utiliza as cores oficiais do projeto FalaAtípica:
- **Azul**: `#1e88e5`
- **Verde**: `#43a047`
- **Vermelho**: `#e53935`
- **Amarelo**: `#fbc02d`
- **Fundo Azul**: `#054776`

## 📝 Notas sobre as Perguntas

O script processa 10 perguntas do formulário de usabilidade:

1. Usaria o sistema com frequência
2. Sistema desnecessariamente complexo
3. Fácil de usar
4. Precisaria de suporte técnico
5. Funcionalidades bem integradas
6. Muita inconsistência na interface
7. Aprenderia rapidamente
8. Sistema confuso de usar
9. Confiante ao usar
10. Precisaria aprender muitas coisas

**Nota**: As perguntas 2, 4, 6, 8 e 10 são invertidas (quanto menor, melhor).

## 🔍 Interpretação dos Resultados

### Avaliação por Média:
- **≥ 4.0**: EXCELENTE (verde)
- **≥ 3.0**: BOM (azul)
- **≥ 2.0**: REGULAR (amarelo)
- **< 2.0**: PRECISA MELHORIAS (vermelho)

### Desvio Padrão:
- **> 1.0**: Alta variabilidade nas respostas (indicado com ⚠)

## 🐛 Solução de Problemas

### Erro: "Tabela não encontrada no HTML"
- Verifique se o arquivo HTML está na raiz do projeto
- Verifique se o arquivo está no formato correto (exportado do Google Forms)

### Erro: "Python não encontrado"
- Instale Python 3.7+ de https://www.python.org/downloads/
- Certifique-se de adicionar Python ao PATH durante a instalação

### Erro ao instalar dependências
- Execute manualmente: `pip install pandas openpyxl beautifulsoup4 matplotlib numpy lxml`
- Se usar Windows, tente: `python -m pip install --user [biblioteca]`

## 📄 Licença

Este script faz parte do projeto FalaAtípica (TCC).

## 👤 Autor

Script desenvolvido para análise de usabilidade do projeto FalaAtípica.

---

**Última atualização**: 2025

