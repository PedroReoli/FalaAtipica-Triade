import React from 'react';
import { Brain, Heart, Pill } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import type { ProfessionalType } from '../types';

interface ProfessionalTypeOption {
  type: ProfessionalType;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
}

export const ProfessionalTypeSelector: React.FC = () => {
  const { professionalType, setProfessionalType } = useProfessional();

  const professionalTypes: ProfessionalTypeOption[] = [
    {
      type: 'fonoaudiologo',
      name: 'Fonoaudiólogo',
      description: 'Especialista em comunicação e linguagem',
      icon: Brain,
      color: 'bg-verde-escuro',
      features: [
        'Avaliação de linguagem',
        'Terapia de fala',
        'Audiometria',
        'Relatórios de progresso'
      ]
    },
    {
      type: 'psicologo',
      name: 'Psicólogo',
      description: 'Especialista em comportamento e desenvolvimento',
      icon: Heart,
      color: 'bg-blue-600',
      features: [
        'Avaliação psicológica',
        'Terapia comportamental',
        'Desenvolvimento infantil',
        'Acompanhamento familiar'
      ]
    },
    {
      type: 'psiquiatra',
      name: 'Psiquiatra',
      description: 'Especialista em saúde mental e medicamentos',
      icon: Pill,
      color: 'bg-purple-600',
      features: [
        'Avaliação psiquiátrica',
        'Prescrição medicamentosa',
        'Biblioteca de receitas',
        'Acompanhamento clínico'
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Selecione seu tipo de profissional
        </h2>
        <p className="text-gray-600">
          Escolha sua especialidade para personalizar a experiência
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {professionalTypes.map((option) => (
          <div
            key={option.type}
            onClick={() => setProfessionalType(option.type)}
            className={`card cursor-pointer transition-all duration-200 ${
              professionalType === option.type
                ? 'ring-2 ring-verde-escuro shadow-lg'
                : 'hover:shadow-md'
            }`}
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <option.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {option.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {option.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 mb-2">Funcionalidades:</h4>
              <ul className="space-y-1">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-verde-escuro rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  professionalType === option.type
                    ? 'bg-verde-escuro text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-verde-claro'
                }`}
              >
                {professionalType === option.type ? 'Selecionado' : 'Selecionar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
