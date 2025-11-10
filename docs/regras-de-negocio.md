# Regras de Negócio – FalaAtípica

## 1. Visão Geral
- Ecossistema com quatro módulos: Kids, Tutors, Pro e futuro módulo Institucional.
- Dados mockados residem em `Apps/Mockup` até migração para Supabase.
- API central em `Apps/api` sincroniza informações em tempo real.

## 2. Personas
### Crianças (Kids)
- Faixa etária: 3 a 12 anos.
- Jogos disponíveis: **Adivinha**, **Cena Certa**, **Igual ou Diferente** e os novos **Memória Auditiva** e **Monte a Frase**.
- Interações curtas, com reforço positivo, prompting e fading progressivo conforme metodologia ABA.

### Pais e Responsáveis (Tutors)
- Acompanham progresso, conquistas e recebem recomendações do Pro.
- Visualizam relatórios liberados e podem fornecer feedbacks diários.

### Profissionais (Pro)
- Perfis: fonoaudiólogos, psicólogos, pedagogos, terapeutas ocupacionais.
- Acesso a prontuário completo, agenda, relatórios e integrações com Kids/Tutors.
- Coordenação de times é feita pelos próprios profissionais administradores (sem papel específico de “coordenador”).

### Institucional (Futuro)
- Voltado para clínicas, escolas e ONGs.
- Dashboards coletivos com indicadores agregados e gestão de múltiplas equipes.
- Descrito na documentação do site institucional.

## 3. Hierarquia de Acesso
- **Kids:** somente jogos e feedback imediato.
- **Tutors:** dados da criança que acompanha, recomendações e relatórios autorizados.
- **Pro:** acesso completo ao prontuário e funcionalidades avançadas.
- **Institucional:** controle global de grupos e relatórios consolidados (pendente de implementação).

## 4. Fluxos Principais
### Cadastro e Vinculação
1. Responsável cadastra criança via Tutors ou Pro.
2. API associa usuário responsável e profissional principal.
3. Games liberados conforme plano terapêutico.

### Sessões e Relatórios (Pro)
1. Profissional agenda sessão.
2. Ao finalizar, registra objetivos, progresso e anexos.
3. Tutores recebem resumo quando autorizado.

### Gamificação (Kids)
1. Criança interage com qualquer um dos quatro jogos.
2. Sistema registra métricas (acertos, tempo, categoria).
3. Pro usa indicadores; Tutors visualiza conquistas.

## 5. Regras por Módulo
### Kids
- Jogos obedecem paleta oficial (azul `#1e88e5`, verde `#43a047`, vermelho `#e53935`, amarelo `#fbc02d`, azul escuro `#054776`, branco `#f4f6ff`/`#ffffff`, preto `#3c3c3c`).
- **Memória Auditiva:** pares por som, categorias configuráveis, prompting após 10s.
- **Monte a Frase:** blocos com palavras, leitura completa ao confirmar, prompting após 7s.

### Tutors
- Dashboard simplificado com progresso semanal, conquistas, recomendações.
- Feedbacks enviados alimentam alertas para profissionais.
- Exportação básica (PDF/CSV).

### Pro
- Detalhes específicos em `docs/pro/regras-de-negocio.md` e `docs/pro/telas-visao-geral.md`.
- Logs de ações críticas em `Apps/logs`.

### Institucional (Futuro)
- Conteúdo reforçado no site (`Apps/site/docs/conteudo-landing-page.md`).
- Prevê gestão de grupos, indicadores comparativos e integração com Pro.

## 6. Acessibilidade e UX
- Alvos ≥ 44px nos apps mobile.
- Contraste mínimo AA.
- Feedback sonoro/visual para interações principais.

## 7. Dados e Segurança
- Cada criança vinculada a pelo menos um responsável e um profissional.
- Histórico de sessões e relatórios é imutável (pode ser marcado como obsoleto, não deletado).
- Exports anonimizam dados sensíveis quando usados para estudos.
- Logs agrupados por blocos de 30 minutos.

## 8. Métricas de Sucesso
- **Kids:** frequência de jogo por criança, taxa de acerto por categoria.
- **Tutors:** engajamento com recomendações e feedbacks.
- **Pro:** tempo médio de registro de sessão, relatórios entregues, uso de funcionalidades.
- **Institucional (futuro):** impacto coletivo (número de crianças atendidas, ganho médio por grupo).

## 9. Roadmap
- Finalizar novos jogos Kids (Sprint 01 – 11/11/2025).
- Definir foco da Sprint 02 com stakeholders (11/11/2025).
- Evoluir planejamento do módulo Institucional com base no site institucional.
