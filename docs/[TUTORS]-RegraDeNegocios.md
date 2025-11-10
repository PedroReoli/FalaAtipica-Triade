# Regras de Negócio – Tutors

## Visão Geral
- Aplicativo React Native para pais e responsáveis acompanharem crianças cadastradas no Kids.
- Recebe dados em tempo real do Kids e Pro via API central.
- Foco em clareza, motivação e suporte, com linguagem simples e empática.

## Público e Objetivos
- Responsáveis sem conhecimento técnico em terapias ou tecnologia.
- Acompanhamento diário do progresso, registro de feedbacks e acesso a recomendações.
- Comunicação facilitada com equipe clínica por meio do módulo Pro.

## Tecnologias e Dados
- React Native + TypeScript, Expo, React Navigation.
- Dados iniciais mockados em `Apps/Mockup/TUTORS` (perfil, relatórios, suporte, dicas).
- Integração via websockets (Socket.IO) para atualizar progresso, conquistas e sessões.

## Funcionalidades Principais
- **Dashboard:** resumo de crianças, progresso e notificações.
- **Progress:** visualização detalhada de desempenho (gráficos e histórico de jogos).
- **Support:** canal para solicitar ajuda e acompanhar respostas.
- **Tips & Resources:** conteúdos educativos e recomendações personalizadas.
- **Games:** acesso rápido aos jogos do Kids para incentivar participação.
- **Profiles:** gerenciamento de dados pessoais e de crianças vinculadas.

## Regras de Interação
- Interface minimalista com componentes grandes (≥ 44px) e cores oficiais (#1e88e5, #43a047, #e53935, #fbc02d, #054776, #f4f6ff, #ffffff, #3c3c3c).
- Feedback imediato ao registrar feedbacks, acessar dicas ou receber notificações.
- Alertas priorizados por tipo (progresso, recomendações, alertas clínicos).

## Integração com Kids e Pro
- Progresso de jogos sincronizado com Tutors e exibido em dashboards.
- Feedbacks registrados no Tutors são encaminhados para profissionais no Pro.
- Sessões criadas no Pro disparam notificações para os responsáveis.

## Métricas de Sucesso
- Engajamento semanal (acessos ao app, feedbacks enviados).
- Tempo médio para visualizar recomendações após emissão.
- Taxa de respostas às notificações críticas.

## Para Fazer
- Implementar agregação de progresso por habilidade (comportamento, linguagem, social).
- Adicionar recomendações multimídia (vídeos curtos e áudios da equipe).
- Integrar calendário (agenda compartilhada) após validação do fluxo no Pro.
