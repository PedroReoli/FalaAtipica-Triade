# 📋 TODO – FalaAtípica Tríade

## 🗂️ Sprint Backlog (prioridade a partir de 11/11/2025)

### Sprint 01 – Kids (Início: 11/11/2025)
#### 🔊 Jogo “Memória Auditiva”
- [ ] Definir lista final de sons por categoria (animais, instrumentos, ações)
- [ ] Criar assets de áudio e imagens correspondentes
- [ ] Implementar lógica de cartas viradas + reprodução do som ao toque
- [ ] Implementar verificação de pares com feedback positivo (confete + “Você conseguiu!”)
- [ ] Aplicar prompting após 10s (piscar cartas restantes) e fading após 2 acertos seguidos
- [ ] Testar acessibilidade sonora (volume padrão, repetição, legendas)

#### 🧩 Jogo “Monte a Frase”
- [ ] Selecionar frases por categoria (ações do dia a dia, emoções, necessidades básicas)
- [ ] Criar assets de blocos visuais e áudios das frases
- [ ] Implementar montagem por toque/arraste e reprodução completa ao confirmar
- [ ] Aplicar prompting (piscar bloco correto após 7s) e fading progressivo
- [ ] Garantir reforço verbal (“Muito bem!”) + animação positiva em caso de acerto
- [ ] Validar montagem com 3 e 4 blocos, incluindo variações de frases

### Sprint 02 – Definição conjunta (Início: 11/11/2025)
- [ ] Escolher módulo foco (ex.: PRO relatórios, Tutors agenda, Site institucional, API)
- [ ] Refinar escopo e tarefas do sprint
- [ ] Validar prioridades e responsáveis antes de iniciar

### Sprint 03 – Backlog Futuro (Início: 11/11/2025)
- [ ] Registrar ideias aprovadas em reunião de planejamento
- [ ] Classificar tarefas por módulo e estimativa
- [ ] Vincular responsáveis e dependências

### Tutores – Biblioteca do Tutor
- [ ] Definir estrutura da nova área (“Biblioteca do Tutor”) com categorias
- [ ] Implementar upload/listagem de PDFs e vídeos educativos
- [ ] Adicionar marcador “Recomendado pelo seu profissional”
- [ ] Criar filtros por tipo de conteúdo (leitura, vídeo, atividade prática)

### Pro – Evolução Clínica
#### Dashboard Inteligente
- [ ] Adicionar visão analítica por eixo terapêutico (linguagem, cognitivo, social, motor)
- [ ] Criar gráficos interativos com taxa de progresso (Kids), engajamento familiar (Tutors) e alertas de regressão
- [ ] Implementar ranking de pacientes que mais evoluíram por período

#### Relatórios Dinâmicos
- [ ] Gerar relatórios interativos (dados de jogos, feedbacks, observações do profissional)
- [ ] Permitir exportar PDF com design profissional e versão web para tutor
- [ ] Manter opção de anexar PDF tradicional

#### Prontuário Inteligente
- [ ] Construir histórico clínico cronológico com tags automáticas
- [ ] Disponibilizar busca semântica (ex.: “última sessão com regressão na fala”)

#### Sessões com Gamificação Terapêutica
- [ ] Associar atividades do Kids a metas terapêuticas no Pro
- [ ] Registrar automaticamente resultados das atividades nas sessões
- [ ] Exibir barra de progresso da meta clínica

#### Agenda Colaborativa
- [ ] Enviar notificações automáticas para tutores (push/email) após agendamento
- [ ] Criar visualização multi-profissional para crianças atendidas por várias áreas

#### Comunicação Tutor ↔ Profissional
- [ ] Implementar chat leve com mensagens curtas, emojis e anexos
- [ ] Registrar conversa diretamente no prontuário
- [ ] Categorizar mensagens (elogio, dúvida, alerta)

#### Indicadores Preditivos
- [ ] Processar dados (Kids + Tutors) para previsão de progresso semanal
- [ ] Identificar padrões de regressão/estagnação e alertar com cores de risco

### Institucional – Módulo Next.js (após concluir itens acima)
1. **Descoberta e Design**
   - [ ] Refinar personas (escola, clínica, ONG) e jornadas principais
   - [ ] Criar wireframes/fluxos iniciais do dashboard e gestão de grupos
2. **Arquitetura e Setup**
   - [ ] Definir se será app dedicado (`Apps/institution`) ou extensão do site
   - [ ] Configurar projeto Next.js com roteamento, autenticação e theming
   - [ ] Modelar Supabase (tabelas: institutions, institution_users, institution_groups, institution_reports, billing)
3. **MVP de Dashboard**
   - [ ] Implementar cards de indicadores agregados (evolução média, engajamento, alertas)
   - [ ] Criar filtros por turma, profissional, faixa etária
4. **Gestão Operacional**
   - [ ] Cadastro e vinculação de profissionais internos e crianças/grupos
   - [ ] Registrar observações institucionais (sem expor dados sigilosos)
   - [ ] Integração com Pro para autorizar dados compartilhados
5. **Financeiro / Licenças**
   - [ ] Implementar controle de licenças (quantidade de usuários/crianças)
   - [ ] Criar painel de boletos/pagamentos (futuro) com histórico
6. **Comunicação e Segurança**
   - [ ] Criar canal de recados institucionais (elogio, alerta, dúvida) vinculado ao prontuário
   - [ ] Garantir logs completos e níveis de acesso por perfil
7. **Validação e Deploy**
   - [ ] Validar MVP com parceiros (escola piloto, clínica)
   - [ ] Ajustar documentação e processos de billing

---

## 🔧 Organização & Acompanhamento
- [x] Reorganizar repositório em `Apps/`
- [ ] Ajustar imports que usam caminhos antigos (`Apps/api/services/jsonService.js`, `Apps/Pro/src/services/mockDataService.ts`)
- [ ] Atualizar documentação e scripts com novos caminhos
- [ ] Rodar testes rápidos (`npm run api`, `npm run pro`, `npm run kids`, `npm run site`)

---

## 📊 Status Geral
- **Kids:** MVP pronto; novos jogos planejados
- **Tutors:** 95% (agenda desabilitada)
- **Pro:** 85% (parcerias a validar, agenda desabilitada)
- **API:** 100% funcional
- **Integração:** Socket.IO em tempo real operando