# Dados de Usabilidade

## Como Atualizar os Dados da Planilha

Para atualizar os dados de usabilidade com os resultados reais da planilha Excel:

1. Abra o arquivo `site/src/data/usabilidadeData.ts`
2. Substitua o array `usabilidadeResponses` pelos dados reais da planilha
3. Cada objeto deve seguir a interface `UsabilidadeResponse`:

```typescript
{
  nome: string
  email: string
  usoFrequencia: number // 1-5
  sistemaComplexo: number // 1-5 (invertido no cálculo)
  facilidadeUso: number // 1-5
  necessidadeSuporte: number // 1-5 (invertido no cálculo)
  funcionalidadesIntegradas: number // 1-5
  inconsistenciaInterface: number // 1-5 (invertido no cálculo)
  aprendizadoRapido: number // 1-5
  sistemaConfuso: number // 1-5 (invertido no cálculo)
  confiancaUso: number // 1-5
  necessidadesAntes: number // 1-5 (invertido no cálculo)
  sugestoes?: string // opcional
}
```

## Estrutura da Planilha Excel

A planilha deve conter as seguintes colunas:
- Nome
- Email
- Uso Frequência (1-5)
- Sistema Complexo (1-5)
- Facilidade de Uso (1-5)
- Necessidade Suporte (1-5)
- Funcionalidades Integradas (1-5)
- Inconsistência Interface (1-5)
- Aprendizado Rápido (1-5)
- Sistema Confuso (1-5)
- Confiança Uso (1-5)
- Necessidades Antes (1-5)
- Sugestões (opcional)

## Nota sobre Questões Invertidas

Algumas questões são invertidas no cálculo do SUS:
- Sistema Complexo
- Necessidade Suporte
- Inconsistência Interface
- Sistema Confuso
- Necessidades Antes

O sistema já faz essa inversão automaticamente nos cálculos.

