import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Calendar, Clock, User, Target, Activity } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useProfessionalColors } from '../hooks/useProfessionalColors';

interface SessionObjective {
  id: string;
  description: string;
  completed: boolean;
}

interface SessionActivity {
  id: string;
  name: string;
  duration: number;
  materials: string[];
  notes: string;
}

export const EditSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professionalType } = useProfessional();
  const colors = useProfessionalColors(professionalType);

  const [formData, setFormData] = useState({
    patientId: '1',
    patientName: 'João Silva',
    date: '2024-01-15',
    time: '14:00',
    duration: 60,
    type: 'Terapia Individual',
    status: 'completed',
    location: 'Consultório 1',
    professional: 'Dr. Ana Santos'
  });

  const [objectives, setObjectives] = useState<SessionObjective[]>([
    { id: '1', description: 'Melhorar articulação do fonema /r/', completed: true },
    { id: '2', description: 'Trabalhar fluência na fala', completed: true },
    { id: '3', description: 'Exercitar coordenação motora oral', completed: false }
  ]);

  const [activities, setActivities] = useState<SessionActivity[]>([
    {
      id: '1',
      name: 'Exercícios de articulação',
      duration: 20,
      materials: ['Espelho', 'Palitos de sorvete', 'Cartões com imagens'],
      notes: 'Paciente demonstrou boa coordenação'
    },
    {
      id: '2',
      name: 'Jogo de palavras',
      duration: 25,
      materials: ['Tabuleiro', 'Dados', 'Cartas'],
      notes: 'Excelente participação e concentração'
    }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleObjectiveChange = (id: string, field: string, value: string | boolean) => {
    setObjectives(prev => prev.map(obj => 
      obj.id === id ? { ...obj, [field]: value } : obj
    ));
  };

  const addObjective = () => {
    const newObjective: SessionObjective = {
      id: Date.now().toString(),
      description: '',
      completed: false
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
    const newActivity: SessionActivity = {
      id: Date.now().toString(),
      name: '',
      duration: 0,
      materials: [],
      notes: ''
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sessão editada:', { formData, objectives, activities });
    alert('Sessão atualizada com sucesso!');
    navigate(`/sessions/${id}`);
  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${colors.primary}` }}>
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
                      Editar Sessão
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Atualize as informações da sessão
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="dashboard-spacing">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: `2px solid ${colors.primary}` }}>
                {/* Informações Básicas */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar size={20} style={{ color: colors.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                      Informações Básicas
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Paciente
                      </label>
                      <input
                        type="text"
                        value={formData.patientName}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horário *
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duração (min) *
                      </label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        min="15"
                        max="180"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Sessão *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: colors.primary }}
                      >
                        <option value="Terapia Individual">Terapia Individual</option>
                        <option value="Terapia em Grupo">Terapia em Grupo</option>
                        <option value="Avaliação">Avaliação</option>
                        <option value="Consulta">Consulta</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: colors.primary }}
                      >
                        <option value="scheduled">Agendada</option>
                        <option value="completed">Realizada</option>
                        <option value="cancelled">Cancelada</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Local
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: colors.primary }}
                        placeholder="Consultório 1"
                      />
                    </div>
                  </div>
                </div>

                {/* Objetivos */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Target size={20} style={{ color: colors.primary }} />
                      <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                        Objetivos da Sessão
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={addObjective}
                      className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Plus size={16} className="inline mr-1" />
                      Adicionar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {objectives.map((objective) => (
                      <div key={objective.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
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
                          placeholder="Descreva o objetivo..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                          style={{ focusRingColor: colors.primary }}
                        />
                        <button
                          type="button"
                          onClick={() => removeObjective(objective.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Atividades */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Activity size={20} style={{ color: colors.primary }} />
                      <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                        Atividades Realizadas
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={addActivity}
                      className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Plus size={16} className="inline mr-1" />
                      Adicionar
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={activity.name}
                            onChange={(e) => handleActivityChange(activity.id, 'name', e.target.value)}
                            placeholder="Nome da atividade..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none mr-3"
                            style={{ focusRingColor: colors.primary }}
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={activity.duration}
                              onChange={(e) => handleActivityChange(activity.id, 'duration', parseInt(e.target.value))}
                              placeholder="Duração"
                              min="1"
                              max="120"
                              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                              style={{ focusRingColor: colors.primary }}
                            />
                            <span className="text-sm text-gray-600">min</span>
                            <button
                              type="button"
                              onClick={() => removeActivity(activity.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
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
                              style={{ focusRingColor: colors.primary }}
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
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Observações
                          </label>
                          <textarea
                            value={activity.notes}
                            onChange={(e) => handleActivityChange(activity.id, 'notes', e.target.value)}
                            placeholder="Observações sobre a atividade..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => navigate(`/sessions/${id}`)}
                    className="px-6 py-3 rounded-lg border-2 font-medium transition-colors"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Save size={18} />
                    <span>Salvar Alterações</span>
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
