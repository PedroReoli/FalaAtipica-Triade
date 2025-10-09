import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Target, Activity, FileText, CheckCircle, AlertCircle, TrendingUp, User, BookOpen } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';

interface ReportObjective {
  id: string;
  description: string;
  completed: boolean;
  progress: number;
}

interface ReportActivity {
  id: string;
  name: string;
  duration: number;
  materials: string[];
  notes: string;
  effectiveness: number;
}

interface TechnicalAssessment {
  articulation: number;
  phonology: number;
  fluency: number;
  voice: number;
  overall: number;
}

export const EditSessionReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professionalType } = useProfessional();
  const roleColor = useRoleColor();

  const [objectives, setObjectives] = useState<ReportObjective[]>([
    { id: '1', description: 'Melhorar articulação do fonema /r/', completed: true, progress: 80 },
    { id: '2', description: 'Trabalhar fluência na fala', completed: true, progress: 70 },
    { id: '3', description: 'Exercitar coordenação motora oral', completed: false, progress: 40 }
  ]);

  const [activities, setActivities] = useState<ReportActivity[]>([
    {
      id: '1',
      name: 'Exercícios de articulação',
      duration: 20,
      materials: ['Espelho', 'Palitos de sorvete', 'Cartões com imagens'],
      notes: 'Paciente demonstrou boa coordenação',
      effectiveness: 85
    },
    {
      id: '2',
      name: 'Jogo de palavras',
      duration: 25,
      materials: ['Tabuleiro', 'Dados', 'Cartas'],
      notes: 'Excelente participação e concentração',
      effectiveness: 90
    }
  ]);

  const [technicalAssessment, setTechnicalAssessment] = useState<TechnicalAssessment>({
    articulation: 75,
    phonology: 80,
    fluency: 70,
    voice: 85,
    overall: 78
  });

  const [reportData, setReportData] = useState({
    observations: 'Paciente apresentou excelente evolução na sessão. Demonstrou maior confiança e participação ativa em todas as atividades propostas.',
    behavior: 'Colaborativo e motivado',
    progress: 75,
    nextSteps: [
      'Continuar exercícios de articulação em casa',
      'Praticar fluência com leitura em voz alta',
      'Agendar próxima sessão para próxima semana'
    ],
    recommendations: 'Manter rotina de exercícios diários e acompanhar progresso com atividades lúdicas.',
    homework: 'Praticar exercícios de articulação por 15 minutos diários e ler em voz alta por 10 minutos.',
    focusNextSession: 'Trabalhar especificamente com fonemas /s/ e /z/ que ainda apresentam dificuldades.'
  });

  const handleObjectiveChange = (id: string, field: string, value: string | boolean | number) => {
    setObjectives(prev => prev.map(obj => 
      obj.id === id ? { ...obj, [field]: value } : obj
    ));
  };

  const addObjective = () => {
    const newObjective: ReportObjective = {
      id: Date.now().toString(),
      description: '',
      completed: false,
      progress: 0
    };
    setObjectives(prev => [...prev, newObjective]);
  };

  const removeObjective = (id: string) => {
    setObjectives(prev => prev.filter(obj => obj.id !== id));
  };

  const handleActivityChange = (id: string, field: string, value: string | number | string[]) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  const addActivity = () => {
    const newActivity: ReportActivity = {
      id: Date.now().toString(),
      name: '',
      duration: 0,
      materials: [],
      notes: '',
      effectiveness: 0
    };
    setActivities(prev => [...prev, newActivity]);
  };

  const removeActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const addMaterial = (activityId: string, material: string) => {
    if (material.trim()) {
      setActivities(prev => prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, materials: [...activity.materials, material.trim()] }
          : activity
      ));
    }
  };

  const removeMaterial = (activityId: string, materialIndex: number) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, materials: activity.materials.filter((_, index) => index !== materialIndex) }
        : activity
    ));
  };

  const addNextStep = () => {
    setReportData(prev => ({
      ...prev,
      nextSteps: [...prev.nextSteps, '']
    }));
  };

  const updateNextStep = (index: number, value: string) => {
    setReportData(prev => ({
      ...prev,
      nextSteps: prev.nextSteps.map((step, i) => i === index ? value : step)
    }));
  };

  const removeNextStep = (index: number) => {
    setReportData(prev => ({
      ...prev,
      nextSteps: prev.nextSteps.filter((_, i) => i !== index)
    }));
  };

  const handleTechnicalChange = (field: string, value: number) => {
    setTechnicalAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReportChange = (field: string, value: string | number | string[]) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Relatório editado:', { objectives, activities, technicalAssessment, reportData });
    alert('Relatório atualizado com sucesso!');
    navigate(`/sessions/${id}`);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate(`/sessions/${id}`)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span>Voltar</span>
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                      Editar Relatório da Sessão
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Relatório detalhado para profissionais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="dashboard-spacing">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
                {/* Objetivos e Progresso */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Target size={20} style={{ color: roleColor.primary }} />
                      <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                        Objetivos e Progresso
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={addObjective}
                      className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                      style={{ backgroundColor: roleColor.primary }}
                    >
                      <Plus size={16} className="inline mr-1" />
                      Adicionar Objetivo
                    </button>
                  </div>
                  <div className="space-y-4">
                    {objectives.map((objective) => (
                      <div key={objective.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <input
                            type="checkbox"
                            checked={objective.completed}
                            onChange={(e) => handleObjectiveChange(objective.id, 'completed', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={objective.description}
                            onChange={(e) => handleObjectiveChange(objective.id, 'description', e.target.value)}
                            placeholder="Descrição do objetivo..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                            style={{ focusRingColor: roleColor.primary }}
                          />
                          <button
                            type="button"
                            onClick={() => removeObjective(objective.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Progresso:</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={objective.progress}
                            onChange={(e) => handleObjectiveChange(objective.id, 'progress', parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className={`text-sm font-medium w-12 ${getProgressColor(objective.progress)}`}>
                            {objective.progress}%
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor(objective.progress)}`}
                              style={{ width: `${objective.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Atividades Realizadas */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Activity size={20} style={{ color: roleColor.primary }} />
                      <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                        Atividades Realizadas
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={addActivity}
                      className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                      style={{ backgroundColor: roleColor.primary }}
                    >
                      <Plus size={16} className="inline mr-1" />
                      Adicionar Atividade
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nome da Atividade
                            </label>
                            <input
                              type="text"
                              value={activity.name}
                              onChange={(e) => handleActivityChange(activity.id, 'name', e.target.value)}
                              placeholder="Nome da atividade..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                              style={{ focusRingColor: roleColor.primary }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duração (min)
                              </label>
                              <input
                                type="number"
                                value={activity.duration}
                                onChange={(e) => handleActivityChange(activity.id, 'duration', parseInt(e.target.value))}
                                min="1"
                                max="120"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                                style={{ focusRingColor: roleColor.primary }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Efetividade (%)
                              </label>
                              <input
                                type="number"
                                value={activity.effectiveness}
                                onChange={(e) => handleActivityChange(activity.id, 'effectiveness', parseInt(e.target.value))}
                                min="0"
                                max="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                                style={{ focusRingColor: roleColor.primary }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Materiais Utilizados
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {activity.materials.map((material, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center space-x-1"
                              >
                                <span>{material}</span>
                                <button
                                  type="button"
                                  onClick={() => removeMaterial(activity.id, index)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Adicionar material..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                              style={{ focusRingColor: roleColor.primary }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addMaterial(activity.id, e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                addMaterial(activity.id, input.value);
                                input.value = '';
                              }}
                              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Observações
                          </label>
                          <textarea
                            value={activity.notes}
                            onChange={(e) => handleActivityChange(activity.id, 'notes', e.target.value)}
                            placeholder="Observações sobre a atividade..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                            style={{ focusRingColor: roleColor.primary }}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Efetividade: {activity.effectiveness}%</span>
                          <button
                            type="button"
                            onClick={() => removeActivity(activity.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avaliação Técnica */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp size={20} style={{ color: roleColor.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                      Avaliação Técnica
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(technicalAssessment).map(([key, value]) => (
                      <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {key === 'overall' ? 'Geral' : key}
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => handleTechnicalChange(key, parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className={`text-sm font-medium w-12 ${getProgressColor(value)}`}>
                            {value}%
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor(value)}`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações e Comportamento */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <User size={20} style={{ color: roleColor.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                      Observações e Comportamento
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações Gerais
                      </label>
                      <textarea
                        value={reportData.observations}
                        onChange={(e) => handleReportChange('observations', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Descreva as observações sobre a sessão..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comportamento
                      </label>
                      <textarea
                        value={reportData.behavior}
                        onChange={(e) => handleReportChange('behavior', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Descreva o comportamento do paciente..."
                      />
                    </div>
                  </div>
                </div>

                {/* Próximos Passos */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={20} style={{ color: roleColor.primary }} />
                      <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                        Próximos Passos
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={addNextStep}
                      className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                      style={{ backgroundColor: roleColor.primary }}
                    >
                      <Plus size={16} className="inline mr-1" />
                      Adicionar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {reportData.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-blue-600 font-bold">{index + 1}.</span>
                        <input
                          type="text"
                          value={step}
                          onChange={(e) => updateNextStep(index, e.target.value)}
                          placeholder="Descreva o próximo passo..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                          style={{ focusRingColor: roleColor.primary }}
                        />
                        <button
                          type="button"
                          onClick={() => removeNextStep(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendações e Tarefas */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen size={20} style={{ color: roleColor.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                      Recomendações e Tarefas
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recomendações
                      </label>
                      <textarea
                        value={reportData.recommendations}
                        onChange={(e) => handleReportChange('recommendations', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Recomendações para o paciente..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tarefas para Casa
                      </label>
                      <textarea
                        value={reportData.homework}
                        onChange={(e) => handleReportChange('homework', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Tarefas para o paciente realizar em casa..."
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foco da Próxima Sessão
                    </label>
                    <textarea
                      value={reportData.focusNextSession}
                      onChange={(e) => handleReportChange('focusNextSession', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                      style={{ focusRingColor: roleColor.primary }}
                      placeholder="O que focar na próxima sessão..."
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => navigate(`/sessions/${id}`)}
                    className="px-6 py-3 rounded-lg border-2 font-medium transition-colors"
                    style={{ borderColor: roleColor.primary, color: roleColor.primary }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <Save size={18} />
                    <span>Salvar Relatório</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
