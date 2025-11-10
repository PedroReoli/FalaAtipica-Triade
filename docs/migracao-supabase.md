# Plano de Migração – Mockup → Supabase

## 1. Objetivo
- Substituir gradualmente os dados mockados (`Apps/Mockup`) por uma instância Supabase/PostgreSQL compartilhada pelas aplicações Kids, Tutors, Pro e API.
- Preservar compatibilidade com o formato atual durante a transição.

## 2. Inventário de Dados Atuais
### Kids (`Apps/Mockup/KIDS`)
- `usuarios.json` – perfis de crianças.
- `categorias.json`, `adivinha.json`, `igual-diferente.json`, `cena-certa.json`, `palavras.json` – conteúdo dos jogos.

### Tutors (`Apps/Mockup/TUTORS`)
- `usuarios.json` – responsáveis (login).
- `perfil.json` – dados consolidados do tutor e crianças vinculadas.
- `progress.json`, `relatorios.json`, `suporte.json`, `configuracoes.json`, `dicas.json` – histórico e recursos.

### Pro (`Apps/Mockup/PRO`)
- `pacientes.json`, `profissionais.json`, `relatorios.json`, `sessoes.json`, `medicamentos.json`.

### Compartilhados (`Apps/Mockup/shared`)
- `agendas.json`, `sessions.json`, `progress.json`, `recommendations.json`, `partnerships.json`, `partnership-tokens.json`, `reminders.json`, `observations.json`.

## 3. Modelo Inicial Supabase
### Tabelas Principais
- `profiles` – usuários gerais (profissionais, tutores, responsáveis).
- `kids` – dados da criança (perfil, responsável principal, status).
- `kids_progress` – resultados dos jogos (por jogo, categoria, porcentagem, timestamps).
- `games_content` – conteúdo estático dos jogos (por tipo, nível, categoria).
- `tutors_feedback` – feedbacks registrados pelos responsáveis.
- `sessions` – sessões do Pro (status, objetivos, resultados, anexos). 
- `reports` – relatórios clínicos (metadata + link de storage).
- `recommendations` – dicas/recomendações automatizadas.
- `partnerships` / `partnership_tokens` – convites entre profissionais.
- `notifications` – eventos enviados a Tutors/Pro.

### Storage
- Bucket `games-assets` para imagens/áudios dos jogos.
- Bucket `reports` para anexos PDF/Markdown do Pro.

## 4. Estratégia de Migração
1. **Preparação**
   - Criar projeto Supabase e definir variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`.
   - Definir schema inicial com script SQL (tabelas acima).
2. **Fase 1 – Kids**
   - Migrar `usuarios.json`, `categorias.json`, `adivinha.json`, `igual-diferente.json`, `cena-certa.json`, `palavras.json` para tabelas `kids`, `games_content`.
   - Atualizar serviços em `Apps/Kids/src/services` para buscar via Supabase (mantendo fallback aos JSONs enquanto valida).
3. **Fase 2 – Tutors**
   - Migrar dados de perfil e feedbacks para `profiles`, `tutors_feedback`, `kids_progress` (vínculo tutor-criança).
   - Ajustar API (`Apps/api`) para ler do Supabase em vez dos JSONs compartilhados.
4. **Fase 3 – Pro**
   - Migrar pacientes, relatórios e sessões para `kids`, `reports`, `sessions`, `partnerships`.
   - Reconfigurar `Apps/Pro/src/services/mockDataService.ts` para utilizar Supabase (com fallback temporário).
5. **Fase 4 – Descomissionar Mockup**
   - Após validação completa em produção, remover leitura dos arquivos JSON e conservar apenas Supabase.

## 5. Atualização dos Serviços
- Criar helper Supabase no backend (`Apps/api`) para operações CRUD comuns.
- Implementar camadas de serviço no frontend (Kids/Tutors/Pro) com Supabase client do lado cliente.
- Utilizar websockets/Supabase realtime para replicar comportamento do Socket.IO (ou integrar ambos conforme necessário).

## 6. Considerações de Segurança
- Armazenar chaves sensíveis apenas em variáveis de ambiente.
- Controlar acesso por função: Tutors podem acessar progresso das crianças vinculadas, Pro tem acesso clínico completo por paciente.
- Ativar Row Level Security conforme necessidade (Supabase RLS).

## 7. Plano de Testes
- Comparar dados lidos do mock com os dados migrados (scripts de validação).
- Executar testes end-to-end em cada fase (Kids, Tutors, Pro).
- Validar logs e auditoria (`Apps/logs`) para garantir rastreabilidade.

## 8. Checklist Final
- [ ] Supabase configurado com schema inicial e buckets.
- [ ] Scripts de migração executados (JSON → CSV/SQL → Supabase).
- [ ] Serviços Kids/Tutors/Pro ajustados com fallback.
- [ ] API atualizada para usar Supabase.
- [ ] Logs monitorando erros de migração.
- [ ] Mockup desligado após verificação de produção.
