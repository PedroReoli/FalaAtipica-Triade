## Deploy & Build Checks
- [ ] Executar `npm run build` no `Apps/site`
- [ ] Rodar `npm run verify-build` e confirmar pasta `_next/`
- [ ] Publicar pasta `out/` completa (incluindo `_next/static/`)
- [ ] Revisar documentação de deploy (`docs/DEPLOY.md`) após qualquer ajuste

## Dados & Análises
- [ ] Garantir que `Apps/site/src/data/usabilidadeData.ts` reflete exatamente a planilha atual
- [ ] Validar gráficos de `/usabilidade/analise` com os dados atualizados
- [ ] Manter `Apps/site/scripts/data/{nomes,sugestoes}.json` sincronizados com o site

## UX / Páginas
- [ ] Revisar página 404 personalizada (`Apps/site/src/app/not-found.tsx`) pós-deploy
- [ ] Checar consistência visual dos cards de estatísticas na rota `/usabilidade/analise`

## Reorganização de Pastas
- [x] criar pasta `Apps/` e mover `api/`, `Kids/`, `Mockup/`, `Pro/`, `Tutors/`, `site/`, `logs/`
- [ ] Ajustar caminhos em código (ex.: `Apps/api/services/jsonService.js`, `Apps/Pro/src/services/mockDataService.ts`)
- [ ] Atualizar `.gitignore`, `README.md`, `TODO.md` e demais docs com novos caminhos
- [ ] Revisar scripts/automação que fazem `cd` nas antigas pastas raiz

## Backend & Integração
- [ ] Atualizar `JSON_PATH` padrão (`Apps/api/config/env.js`) se necessário
- [ ] Testar `npm run dev` em `Apps/api` após ajustes de caminho
- [ ] Validar carregamento de mockups no app Pro depois da reorganização

## Documentação
- [ ] Revisar e corrigir referências a caminhos em `docs/` e `README.md`
- [ ] Atualizar roadmap (`TODO.md`) após mover as pastas
