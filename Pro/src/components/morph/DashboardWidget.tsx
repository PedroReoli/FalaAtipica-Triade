import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useProfessionalColors } from '../../hooks/useProfessionalColors';
import type { ProfessionalType } from '../../types';

interface DashboardWidgetProps {
  professionalType: ProfessionalType;
  widget: {
    title: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'stable';
    icon: any;
  };
  onClick?: () => void;
  className?: string;
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return TrendingUp;
    case 'down':
      return TrendingDown;
    case 'stable':
      return Minus;
    default:
      return Minus;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    case 'stable':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  professionalType,
  widget,
  onClick,
  className = ''
}) => {
  const colors = useProfessionalColors(professionalType);
  const TrendIcon = getTrendIcon(widget.trend);

  return (
    <div
      className={`
        bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
        border-2 border-transparent hover:border-opacity-50
        ${className}
      `}
      style={{
        '--professional-color': colors.primary,
        '--professional-secondary': colors.secondary,
        '--professional-light': colors.light,
        borderColor: colors.primary
      } as React.CSSProperties}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: colors.light }}
        >
          <widget.icon size={24} style={{ color: colors.primary }} />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(widget.trend)}`}>
          <TrendIcon size={16} />
          <span className="text-sm font-medium">{widget.change}</span>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-2xl font-bold mb-1" style={{ color: colors.primary }}>
          {widget.value}
        </h3>
        <p className="text-sm text-gray-600">{widget.title}</p>
      </div>

      {/* Hover Effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-5 transition-opacity duration-200"
        style={{ backgroundColor: colors.primary }}
      />
    </div>
  );
};
