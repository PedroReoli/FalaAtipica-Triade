"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  Download, 
  Eye,
  FileText,
  File,
  X
} from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useProfessional } from "../contexts/ProfessionalContext"

interface ReportData {
  title: string
  patient: string
  type: string
  description: string
}

export const ReportEditPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { professionalType, professionalData } = useProfessional()
  const [reportData, setReportData] = useState<ReportData>({
    title: "",
    patient: "",
    type: "",
    description: ""
  })
  const [content, setContent] = useState("")
  const [showImportModal, setShowImportModal] = useState(false)
  const [importedContent, setImportedContent] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Verificar se está editando um relatório existente
    if (id) {
      setIsEditing(true)
      // Carregar dados do relatório existente
      const editData = localStorage.getItem('editReportData')
      if (editData) {
        const parsedData = JSON.parse(editData)
        setReportData(parsedData)
        // Simular carregamento do conteúdo do relatório
        setContent(parsedData.content || `# ${parsedData.title}\n\n## Resumo\n\nConteúdo do relatório...`)
      }
    } else {
      // Carregar dados do novo relatório
      const savedData = localStorage.getItem('newReportData')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setReportData(parsedData)
      }
    }
  }, [id])

  const handleSave = () => {
    // Simular salvamento
    console.log("Salvando relatório:", { ...reportData, content })
    alert("Relatório salvo com sucesso!")
    
    // Navegar de volta para a visualização se estiver editando
    if (isEditing && id) {
      navigate(`/reports/${id}`)
    } else {
      navigate('/reports')
    }
  }

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  const handleImportMarkdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setImportedContent(text)
        setShowImportModal(true)
      }
      reader.readAsText(file)
    }
  }

  const handleApplyImport = () => {
    setContent(importedContent)
    setShowImportModal(false)
    setImportedContent("")
  }

  const handleExport = () => {
    // Simular exportação
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${reportData.title}.md`
    a.click()
    URL.revokeObjectURL(url)
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? "Editar Relatório" : "Criar Relatório"}
                </h1>
                <p className="text-sm text-gray-600">
                  {reportData.title || (isEditing ? "Editando relatório existente" : "Novo Relatório")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePreview}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>{isPreviewMode ? "Editar" : "Visualizar"}</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <Save className="w-4 h-4" />
                <span>Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Paciente: {reportData.patient}</span>
              </div>
              <div className="flex items-center space-x-2">
                <File className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Tipo: {reportData.type}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Importar Markdown</span>
                <input
                  type="file"
                  accept=".md,.txt"
                  onChange={handleImportMarkdown}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200">
          {isPreviewMode ? (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Visualização</h3>
              <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
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
                  {content || "Nenhum conteúdo ainda..."}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Editor de Texto</h3>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite o conteúdo do relatório aqui...

Você pode usar Markdown para formatação:
- **negrito**
- *itálico*
- # Título
- ## Subtítulo
- - Lista
- 1. Lista numerada

Ou simplesmente escreva em texto puro."
                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="mt-4 text-sm text-gray-500">
                Caracteres: {content.length}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Importação */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Importar Markdown</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Conteúdo importado:</h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {importedContent}
                  </pre>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApplyImport}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  Aplicar Importação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
