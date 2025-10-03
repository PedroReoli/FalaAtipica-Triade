"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { 
  ArrowLeft, 
  Download, 
  Edit,
  Calendar,
  User,
  File,
  FileText
} from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useProfessional } from "../contexts/ProfessionalContext"

interface Report {
  id: string
  title: string
  patient: string
  date: string
  type: string
  status: "ready" | "generating" | "error"
  size?: string
  format?: string
  description?: string
  createdBy?: string
  lastModified?: string
  content?: string
}

export const ReportViewPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { professionalType, professionalData } = useProfessional()
  const [report, setReport] = useState<Report | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento do relatório
    const loadReport = () => {
      // Dados mockados - em produção viria da API
      const mockReport: Report = {
        id: id || "1",
        title: "Relatório de Progresso - João Silva",
        patient: "João Silva",
        date: "2024-01-15",
        type: "Progresso",
        status: "ready",
        size: "2.3 MB",
        format: "PDF",
        description: "Relatório detalhado do progresso do paciente",
        createdBy: "Dr. Ana Silva",
        lastModified: "2024-01-15",
        content: `# Relatório de Progresso - João Silva

## Resumo Executivo

O paciente João Silva demonstrou progresso significativo durante o período de tratamento. As sessões foram realizadas com regularidade e o engajamento foi excelente.

## Avaliação Inicial

- **Data da primeira consulta**: 15/01/2024
- **Problemas identificados**: Dificuldades na articulação de fonemas
- **Objetivos estabelecidos**: Melhorar a clareza da fala

## Progresso Observado

### Semana 1-2
- Melhoria na articulação de vogais
- Aumento da confiança ao falar
- Participação ativa nas atividades

### Semana 3-4
- Progresso na articulação de consoantes
- Redução da ansiedade ao falar
- Melhoria na comunicação em grupo

## Recomendações

1. Continuar com as sessões semanais
2. Praticar exercícios em casa
3. Envolver a família no processo
4. Acompanhar o progresso mensalmente

## Próximos Passos

- Manter a frequência das sessões
- Introduzir novos exercícios
- Avaliar a necessidade de ajustes no plano de tratamento

---
*Relatório gerado em 15/01/2024 por Dr. Ana Silva*`
      }
      
      setReport(mockReport)
      setIsLoading(false)
    }

    loadReport()
  }, [id])

  const handleDownload = () => {
    if (report) {
      // Simular download
      const blob = new Blob([report.content || ""], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${report.title}.md`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleEdit = () => {
    if (report) {
      // Salvar dados do relatório para edição
      localStorage.setItem('editReportData', JSON.stringify(report))
      navigate(`/reports/${report.id}/edit`)
    }
  }

  const getProfessionalColor = () => {
    switch (professionalType) {
      case "fonoaudiologo":
        return "var(--green)"
      case "psicologo":
        return "var(--blue)"
      case "psiquiatra":
        return "var(--red)"
      default:
        return "var(--blue)"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando relatório...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Relatório não encontrado</h3>
          <p className="text-gray-600 mb-4">O relatório solicitado não foi encontrado.</p>
          <button
            onClick={() => navigate('/reports')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Voltar para Relatórios
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/reports')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
                <p className="text-sm text-gray-600">
                  {report.patient} • {report.type}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Relatório */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date(report.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{report.createdBy}</span>
              </div>
              {report.size && (
                <div className="flex items-center space-x-2">
                  <File className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{report.size}</span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {report.lastModified && `Modificado em ${new Date(report.lastModified).toLocaleDateString('pt-BR')}`}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do Relatório */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200">
          <div className="p-6">
            {report.description && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Descrição:</h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
            )}
            
            <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Customizar componentes para melhor aparência
                  h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">{children}</h3>,
                  p: ({children}) => <p className="text-gray-700 mb-3 leading-relaxed">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-3 text-gray-700">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-3 text-gray-700">{children}</ol>,
                  li: ({children}) => <li className="mb-1">{children}</li>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
                  code: ({children}) => <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm">{children}</code>,
                  pre: ({children}) => <pre className="bg-gray-50 border border-gray-200 rounded p-4 overflow-x-auto text-sm">{children}</pre>,
                  table: ({children}) => <div className="overflow-x-auto my-4"><table className="min-w-full border border-gray-200 rounded">{children}</table></div>,
                  th: ({children}) => <th className="border border-gray-200 px-3 py-2 bg-gray-50 font-semibold text-left">{children}</th>,
                  td: ({children}) => <td className="border border-gray-200 px-3 py-2">{children}</td>,
                }}
              >
                {report.content || "Nenhum conteúdo disponível."}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
