import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ChartData {
  name: string;
  progress?: number;
  sessions?: number;
}

interface ChartCarouselProps {
  progressData: ChartData[];
  sessionData: ChartData[];
  professionalType: string;
  color: string;
}

export const ChartCarousel: React.FC<ChartCarouselProps> = ({
  progressData,
  sessionData,
  professionalType,
  color
}) => {
  const [currentChart, setCurrentChart] = useState(0);

  const charts = [
    {
      title: 'Progresso Geral',
      data: progressData,
      type: 'line' as const,
      dataKey: 'progress'
    },
    {
      title: professionalType === 'psiquiatra' ? 'Consultas por Dia' : 'Sessões por Dia',
      data: sessionData,
      type: 'bar' as const,
      dataKey: 'sessions'
    }
  ];

  const nextChart = () => {
    setCurrentChart((prev) => (prev + 1) % charts.length);
  };

  const prevChart = () => {
    setCurrentChart((prev) => (prev - 1 + charts.length) % charts.length);
  };

  const currentChartConfig = charts[currentChart];

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
      {/* Header com navegação */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold" style={{ color: 'var(--text-black)' }}>
          {currentChartConfig.title}
        </h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={prevChart}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--text-black)' }}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex space-x-1">
            {charts.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentChart ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextChart}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--text-black)' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={200}>
        {currentChartConfig.type === 'line' ? (
          <LineChart data={currentChartConfig.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey={currentChartConfig.dataKey} 
              stroke={color} 
              strokeWidth={2} 
            />
          </LineChart>
        ) : (
          <BarChart data={currentChartConfig.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={currentChartConfig.dataKey} fill={color} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
