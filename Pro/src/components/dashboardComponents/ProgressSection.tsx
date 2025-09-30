"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ProgressData {
  name: string
  progress: number
}

interface SessionData {
  day: string
  sessions: number
}

interface ProgressSectionProps {
  progressData: ProgressData[]
  sessionData: SessionData[]
  professionalType: string
  color: string
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  progressData,
  sessionData,
  professionalType,
  color,
}) => {
  const [currentChart, setCurrentChart] = useState(0)

  const charts = [
    {
      title: "Progresso Geral",
      data: progressData,
      type: "line" as const,
    },
    {
      title: "Sessões por Dia",
      data: sessionData,
      type: "bar" as const,
    },
  ]

  const nextChart = () => {
    setCurrentChart((prev) => (prev + 1) % charts.length)
  }

  const prevChart = () => {
    setCurrentChart((prev) => (prev - 1 + charts.length) % charts.length)
  }

  const currentChartData = charts[currentChart]

  return (
    <div className="progress-section" style={{ borderColor: color }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
          {currentChartData.title}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevChart}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--text-black)" }}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-500 px-2">
            {currentChart + 1} de {charts.length}
          </span>
          <button
            onClick={nextChart}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--text-black)" }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          {currentChartData.type === "line" ? (
            <LineChart data={currentChartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={currentChartData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sessions" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
