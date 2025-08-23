# Automações - FalaAtípica

## Visão Geral
Esta pasta contém todas as automações em Python e outras ferramentas para facilitar o desenvolvimento do projeto FalaAtípica.

## Scripts Disponíveis

### 1. Processador de TCC (`tcc_processor.py`)

**Objetivo**: Processar arquivos de TCC extraindo texto e dividindo em pedaços para análise.

**Funcionalidades**:
- Seleção de arquivo via interface gráfica
- Divisão em pedaços de 5000 linhas
- Identificação automática de títulos vs texto normal
- Ignorar imagens e elementos gráficos
- Nomenclatura com linha de início e fim

**Como usar**:
```bash
cd auto/
python tcc_processor.py
```

**Saída**:
- Pasta `tcc_processed/` com arquivos divididos
- Nomenclatura: `[nome]_Parte_XX_Linhas_XXXXX-XXXXX.txt`
- Títulos marcados com `[TÍTULO - Linha X]`
- Texto normal marcado com `[Linha X]`

**Exemplo de saída**:
```
TCC_Processado_Parte_01_Linhas_00001-05000.txt
TCC_Processado_Parte_02_Linhas_05001-10000.txt
TCC_Processado_Parte_03_Linhas_10001-15000.txt
```

## Estrutura da Pasta

```
auto/
├── README.md              # Esta documentação
├── tcc_processor.py       # Processador de TCC
├── requirements.txt       # Dependências Python (futuro)
└── config/               # Configurações (futuro)
    └── settings.json
```

## Dependências

### Python
- Python 3.7+
- tkinter (incluído na maioria das instalações Python)
- pathlib (incluído no Python 3.4+)

### Instalação
```bash
# Verificar se Python está instalado
python --version

# Verificar se tkinter está disponível
python -c "import tkinter; print('tkinter OK')"
```

## Como Usar

### 1. Processar TCC
1. Execute o script: `python tcc_processor.py`
2. Selecione o arquivo do TCC na janela que abrir
3. Aguarde o processamento
4. Os arquivos serão salvos em `tcc_processed/`

### 2. Analisar Resultados
- Cada arquivo contém 5000 linhas do original
- Títulos são identificados automaticamente
- Imagens e elementos gráficos são ignorados
- Números de linha do arquivo original são preservados

### 3. Usar com IA
- Copie o conteúdo de cada arquivo
- Cole no chat com a IA
- A IA pode analisar cada parte separadamente
- Referencie partes anteriores quando necessário

## Configurações

### Alterar Tamanho dos Pedaços
No arquivo `tcc_processor.py`, linha 25:
```python
self.lines_per_chunk = 5000  # Alterar este valor
```

### Alterar Padrões de Título
No método `is_title()`, adicione ou modifique os padrões regex:
```python
title_patterns = [
    r'^[A-Z][A-Z\s]+$',  # Tudo maiúsculo
    r'^\d+\.\s+[A-Z]',   # Numeração seguida de maiúscula
    # Adicionar novos padrões aqui
]
```

### Alterar Padrões de Ignorar
No método `should_ignore_line()`, modifique os padrões:
```python
ignore_patterns = [
    r'^\[.*\]$',  # Linhas entre colchetes
    # Adicionar novos padrões aqui
]
```

## Padrões de Identificação

### Títulos
- Linhas com primeira letra maiúscula de cada palavra
- Numeração seguida de texto (1. Introdução)
- Numeração decimal (1.1, 1.2, etc.)
- Numeração romana (I., II., III.)
- Linhas muito curtas (menos de 100 caracteres)

### Elementos Ignorados
- Linhas entre colchetes `[texto]`
- Linhas entre chaves `{texto}`
- Tags HTML/XML `<tag>`
- Caracteres de bloco ASCII art `█▄▀▌▐░▒▓`
- Caracteres de borda `═║╔╗╚╝╠╣╦╩╬`
- Linhas vazias ou apenas espaços

## Troubleshooting

### Erro: "No module named 'tkinter'"
```bash
# Ubuntu/Debian
sudo apt-get install python3-tk

# CentOS/RHEL
sudo yum install tkinter

# macOS (com Homebrew)
brew install python-tk
```

### Erro de Encoding
O script usa UTF-8 com tratamento de erros. Se houver problemas:
```python
# No arquivo, linha 108, alterar:
with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
# Para:
with open(file_path, 'r', encoding='latin-1', errors='ignore') as file:
```

### Arquivo muito grande
Se o arquivo for muito grande e causar problemas de memória:
```python
# Reduzir o tamanho dos chunks
self.lines_per_chunk = 2000  # ou menos
```

## Próximas Automações

### Planejadas
- **Gerador de Mockups**: Criar mockups baseados em descrições
- **Validador de Cores**: Verificar se apenas as cores permitidas são usadas
- **Gerador de Componentes**: Criar componentes React/React Native baseados em especificações
- **Validador de Estrutura**: Verificar se a estrutura de pastas está correta

### Sugestões
- Automação para deploy
- Gerador de documentação
- Validador de acessibilidade
- Testador de responsividade

## Contribuição

Para adicionar novas automações:

1. Crie o script Python na pasta `auto/`
2. Adicione documentação no `README.md`
3. Teste a automação
4. Atualize o `cursor.rules` se necessário

## Contato

Para dúvidas sobre as automações, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento.
