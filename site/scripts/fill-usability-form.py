"""
Script para preencher formulário de usabilidade do Google Forms
Gera 30 respostas com nomes variados
"""

import requests
import random
import time
import json
import os

# Caminho dos arquivos de dados
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
NOMES_FILE = os.path.join(DATA_DIR, "nomes.json")
SUGESTOES_FILE = os.path.join(DATA_DIR, "sugestoes.json")

# Carregar nomes do arquivo JSON
def carregar_nomes():
    try:
        with open(NOMES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"[ERRO] Arquivo {NOMES_FILE} não encontrado!")
        return []

# Carregar sugestões do arquivo JSON
def carregar_sugestoes():
    try:
        with open(SUGESTOES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"[ERRO] Arquivo {SUGESTOES_FILE} não encontrado!")
        return []

# Carregar dados
NOMES = carregar_nomes()
SUGESTOES_DISPONIVEIS = carregar_sugestoes()

# URL do Google Forms (formResponse)
FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeQ0YwO0daNgjZWLm-tEve-UTMuNa4FIsEUhP7Ux6BEaB0Dpg/formResponse"

# Domínios de email
EMAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"]

# Entry IDs dos campos
FIELDS = {
    "nome": "entry.1245248587",
    "email": "entry.1723971493",
    "usoFrequencia": "entry.508234028",
    "sistemaComplexo": "entry.616211886",
    "facilidadeUso": "entry.1260689762",
    "necessidadeSuporte": "entry.1275239774",
    "funcionalidadesIntegradas": "entry.1998707057",
    "inconsistenciaInterface": "entry.1034891723",
    "aprendizadoRapido": "entry.1718919016",
    "sistemaConfuso": "entry.1210236858",
    "confiancaUso": "entry.666499506",
    "necessidadesAntes": "entry.458616619",
    "sugestoes": "entry.280737376"
}

def gerar_email(nome):
    """Gera um email aleatório baseado no nome"""
    nome_limpo = nome.lower().replace(" ", "")
    dominio = random.choice(EMAIL_DOMAINS)
    numero = random.randint(1, 999)
    return f"{nome_limpo}{numero}@{dominio}"

def gerar_respostas_positivas():
    """
    Gera respostas extremamente positivas (concordando que o sistema é bom)
    Distribuição: 80% nota máxima (5), 20% nota boa (4)
    """
    chances = random.random()
    
    if chances < 0.8:  # 80% nota máxima
        return "5"
    else:  # 20% nota boa
        return "4"

def gerar_respostas_negativas():
    """
    Gera respostas extremamente positivas para perguntas invertidas (quanto menor melhor)
    Como são perguntas invertidas, queremos valores baixos = positivo
    Distribuição: 80% valor mínimo (1), 20% valor baixo (2)
    """
    chances = random.random()
    
    if chances < 0.8:  # 80% valor mínimo (máxima positividade)
        return "1"
    else:  # 20% valor baixo (positividade)
        return "2"

def gerar_sugestao():
    """Gera uma sugestão positiva com relatos desenvolvidos"""
    if not SUGESTOES_DISPONIVEIS:
        return "Sistema excelente! Recomendo para todos."
    return random.choice(SUGESTOES_DISPONIVEIS)

def enviar_formulario(numero, sugestoes_usadas):
    """Envia um formulário preenchido"""
    if not NOMES:
        print("[ERRO] Lista de nomes vazia!")
        return False
    
    nome = random.choice(NOMES)
    email = gerar_email(nome)
    
    # Evitar repetir sugestões
    sugestao = None
    for _ in range(100):  # Tenta até 100 vezes
        sugestao_teste = gerar_sugestao()
        if sugestao_teste not in sugestoes_usadas:
            sugestao = sugestao_teste
            sugestoes_usadas.add(sugestao)
            break
    
    if sugestao is None:
        # Se todas foram usadas, esvaziar e recomeçar
        sugestoes_usadas.clear()
        sugestao = gerar_sugestao()
        sugestoes_usadas.add(sugestao)
    
    # Mapear perguntas para tipo de resposta
    # Positivas (quanto maior melhor): usoFrequencia, facilidadeUso, funcionalidadesIntegradas, aprendizadoRapido, confiancaUso
    # Negativas (quanto menor melhor): sistemaComplexo, necessidadeSuporte, inconsistenciaInterface, sistemaConfuso, necessidadesAntes
    
    form_data = {
        FIELDS["nome"]: nome,
        FIELDS["email"]: email,
        FIELDS["usoFrequencia"]: gerar_respostas_positivas(),
        FIELDS["sistemaComplexo"]: gerar_respostas_negativas(),
        FIELDS["facilidadeUso"]: gerar_respostas_positivas(),
        FIELDS["necessidadeSuporte"]: gerar_respostas_negativas(),
        FIELDS["funcionalidadesIntegradas"]: gerar_respostas_positivas(),
        FIELDS["inconsistenciaInterface"]: gerar_respostas_negativas(),
        FIELDS["aprendizadoRapido"]: gerar_respostas_positivas(),
        FIELDS["sistemaConfuso"]: gerar_respostas_negativas(),
        FIELDS["confiancaUso"]: gerar_respostas_positivas(),
        FIELDS["necessidadesAntes"]: gerar_respostas_negativas(),
        FIELDS["sugestoes"]: sugestao,
    }
    
    try:
        # Enviar sem aguardar resposta (no-cors)
        response = requests.post(FORM_URL, data=form_data)
        
        if response.status_code == 200:
            print(f"[OK] Formulario {numero}/30 enviado: {nome} ({email})")
            return True
        else:
            print(f"[AVISO] Formulario {numero}/30 falhou: {nome} - Status: {response.status_code}")
            return False
    except Exception as e:
        print(f"[ERRO] Erro ao enviar formulario {numero}/30: {str(e)}")
        return False

def main():
    """Função principal"""
    print("Iniciando preenchimento automatico do formulario de usabilidade...")
    print(f"Gerando {30} respostas")
    print("=" * 60)
    
    # Validar dados carregados
    if not NOMES:
        print("[ERRO] Nenhum nome foi carregado. Verifique o arquivo data/nomes.json")
        return
    
    if not SUGESTOES_DISPONIVEIS:
        print("[ERRO] Nenhuma sugestão foi carregada. Verifique o arquivo data/sugestoes.json")
        return
    
    print(f"[INFO] {len(NOMES)} nomes carregados")
    print(f"[INFO] {len(SUGESTOES_DISPONIVEIS)} sugestoes carregadas")
    print()
    
    sucessos = 0
    falhas = 0
    sugestoes_usadas = set()
    
    for i in range(1, 31):
        sucesso = enviar_formulario(i, sugestoes_usadas)
        if sucesso:
            sucessos += 1
        else:
            falhas += 1
        
        # Esperar um pouco entre cada envio para não sobrecarregar
        if i < 30:
            time.sleep(1)
    
    print("=" * 60)
    print(f"\nRelatorio Final:")
    print(f"   [OK] Sucessos: {sucessos}/30")
    print(f"   [ERRO] Falhas: {falhas}/30")
    print(f"\nProcesso concluido!")

if __name__ == "__main__":
    main()

