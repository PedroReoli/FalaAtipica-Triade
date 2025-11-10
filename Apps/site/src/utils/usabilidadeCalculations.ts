/**
 * Utilitários para cálculos estatísticos do teste de usabilidade
 * Baseado no método SUS (System Usability Scale)
 */

import { UsabilidadeResponse, questoes } from "@/data/usabilidadeData"

/**
 * Calcula o score SUS para uma resposta individual
 * SUS Score = (Soma das questões ímpares - 5) + (25 - Soma das questões pares)
 * Depois multiplica por 2.5 para obter score de 0-100
 */
export function calculateSUSScore(response: UsabilidadeResponse): number {
  let sumOdd = 0 // Questões positivas (ímpares na ordem original)
  let sumEven = 0 // Questões negativas (pares na ordem original)

  // Questões positivas (subtrair 1 do valor)
  sumOdd += response.usoFrequencia - 1
  sumOdd += response.facilidadeUso - 1
  sumOdd += response.funcionalidadesIntegradas - 1
  sumOdd += response.aprendizadoRapido - 1
  sumOdd += response.confiancaUso - 1

  // Questões negativas (subtrair valor de 5)
  sumEven += 5 - response.sistemaComplexo
  sumEven += 5 - response.necessidadeSuporte
  sumEven += 5 - response.inconsistenciaInterface
  sumEven += 5 - response.sistemaConfuso
  sumEven += 5 - response.necessidadesAntes

  const susScore = (sumOdd + sumEven) * 2.5
  return Math.round(susScore * 100) / 100 // Arredondar para 2 casas decimais
}

/**
 * Calcula estatísticas gerais das respostas
 */
export function calculateStatistics(responses: UsabilidadeResponse[]) {
  const susScores = responses.map(calculateSUSScore)
  const totalResponses = responses.length

  // Média
  const mean = susScores.reduce((sum, score) => sum + score, 0) / totalResponses

  // Desvio padrão
  const variance = susScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / totalResponses
  const standardDeviation = Math.sqrt(variance)

  // Mediana
  const sortedScores = [...susScores].sort((a, b) => a - b)
  const median = sortedScores.length % 2 === 0
    ? (sortedScores[sortedScores.length / 2 - 1] + sortedScores[sortedScores.length / 2]) / 2
    : sortedScores[Math.floor(sortedScores.length / 2)]

  // Mínimo e máximo
  const min = Math.min(...susScores)
  const max = Math.max(...susScores)

  // Classificação SUS
  let rating = "Excelente"
  let ratingColor = "#43a047"
  if (mean < 50) {
    rating = "Ruim"
    ratingColor = "#e53935"
  } else if (mean < 70) {
    rating = "OK"
    ratingColor = "#fbc02d"
  } else if (mean < 80) {
    rating = "Bom"
    ratingColor = "#1e88e5"
  } else if (mean < 90) {
    rating = "Excelente"
    ratingColor = "#43a047"
  } else {
    rating = "Excepcional"
    ratingColor = "#43a047"
  }

  return {
    totalResponses,
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    standardDeviation: Math.round(standardDeviation * 100) / 100,
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    rating,
    ratingColor,
  }
}

/**
 * Calcula média por questão
 */
export function calculateQuestionMeans(responses: UsabilidadeResponse[]) {
  const means: Record<string, number> = {}

  questoes.forEach((questao) => {
    const values = responses.map((r) => {
      const value = r[questao.key as keyof UsabilidadeResponse] as number
      // Inverter valores para questões negativas
      return questao.positive ? value : 6 - value
    })
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    means[questao.key] = Math.round(mean * 100) / 100
  })

  return means
}

/**
 * Distribuição de respostas por valor (1-5)
 */
export function calculateDistribution(responses: UsabilidadeResponse[]) {
  const distribution: Record<string, number[]> = {}

  questoes.forEach((questao) => {
    const counts = [0, 0, 0, 0, 0] // Para valores 1, 2, 3, 4, 5
    responses.forEach((r) => {
      const value = r[questao.key as keyof UsabilidadeResponse] as number
      counts[value - 1]++
    })
    distribution[questao.key] = counts
  })

  return distribution
}

/**
 * Calcula percentual de respostas por categoria SUS
 */
export function calculateSUSDistribution(responses: UsabilidadeResponse[]) {
  const susScores = responses.map(calculateSUSScore)
  
  const categories = {
    "Ruim (< 50)": susScores.filter((s) => s < 50).length,
    "OK (50-69)": susScores.filter((s) => s >= 50 && s < 70).length,
    "Bom (70-79)": susScores.filter((s) => s >= 70 && s < 80).length,
    "Excelente (80-89)": susScores.filter((s) => s >= 80 && s < 90).length,
    "Excepcional (90-100)": susScores.filter((s) => s >= 90).length,
  }

  return categories
}

