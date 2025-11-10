"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/atoms/Container"
import { Heading } from "@/components/atoms/Heading"
import { Text } from "@/components/atoms/Text"
import { Navbar } from "@/components/layout/Navbar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { usabilidadeResponses, questoes } from "@/data/usabilidadeData"
import { calculateStatistics, calculateQuestionMeans, calculateSUSDistribution, calculateSUSScore } from "@/utils/usabilidadeCalculations"
import { TrendingUp, Users, Award, AlertCircle, CheckCircle, BarChart3, PieChart as PieChartIcon } from "lucide-react"

export default function UsabilidadeAnalisePage() {
  const stats = calculateStatistics(usabilidadeResponses)
  const questionMeans = calculateQuestionMeans(usabilidadeResponses)
  const susDistribution = calculateSUSDistribution(usabilidadeResponses)

  // Preparar dados para gráfico de barras por questão
  // Para questões negativas, já estão normalizadas (invertidas) no cálculo
  // Valores normalizados: quanto maior, melhor (1-5)
  const questionBarData = questoes.map((questao, index) => ({
    questaoNum: `Q${index + 1}`,
    questaoCompleta: questao.label,
    media: questionMeans[questao.key],
    tipo: questao.positive ? "Positiva" : "Negativa (Normalizada)",
    cor: questao.positive ? colors.success : colors.primary,
  }))

  // Preparar dados para gráfico de distribuição SUS (filtrar categorias vazias)
  const susDistributionData = Object.entries(susDistribution)
    .filter(([name, value]) => value > 0) // Remover categorias vazias
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / usabilidadeResponses.length) * 100),
    }))

  // Preparar dados para gráfico de linha (histórico de scores)
  const susScoresData = usabilidadeResponses.map((response, index) => ({
    participante: `P${index + 1}`,
    score: calculateSUSScore(response),
  }))

  // Cores para gráficos
  const colors = {
    primary: "#1e88e5",
    success: "#43a047",
    warning: "#fbc02d",
    danger: "#e53935",
    background: "#f4f6ff",
  }

  const COLORS_PIE = ["#1e88e5", "#43a047", "#fbc02d", "#e53935", "#054776"]

  // Análise textual
  const analysis = {
    overall: stats.mean >= 80
      ? "O sistema FalaAtípica apresenta excelente usabilidade, com score SUS acima de 80. Isso indica que os usuários consideram o sistema fácil de usar, intuitivo e eficiente."
      : stats.mean >= 70
      ? "O sistema FalaAtípica apresenta boa usabilidade, com score SUS acima de 70. Há espaço para melhorias, mas a experiência geral é positiva."
      : stats.mean >= 50
      ? "O sistema FalaAtípica apresenta usabilidade aceitável, com score SUS acima de 50. Recomenda-se melhorias significativas na interface e experiência do usuário."
      : "O sistema FalaAtípica apresenta usabilidade abaixo do esperado, com score SUS abaixo de 50. É necessário realizar melhorias urgentes na interface e experiência do usuário.",
    strengths: [
      "Facilidade de uso percebida pelos usuários",
      "Interface intuitiva e bem integrada",
      "Aprendizado rápido do sistema",
      "Confiança dos usuários ao utilizar o sistema",
    ],
    improvements: [
      "Reduzir complexidade percebida do sistema",
      "Melhorar consistência da interface",
      "Reduzir necessidade de suporte técnico",
      "Simplificar processos de aprendizado inicial",
    ],
  }

  const statCards = [
    {
      icon: Users,
      label: "Total de Participantes",
      value: stats.totalResponses,
      color: colors.primary,
    },
    {
      icon: Award,
      label: "Score SUS Médio",
      value: stats.mean,
      color: stats.ratingColor,
    },
    {
      icon: TrendingUp,
      label: "Classificação",
      value: stats.rating,
      color: stats.ratingColor,
    },
    {
      icon: BarChart3,
      label: "Desvio Padrão",
      value: stats.standardDeviation,
      color: colors.primary,
    },
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#054776] to-[#1e88e5] relative">
        <Navbar />
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <Heading level={1} color="white">
              Análise de Usabilidade
            </Heading>
            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto">
              Resultados do teste de usabilidade do sistema FalaAtípica baseado no método SUS (System Usability Scale)
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Estatísticas Principais */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ borderColor: card.color }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0" 
                    style={{ 
                      backgroundColor: card.color === colors.primary 
                        ? "rgba(30, 136, 229, 0.1)" 
                        : card.color === colors.success
                        ? "rgba(67, 160, 71, 0.1)"
                        : "rgba(251, 192, 45, 0.1)"
                    }}
                  >
                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <Text size="xs" color="gray" weight="medium" className="flex-1 leading-tight">
                    {card.label}
                  </Text>
                </div>
                <Heading level={2} color="primary" className="text-2xl md:text-3xl font-bold" style={{ color: card.color }}>
                  {typeof card.value === "number" ? card.value.toFixed(2) : card.value}
                </Heading>
              </motion.div>
            ))}
          </div>

          {/* Estatísticas Detalhadas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-[#1e88e5] rounded-lg p-5 shadow-md"
          >
            <Heading level={4} color="primary" className="mb-4 text-base font-semibold">
              Estatísticas Detalhadas
            </Heading>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Text size="xs" color="gray" className="mb-1">
                  Mediana
                </Text>
                <Text size="base" color="primary" weight="bold" className="text-lg">
                  {stats.median}
                </Text>
              </div>
              <div className="text-center">
                <Text size="xs" color="gray" className="mb-1">
                  Mínimo
                </Text>
                <Text size="base" color="primary" weight="bold" className="text-lg">
                  {stats.min}
                </Text>
              </div>
              <div className="text-center">
                <Text size="xs" color="gray" className="mb-1">
                  Máximo
                </Text>
                <Text size="base" color="primary" weight="bold" className="text-lg">
                  {stats.max}
                </Text>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Gráficos */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="space-y-8">
            {/* Gráfico de Distribuição SUS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border-2 border-[#1e88e5] rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <PieChartIcon className="w-6 h-6 text-[#1e88e5]" />
                <Heading level={3} color="primary">
                  Distribuição de Scores SUS
                </Heading>
              </div>
              {susDistributionData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={susDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {susDistributionData.map((entry, index) => {
                        // Cores baseadas na categoria
                        let color = COLORS_PIE[index % COLORS_PIE.length]
                        if (entry.name.includes("Ruim")) color = "#e53935"
                        else if (entry.name.includes("OK")) color = "#fbc02d"
                        else if (entry.name.includes("Bom")) color = "#1e88e5"
                        else if (entry.name.includes("Excelente")) color = "#43a047"
                        else if (entry.name.includes("Excepcional")) color = "#054776"
                        return <Cell key={`cell-${index}`} fill={color} />
                      })}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white border-2 border-[#1e88e5] rounded-lg p-3 shadow-lg">
                              <p className="font-semibold text-[#054776]">{data.name}</p>
                              <p className="text-base font-bold text-[#1e88e5]">
                                {data.value} participante{data.value !== 1 ? 's' : ''} ({data.percentage}%)
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12">
                  <Text size="base" color="gray">
                    Nenhum dado disponível para exibição
                  </Text>
                </div>
              )}
            </motion.div>

            {/* Gráfico de Linha - Scores Individuais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-[#1e88e5] rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-[#1e88e5]" />
                <Heading level={3} color="primary">
                  Scores SUS por Participante
                </Heading>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={susScoresData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="participante" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke={colors.primary} strokeWidth={3} dot={{ fill: colors.primary, r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Gráfico de Barras - Médias por Questão */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-[#1e88e5] rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-[#1e88e5]" />
                <Heading level={3} color="primary">
                  Média por Questão
                </Heading>
              </div>
              <div className="mb-4 p-3 bg-blue-50 border-l-4 border-[#1e88e5] rounded">
                <Text size="xs" color="gray" className="leading-relaxed">
                  <strong>Nota:</strong> Questões negativas foram normalizadas para comparação. 
                  Valores maiores indicam melhor avaliação (escala 1-5, onde 5 é o melhor).
                </Text>
              </div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={questionBarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="questaoNum" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 5]}
                    label={{ value: 'Média', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white border-2 border-[#1e88e5] rounded-lg p-4 shadow-lg max-w-md">
                            <p className="font-semibold text-[#054776] mb-2">{data.questaoNum}</p>
                            <p className="text-sm text-gray-700 mb-2">{data.questaoCompleta}</p>
                            <p className="text-base font-bold text-[#1e88e5]">
                              Média: {data.media.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Tipo: {data.tipo}
                            </p>
                            {data.tipo.includes("Normalizada") && (
                              <p className="text-xs text-blue-600 mt-1 italic">
                                * Questão negativa normalizada (quanto maior, melhor)
                              </p>
                            )}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar 
                    dataKey="media" 
                    radius={[4, 4, 0, 0]}
                  >
                    {questionBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Bar>
                  <Legend 
                    content={({ payload }) => (
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.success }}></div>
                          <span className="text-sm text-gray-700">Questões Positivas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }}></div>
                          <span className="text-sm text-gray-700">Questões Negativas (Normalizadas)</span>
                        </div>
                      </div>
                    )}
                  />
                </BarChart>
              </ResponsiveContainer>
              
              {/* Legenda das Questões */}
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <Heading level={4} color="primary" className="mb-4 text-sm">
                  Legenda das Questões:
                </Heading>
                <div className="grid md:grid-cols-2 gap-3">
                  {questoes.map((questao, index) => (
                    <div key={index} className="flex gap-2 text-sm">
                      <span className="font-semibold text-[#1e88e5] min-w-[40px]">
                        Q{index + 1}:
                      </span>
                      <span className="text-gray-700 flex-1">
                        {questao.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Análise Textual */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Análise Geral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border-2 border-[#1e88e5] rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#43a047]" />
                <Heading level={3} color="primary">
                  Análise Geral
                </Heading>
              </div>
              <Text size="base" color="gray" className="leading-relaxed">
                {analysis.overall}
              </Text>
            </motion.div>

            {/* Pontos Fortes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-[#43a047] rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-[#43a047]" />
                <Heading level={3} color="primary">
                  Pontos Fortes
                </Heading>
              </div>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#43a047] flex-shrink-0 mt-0.5" />
                    <Text size="sm" color="gray">
                      {strength}
                    </Text>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Melhorias Sugeridas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-[#fbc02d] rounded-xl p-6 shadow-lg md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-[#fbc02d]" />
                <Heading level={3} color="primary">
                  Melhorias Sugeridas
                </Heading>
              </div>
              <ul className="grid md:grid-cols-2 gap-3">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-[#fbc02d] flex-shrink-0 mt-0.5" />
                    <Text size="sm" color="gray">
                      {improvement}
                    </Text>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Metodologia */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-[#054776] rounded-xl p-6 shadow-lg"
          >
            <Heading level={3} color="primary" className="mb-4">
              Metodologia
            </Heading>
            <div className="space-y-4">
              <Text size="base" color="gray">
                Este teste de usabilidade foi baseado no método <strong>System Usability Scale (SUS)</strong>, desenvolvido por John Brooke em 1986. O SUS é um questionário padronizado composto por 10 questões que avaliam a usabilidade de sistemas.
              </Text>
              <Text size="base" color="gray">
                O score SUS varia de 0 a 100, onde:
              </Text>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <Text size="sm" color="gray">
                    <strong>0-50:</strong> Ruim - Sistema com problemas significativos de usabilidade
                  </Text>
                </li>
                <li>
                  <Text size="sm" color="gray">
                    <strong>50-70:</strong> OK - Sistema aceitável, mas com espaço para melhorias
                  </Text>
                </li>
                <li>
                  <Text size="sm" color="gray">
                    <strong>70-80:</strong> Bom - Sistema com boa usabilidade
                  </Text>
                </li>
                <li>
                  <Text size="sm" color="gray">
                    <strong>80-90:</strong> Excelente - Sistema com excelente usabilidade
                  </Text>
                </li>
                <li>
                  <Text size="sm" color="gray">
                    <strong>90-100:</strong> Excepcional - Sistema com usabilidade excepcional
                  </Text>
                </li>
              </ul>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}

