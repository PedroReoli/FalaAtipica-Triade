import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, BookOpen, Calendar, Clock } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';

interface Note {
  id: string;
  content: string;
  timestamp: string;
  author: string;
}

export const SessionNotesPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professionalType } = useProfessional();
  const roleColor = useRoleColor();

  // Dados mockados
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Paciente chegou pontualmente e demonstrou interesse nas atividades propostas. Realizamos exercícios de articulação com foco no fonema /r/.',
      timestamp: '2024-01-15T14:00:00',
      author: 'Dr. Ana Santos'
    },
    {
      id: '2',
      content: 'Observou-se melhora significativa na coordenação motora oral. O paciente conseguiu realizar os exercícios com mais facilidade que na sessão anterior.',
      timestamp: '2024-01-15T14:30:00',
      author: 'Dr. Ana Santos'
    },
    {
      id: '3',
      content: 'Durante a atividade lúdica, o paciente demonstrou criatividade e boa interação. Importante continuar estimulando esse comportamento.',
      timestamp: '2024-01-15T15:00:00',
      author: 'Dr. Ana Santos'
    }
  ]);

  const [newNote, setNewNote] = useState('');

  const sessionInfo = {
    patientName: 'João Silva',
    date: '2024-01-15',
    time: '14:00',
    duration: 60,
    type: 'Terapia Individual'
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        timestamp: new Date().toISOString(),
        author: 'Dr. Ana Santos'
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const handleSave = () => {
    alert('Anotações salvas com sucesso!');
    navigate(`/sessions/${id}`);
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigate(`/sessions/${id}`)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
                  style={{ backgroundColor: roleColor.primary }}
                >
                  <Save size={18} />
                  <span>Salvar</span>
                </button>
              </div>

              <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                  Anotações da Sessão - {sessionInfo.patientName}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar size={16} />
                    <span>{new Date(sessionInfo.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={16} />
                    <span>{sessionInfo.time} - {sessionInfo.duration} min</span>
                  </div>
                  <span className="text-gray-600">{sessionInfo.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* New Note */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: roleColor.primary }}>
                Nova Anotação
              </h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Digite sua anotação aqui..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                rows={4}
                style={{
                  focusRingColor: roleColor.primary
                }}
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: roleColor.primary }}
                >
                  <Plus size={18} />
                  <span>Adicionar Anotação</span>
                </button>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                  Histórico de Anotações
                </h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen size={18} />
                  <span className="text-sm">{notes.length} anotações</span>
                </div>
              </div>

              {notes.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma anotação ainda
                  </h3>
                  <p className="text-gray-600">
                    Adicione sua primeira anotação acima
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{note.author}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{formatDateTime(note.timestamp)}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Excluir anotação"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

