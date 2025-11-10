# Institucional – Visão Geral e Regras de Negócio

## 1. Propósito
- Plataforma web (Next.js) para escolas, clínicas e ONGs gerenciarem múltiplas crianças e profissionais.
- Complementa Kids, Tutors e Pro com visão macro do impacto institucional.
- Instituição atua como “gestora”, sem acesso aos dados sigilosos do prontuário clínico individual.

## 2. Público-alvo
- **Escolas:** coordenadores pedagógicos e equipe de apoio (fono, psicopedagogos, etc.).
- **Clínicas:** gestores e donos de clínicas multidisciplinares.
- **Organizações sociais/ONGs:** projetos que acompanham grupos de crianças em vulnerabilidade.

## 3. Princípios de Acesso
- Cada instituição possui conta própria e assina uma licença (pagamento mensal via boletos futuros).
- Usuários: administradores (contratante), gestores de área e espectadores (ex.: diretor escolar).
- Instituição acessa dados agregados; para detalhes clínicos, deve interagir com o profissional responsável.

## 4. Funcionalidades Planejadas
### Gestão Institucional
- Cadastro e vinculação de profissionais da própria instituição (fonos, psicólogos, professores de apoio).
- Atribuição de crianças/grupos aos profissionais internos.
- Visão geral de licenças em uso, turmas atendidas e status das equipes.

### Relatórios e Dashboards
- Indicadores agregados por turma/clínica: evolução média, número de sessões concluídas, engajamento Tutor.
- Ranking de evolução por criança (com identificação mínima autorizada pelo profissional).
- Alertas institucionais (ex.: turma com regressão média, falta de feedbacks, ausência de sessões).

### Comunicação e Observações
- Canal seguro para a instituição enviar observações ao profissional (ex.: “criança apresentou melhora em sala”).
- Registro de toda interação institucional no histórico (audit trail).
- Instituição não visualiza anotações clínicas privadas entre Pro e Tutor.

### Financeiro / Licenças
- Controle de licenças ativas (quantidade de crianças e profissionais alocados).
- Geração de relatórios de uso: custo por profissional, por grupo, por período.
- Área de boletos (futuro): download e histórico de pagamentos mensais.

## 5. Fluxos de Uso
1. **Cadastro Institucional:** a escola/clínica se registra, aceita termos e escolhe plano/licença.
2. **Convite de Profissionais:** o administrador institucional convida profissionais internos (ou os encontra no Pro).
3. **Vinculação de Crianças:** em parceria com o Pro, define quais crianças serão acompanhadas pela instituição.
4. **Acompanhamento:** instituição visualiza evolução agregada, envia observações, aciona profissionais quando necessário.
5. **Renovação e Pagamento:** todo mês, o responsável acessa a área de boletos para quitar a licença.

## 6. Segurança e Compliance
- O prontuário clínico completo permanece exclusivo do Pro (com consentimento dos responsáveis).
- Instituição visualiza dados apenas no nível acordado (indicadores gerais, sem detalhes sensíveis).
- Logs de acesso e comunicação ficam registrados para auditoria.

## 7. Integração com os Demais Módulos
- **Kids:** resultados alimentam indicadores institucionais (médias de acerto, atividades realizadas).
- **Tutors:** feedbacks diários podem ser agregados como indicadores de engajamento familiar.
- **Pro:** profissionais autorizam quais dados podem ser compartilhados com a instituição.
- **API:** endpoints específicos para relatórios agregados e gestão de licenças.

## 8. Roadmap Inicial
- Definir modelagem Supabase (tabelas: `institutions`, `institution_users`, `institution_groups`, `institution_reports`, `institution_billing`).
- Criar protótipo Next.js com autenticação, dashboard inicial e cards de indicadores.
- Implementar integração com Pro/Kids/Tutors para dados agregados.
- Desenvolver módulo financeiro (boletos e relatórios de consumo).
