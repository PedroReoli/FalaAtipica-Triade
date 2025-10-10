# ⚠️ PENDÊNCIAS - KIDS App

## 🔴 ALTA PRIORIDADE

### Jogo das Palavras - Requer Ajustes Urgentes

**Status**: ⚠️ Implementado mas não está adequado para uso

**Arquivo**: `Kids/src/screens/PalavrasGameScreen.tsx`

---

### 📋 Problemas Identificados

1. **Mecânica de Interação Confusa**
   - Sistema de toque atual não é intuitivo
   - Criança não entende como adicionar/remover itens
   - Falta clareza visual do que é clicável

2. **Feedback Visual Insuficiente**
   - Não fica claro quando um item é adicionado
   - Remoção de itens não tem feedback adequado
   - Área de formação precisa de destaque melhor

3. **Fluxo do Jogo Problemático**
   - Sequência de ações não é natural
   - Difícil entender o próximo passo
   - Navegação entre estados confusa

4. **UX Geral**
   - Interface não é amigável para crianças
   - Falta polimento visual
   - Interações não são responsivas o suficiente

---

### 🎯 Ajustes Necessários

#### 1. Melhorar Sistema de Interação
- [ ] Implementar feedback visual imediato ao tocar
- [ ] Adicionar animações de transição
- [ ] Destacar itens clicáveis com borda/cor
- [ ] Adicionar indicador visual de "arrasto simulado"

#### 2. Revisar Fluxo de Adicionar/Remover
- [ ] Simplificar mecânica de adicionar itens
- [ ] Tornar remoção mais óbvia (ícone X no slot?)
- [ ] Adicionar confirmação visual ao adicionar
- [ ] Melhorar feedback ao remover

#### 3. Aprimorar Feedback Visual
- [ ] Animação ao adicionar item à área de formação
- [ ] Pulso ou brilho nos itens disponíveis
- [ ] Destaque mais forte na área de formação
- [ ] Feedback sonoro (opcional)

#### 4. Melhorar Área de Formação
- [ ] Tornar slots mais visíveis
- [ ] Adicionar números/indicadores de posição
- [ ] Melhorar contraste de cores
- [ ] Aumentar tamanho dos slots

#### 5. Testar e Iterar
- [ ] Testar com crianças reais
- [ ] Observar comportamento e dificuldades
- [ ] Coletar feedback de pais/profissionais
- [ ] Iterar baseado em observações

---

### 💡 Sugestões de Melhorias

#### Opção 1: Sistema de Toque Melhorado
```
- Toque no item → Item pulsa e "voa" para o próximo slot
- Toque no slot preenchido → Item "voa" de volta
- Animações suaves entre estados
- Feedback sonoro leve (opcional)
```

#### Opção 2: Sistema com Botões Auxiliares
```
- Cada slot tem botão X pequeno para remover
- Setas entre slots para reordenar
- Botão "Desfazer" para remover último
- Visual mais guiado
```

#### Opção 3: True Drag & Drop (mais complexo)
```
- Implementar arrasto real com gesture-handler
- Snap visual ao soltar item
- Preview durante arrasto
- Mais natural mas requer mais desenvolvimento
```

---

### 📊 Priorização de Ações

| Ação | Prioridade | Esforço | Impacto |
|------|-----------|---------|---------|
| Feedback visual ao tocar | 🔴 Alta | Baixo | Alto |
| Animações de transição | 🔴 Alta | Médio | Alto |
| Melhorar área de formação | 🔴 Alta | Baixo | Alto |
| Sistema de remoção mais claro | 🔴 Alta | Médio | Alto |
| Testar com crianças | 🔴 Alta | Baixo | Crítico |
| True drag & drop | 🟡 Média | Alto | Médio |
| Feedback sonoro | 🟢 Baixa | Baixo | Baixo |

---

### 🚀 Roadmap Sugerido

#### Fase 1: Ajustes Rápidos (1-2 dias)
1. Adicionar feedback visual ao tocar (pulso, cor)
2. Melhorar contraste da área de formação
3. Adicionar animações simples (fade in/out)
4. Aumentar tamanho dos elementos clicáveis

#### Fase 2: Revisão de Fluxo (2-3 dias)
1. Implementar novo sistema de remoção (botão X?)
2. Adicionar animações de "voar" entre áreas
3. Melhorar indicadores visuais de estado
4. Polir interações gerais

#### Fase 3: Testes e Iteração (1 semana)
1. Testes com 3-5 crianças
2. Observação de uso real
3. Coleta de feedback
4. Ajustes baseados em testes
5. Nova rodada de testes

#### Fase 4: Polimento Final (1-2 dias)
1. Ajustes finos de UX
2. Otimização de performance
3. Documentação de uso
4. Preparação para produção

---

### 📝 Notas Importantes

- **NÃO MEXER** no código atual até ter um plano claro de melhorias
- **NÃO APAGAR** a implementação atual, usar como base
- **CONSULTAR** este documento antes de qualquer mudança
- **TESTAR** com usuários reais antes de finalizar
- **DOCUMENTAR** todas as mudanças feitas

---

### 🎯 Critérios de Aceite

O jogo será considerado completo quando:

- [x] Criança consegue completar uma palavra sem ajuda de adulto
- [ ] Interação é intuitiva (< 3 tentativas para entender)
- [ ] Feedback visual é claro e imediato
- [ ] Animações são suaves e não confundem
- [ ] Remoção de itens é óbvia
- [ ] Testado com pelo menos 5 crianças (3-8 anos)
- [ ] Taxa de conclusão > 80% sem ajuda
- [ ] Feedback positivo de pais/profissionais

---

## 🟡 MÉDIA PRIORIDADE

### Imagens Reais
- Substituir placeholders por imagens reais
- Ver `docs/kids/prompts-imagens-ia.md`
- Ver `docs/kids/prompts-cena-certa.md`

### Animações Aprimoradas
- Melhorar celebrações
- Adicionar micro-interações
- Polir transições

---

## 🟢 BAIXA PRIORIDADE

### Sistema de Áudio
- Sons de feedback (opcional)
- Pronúncia de palavras
- Música de fundo

### Conteúdo Extra
- Mais palavras
- Mais categorias
- Mais níveis

---

**Última atualização**: 2025-01-09  
**Autor**: Documentação técnica  
**Revisão necessária**: Após implementação de ajustes


