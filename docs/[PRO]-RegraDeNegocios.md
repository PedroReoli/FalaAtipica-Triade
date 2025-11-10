# Regras de Negócio – Pro

## Visão Geral
- Plataforma direcionada a profissionais de fonoaudiologia e equipe multidisciplinar.
- Foco em consolidar dados clínicos vindos dos apps Kids e Tutors.
- Todas as ações devem manter histórico e gerar rastreabilidade para auditoria.

## Acesso e Perfis
- Login individual por profissional; permissões baseadas na especialidade cadastrada.
- Perfis habilitados: Fonoaudiólogo, Psicólogo, Pedagogo, Terapeuta Ocupacional e Coordenador.
- Coordenadores podem convidar novos profissionais e atribuir pacientes.

## Gestão de Pacientes
- Cadastro mínimo: identificação, diagnóstico, responsáveis e plano terapêutico.
- Cada paciente deve estar vinculado a pelo menos um responsável (app Tutors) e a um profissional principal.
- Progresso clínico é alimentado por sessões registradas no Pro e por interações nos apps Kids/Tutors.

## Sessões e Relatórios
- Sessões possuem status (planejada, em andamento, concluída, cancelada) e devem registrar objetivos e resultados.
- Relatórios clínicos podem ser anexados (PDF/Markdown) e ficam disponíveis para responsáveis com permissão explícita.
- Indicadores principais: desempenho semanal, habilidades trabalhadas, recomendações.

## Parcerias e Convites
- Profissionais podem gerar tokens de parceria válidos por 24h para incluir novos membros na clínica.
- Aceite de token transfere automaticamente os pacientes marcados como compartilháveis.
- Histórico de convites deve registrar quem gerou, quem aceitou e data/hora.

## Integração com Apps Kids/Tutors
- Reports do Kids alimentam métricas de desempenho (acertos, tempo de atividade, categorias trabalhadas).
- Feedbacks do Tutors geram alertas para revisão pelo profissional responsável.
- Todas as sincronizações usam a API central em tempo real com Socket.IO.

## Compliance e Auditoria
- Logs armazenados em `Apps/logs` com agrupamento por bloco de 30 minutos.
- Ações críticas (edição de prontuário, exclusão de sessão, compartilhamento de relatório) exigem confirmação dupla.
- Dados seguem padrão de anonimização ao exportar relatórios ou estatísticas.
