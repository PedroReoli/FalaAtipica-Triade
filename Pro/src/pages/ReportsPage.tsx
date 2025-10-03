"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { 
  BarChart3, 
  Download, 
  Upload, 
  FileText, 
  Calendar, 
  User, 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  File,
  FileImage,
  FileSpreadsheet,
  MoreHorizontal,
  X
} from "lucide-react"
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
}

export const ReportsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterDate, setFilterDate] = useState<string>("all")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [newReport, setNewReport] = useState({
    title: "",
    patient: "",
    type: "",
    description: ""
  })
  const [isDragOver, setIsDragOver] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dados mockados
  const reports: Report[] = [
    {
      id: "1",
      title: "Relatório de Progresso - João Silva",
      patient: "João Silva",
      date: "2024-01-15",
      type: "Progresso",
      status: "ready",
      size: "2.3 MB",
      format: "PDF",
      description: "Relatório detalhado do progresso do paciente",
      createdBy: "Dr. Ana Silva",
      lastModified: "2024-01-15"
    },
    {
      id: "2",
      title: "Avaliação Completa - Maria Santos",
      patient: "Maria Santos",
      date: "2024-01-20",
      type: "Avaliação",
      status: "ready",
      size: "1.8 MB",
      format: "DOCX",
      description: "Avaliação completa do paciente",
      createdBy: "Dr. Carlos Santos",
      lastModified: "2024-01-20"
    },
    {
      id: "3",
      title: "Relatório Mensal - Janeiro 2024",
      patient: "Todos os Pacientes",
      date: "2024-01-31",
      type: "Mensal",
      status: "generating",
      size: "4.2 MB",
      format: "PDF",
      description: "Relatório mensal consolidado",
      createdBy: "Dr. Ana Silva",
      lastModified: "2024-01-31"
    },
    {
      id: "4",
      title: "Análise de Sessões - Pedro Costa",
      patient: "Pedro Costa",
      date: "2024-01-25",
      type: "Análise",
      status: "ready",
      size: "3.1 MB",
      format: "PDF",
      description: "Análise detalhada das sessões do paciente",
      createdBy: "Dr. Ana Silva",
      lastModified: "2024-01-25"
    },
    {
      id: "5",
      title: "Relatório de Sessões - Ana Beatriz",
      patient: "Ana Beatriz",
      date: "2024-01-28",
      type: "Sessões",
      status: "ready",
      size: "1.5 MB",
      format: "DOCX",
      description: "Relatório das sessões realizadas",
      createdBy: "Dr. Carlos Santos",
      lastModified: "2024-01-28"
    }
  ]

  // Funções de upload e geração
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(event.dataTransfer.files)
    const validFiles = files.filter(file => {
      const validTypes = ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.md', '.txt']
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      return validTypes.includes(fileExtension)
    })
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles])
    }
  }

  const handleUploadSubmit = () => {
    // Simular upload
    console.log("Arquivos enviados:", uploadedFiles)
    setShowUploadModal(false)
    setUploadedFiles([])
  }

  const handleGenerateSubmit = () => {
    // Navegar para página de edição de relatório
    const reportData = {
      title: newReport.title,
      patient: newReport.patient,
      type: newReport.type,
      description: newReport.description
    }
    
    // Salvar dados temporariamente (em um contexto ou localStorage)
    localStorage.setItem('newReportData', JSON.stringify(reportData))
    
    // Navegar para página de edição
    navigate('/reports/edit')
    
    setShowGenerateModal(false)
    setNewReport({ title: "", patient: "", type: "", description: "" })
  }

  const handleDownload = (report: Report) => {
    console.log("Baixando relatório:", report.title)
  }

  const handlePreview = (report: Report) => {
    setSelectedReport(report)
    setShowPreviewModal(true)
  }

  const handleCardClick = (report: Report) => {
    // Navegar para página de visualização do relatório
    navigate(`/reports/${report.id}`)
  }

  const handleDelete = (reportId: string) => {
    console.log("Deletando relatório:", reportId)
  }

  const getFileIcon = (format?: string) => {
    switch (format) {
      case "PDF":
        return <FileText className="w-5 h-5 text-red-500" />
      case "DOCX":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "XLSX":
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Pronto"
      case "generating":
        return "Gerando"
      case "error":
        return "Erro"
      default:
        return "Desconhecido"
    }
  }

  // Filtros
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        report.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || report.type === filterType
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    const matchesDate = filterDate === "all" || report.date.includes(filterDate)
    
    return matchesSearch && matchesType && matchesStatus && matchesDate
  })

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
              <p className="text-sm text-gray-600">
                Gerencie e visualize todos os relatórios
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
              <button
                onClick={() => setShowGenerateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <Plus className="w-4 h-4" />
                <span>Gerar Relatório</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar relatórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por Tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Tipos</option>
              <option value="Progresso">Progresso</option>
              <option value="Avaliação">Avaliação</option>
              <option value="Mensal">Mensal</option>
              <option value="Análise">Análise</option>
              <option value="Sessões">Sessões</option>
            </select>

            {/* Filtro por Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="ready">Pronto</option>
              <option value="generating">Gerando</option>
              <option value="error">Erro</option>
            </select>

            {/* Filtro por Data */}
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as Datas</option>
              <option value="2024-01">Janeiro 2024</option>
              <option value="2024-02">Fevereiro 2024</option>
              <option value="2024-03">Março 2024</option>
            </select>
          </div>
        </div>

        {/* Lista de Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredReports.map((report) => (
            <div 
              key={report.id} 
              onClick={() => handleCardClick(report)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              style={{ border: `2px solid ${getProfessionalColor()}` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: getProfessionalColor() }}
                  >
                    {getFileIcon(report.format)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                      {report.title}
                    </h3>
                    <p className="text-xs text-gray-600">{report.patient}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(report.status)}`}>
                  <span>{getStatusText(report.status)}</span>
                </span>
              </div>

              {/* Info */}
              <div className="space-y-1 mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span className="font-medium">{new Date(report.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <User className="w-3 h-3" />
                  <span>{report.createdBy}</span>
                </div>
                {report.size && (
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <File className="w-3 h-3" />
                    <span>{report.size}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {report.description && (
                <div className="mb-3">
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {report.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePreview(report)
                    }}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title="Visualizar"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(report)
                    }}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(report.id)
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  {report.lastModified && `Modificado em ${new Date(report.lastModified).toLocaleDateString('pt-BR')}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center" style={{ border: `2px solid ${getProfessionalColor()}` }}>
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum relatório encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== "all" || filterStatus !== "all" || filterDate !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Comece criando seu primeiro relatório ou fazendo upload de um arquivo"}
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload
              </button>
              <button
                onClick={() => setShowGenerateModal(true)}
                className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Gerar Relatório
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Upload de Relatórios</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione os arquivos ou arraste e solte
                </label>
                
                {/* Área de Drag and Drop */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Upload className={`w-12 h-12 mx-auto mb-4 ${
                    isDragOver ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  
                  <div className="space-y-2">
                    <p className={`text-lg font-medium ${
                      isDragOver ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {isDragOver ? 'Solte os arquivos aqui' : 'Arraste arquivos para cá'}
                    </p>
                    <p className="text-sm text-gray-500">
                      ou clique para selecionar
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOCX, XLSX, MD, TXT (máx. 10MB cada)
                    </p>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.docx,.doc,.xlsx,.xls,.md,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Arquivos selecionados ({uploadedFiles.length}):
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {file.name.endsWith('.pdf') && <FileText className="w-5 h-5 text-red-500" />}
                            {file.name.endsWith('.docx') && <FileText className="w-5 h-5 text-blue-500" />}
                            {file.name.endsWith('.xlsx') && <FileText className="w-5 h-5 text-green-500" />}
                            {file.name.endsWith('.md') && <FileText className="w-5 h-5 text-purple-500" />}
                            {file.name.endsWith('.txt') && <FileText className="w-5 h-5 text-gray-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Remover arquivo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUploadSubmit}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Geração */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Gerar Novo Relatório</h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Relatório
                  </label>
                  <input
                    type="text"
                    value={newReport.title}
                    onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Relatório de Progresso - João Silva"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paciente
                  </label>
                  <select
                    value={newReport.patient}
                    onChange={(e) => setNewReport(prev => ({ ...prev, patient: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um paciente</option>
                    <option value="João Silva">João Silva</option>
                    <option value="Maria Santos">Maria Santos</option>
                    <option value="Pedro Costa">Pedro Costa</option>
                    <option value="Ana Beatriz">Ana Beatriz</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Relatório
                  </label>
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Progresso">Progresso</option>
                    <option value="Avaliação">Avaliação</option>
                    <option value="Análise">Análise</option>
                    <option value="Sessões">Sessões</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={newReport.description}
                    onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descreva o conteúdo do relatório..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGenerateSubmit}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Preview */}
      {showPreviewModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Visualizar Relatório</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900">{selectedReport.title}</h4>
                <p className="text-sm text-gray-600">{selectedReport.patient}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(selectedReport.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{selectedReport.createdBy}</span>
                  </div>
                  {selectedReport.size && (
                    <div className="flex items-center">
                      <File className="w-4 h-4 mr-2" />
                      <span>{selectedReport.size}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedReport.description && (
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Descrição:</h5>
                  <p className="text-sm text-gray-600">{selectedReport.description}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => handleDownload(selectedReport)}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}