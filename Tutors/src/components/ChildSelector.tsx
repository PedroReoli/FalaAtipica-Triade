import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

interface Child {
  id: string;
  nome: string;
  idade: number;
  progressoGeral?: number;
}

interface ChildSelectorProps {
  children: Child[];
  selectedChildId: string;
  onSelectChild: (childId: string) => void;
}

export const ChildSelector: React.FC<ChildSelectorProps> = ({
  children,
  selectedChildId,
  onSelectChild,
}) => {
  // Só renderiza se tiver 2 ou mais crianças
  if (children.length < 2) {
    return null;
  }

  // Encontrar índice da criança atual
  const currentIndex = children.findIndex(child => child.id === selectedChildId);
  const currentChild = children[currentIndex] || children[0];
  
  // Navegação
  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1;
    onSelectChild(children[newIndex].id);
  };

  const goToNext = () => {
    const newIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
    onSelectChild(children[newIndex].id);
  };

  return (
    <View style={styles.container}>
      {/* Seta Esquerda */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={goToPrevious}
        activeOpacity={0.7}
      >
        <ChevronLeft size={20} color={COLORS.BLUE} strokeWidth={3} />
      </TouchableOpacity>

      {/* Card da Criança Atual */}
      <View style={styles.childCard}>
        <View style={styles.childIcon}>
          <User size={18} color={COLORS.TEXT_WHITE} />
        </View>
        <View style={styles.childInfo}>
          <Text style={styles.childName}>{currentChild.nome}</Text>
          <Text style={styles.childAge}>{currentChild.idade} anos</Text>
        </View>
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>{currentIndex + 1}/{children.length}</Text>
        </View>
      </View>

      {/* Seta Direita */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={goToNext}
        activeOpacity={0.7}
      >
        <ChevronRight size={20} color={COLORS.BLUE} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.TEXT_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  childCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  childIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.TEXT_WHITE + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_WHITE,
    marginBottom: 2,
  },
  childAge: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.TEXT_WHITE + 'DD',
  },
  indicator: {
    backgroundColor: COLORS.TEXT_WHITE + '30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  indicatorText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.TEXT_WHITE,
    letterSpacing: 0.3,
  },
});

