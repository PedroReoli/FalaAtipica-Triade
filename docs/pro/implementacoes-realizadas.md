# 📋 TODO – FalaAtípica Tríade

## 🗂️ Sprint Backlog (prioridade a partir de 11/11/2025)

### Sprint 01 – Kids (Início: 11/11/2025)
#### 🔊 Jogo “Memória Auditiva”
- [ ] Definir lista final de sons por categoria (animais, instrumentos, ações)
- [ ] Criar assets de áudio e imagens compatíveis com cada som
- [ ] Implementar lógica de cartas viradas + reprodução do som ao toque
- [ ] Implementar verificação de pares com feedback positivo (confete + “Você conseguiu!”)
- [ ] Aplicar prompting após 10s (piscar cartas restantes) e fading após 2 acertos seguidos
- [ ] Testar acessibilidade sonora (volume, repetição, legendas)

#### 🧩 Jogo “Monte a Frase”
- [ ] Selecionar frases por categoria (ações do dia a dia, emoções, necessidades básicas)
- [ ] Criar assets (blocos visuais e áudios para leitura da frase)
- [ ] Implementar montagem por arraste/toque e reprodução completa ao confirmar
- [ ] Aplicar prompting (piscar bloco correto após 7s) e fading progressivo
- [ ] Garantir reforço verbal (“Muito bem!”) + animação positiva em caso de acerto
- [ ] Testar montagem com 3 e 4 blocos, incluindo variações de frases

### Sprint 02 – Definição conjunta (Início: 11/11/2025)
- [ ] Escolher foco (ex.: PRO relatórios, Tutors agenda, Site institucional, API)
- [ ] Detalhar escopo e tarefas
- [ ] Validar prioridades antes de iniciar

### Sprint 03 – Backlog Futuro (Início: 11/11/2025)
- [ ] Registrar ideias aprovadas em reunião de planejamento
- [ ] Vincular tarefas a módulos e responsáveis

---

## 🔧 Organização & Acompanhamento

- [x] Reorganizar repositório em `Apps/`
- [ ] Ajustar imports que usam caminhos antigos (`Apps/api/services/jsonService.js`, `Apps/Pro/src/services/mockDataService.ts`)
- [ ] Atualizar documentação e scripts com novos caminhos
- [ ] Rodar testes rápidos (`npm run api`, `npm run pro`, `npm run kids`, `npm run site`)

---

## 📊 Status Geral

- **Kids:** MVP pronto; novos jogos em planejamento
- **Tutors:** MVP 95% (agenda desabilitada)
- **Pro:** 85% (parcerias a validar, agenda desabilitada)
- **API:** 100% funcional
- **Integração:** Socket.IO em tempo real operando