# Regras de Negócio – Kids

## Visão Geral
- Aplicativo React Native pensado para crianças de 3 a 12 anos com atraso de fala.
- Todas as interações seguem princípios ABA (reforço imediato, prompting temporário, fading progressivo).
- Conteúdo lúdico, com feedback visual e textual positivo em cada ação.

## Público e Objetivos
- Crianças com suporte familiar via Tutors e acompanhamento clínico via Pro.
- Estimular associação som–imagem, discriminação visual, construção de frases e vocabulário.
- Garantir sessões curtas, intuitivas e recompensadoras.

## Tecnologias e Dados
- React Native + TypeScript, Expo e React Navigation.
- Dados mockados em `Apps/Mockup/KIDS` (categorias, jogos, usuários); migração planejada para Supabase.
- Assets (imagens e sons) armazenados em `Apps/Kids/assets`.

## Jogos Disponíveis
- **Igual ou Diferente**: compara pares visuais; três níveis, prompting após 5s, estrela de reforço.
- **Cena Certa**: escolhe frase correta para a cena; confete e voz positiva nos acertos.
- **Adivinha**: perguntas com quatro alternativas; pontuação por rodada, feedback instantâneo.
- **Jogo das Palavras**: montagem por cliques (sílabas, completar, ordenar); bônus sem dica.

## Regras de Interação
- Elementos de toque ≥ 44px e contraste alto (paleta oficial: #1e88e5, #43a047, #e53935, #fbc02d, #054776, #f4f6ff, #ffffff, #3c3c3c).
- Prompting visual acionado após tempo configurado; reduzido quando a criança acerta consecutivamente.
- Reforço sempre combina animação + mensagem positiva; erros exibem dica sutil sem punição.

## Integração
- Progresso e conquistas sincronizados com Tutors e Pro via API (Socket.IO).
- Tutores recebem resumos de desempenho, profissionais analisam métricas em dashboards.

## Métricas de Sucesso
- Frequência semanal de jogos, taxa de acerto por categoria, tempo médio de sessão.
- Engajamento das crianças (número de jogos concluídos) e respostas aos prompts.

## Para Fazer
- **Memória Auditiva**: jogo de pares por som; categorias (animais, instrumentos, ações); prompting após 10s.
- **Monte a Frase**: blocos para formar frases; leitura em voz alta, prompting após 7s.
