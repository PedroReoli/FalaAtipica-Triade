import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { User } from 'lucide-react-native';
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

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {children.map((child) => {
          const isSelected = child.id === selectedChildId;
          
          return (
            <TouchableOpacity
              key={child.id}
              style={[
                styles.childCard,
                isSelected && styles.childCardSelected
              ]}
              onPress={() => onSelectChild(child.id)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.childIcon,
                isSelected && styles.childIconSelected
              ]}>
                <User size={16} color={isSelected ? COLORS.TEXT_WHITE : COLORS.BLUE} />
              </View>
              <View style={styles.childInfo}>
                <Text style={[
                  styles.childName,
                  isSelected && styles.childNameSelected
                ]}>
                  {child.nome}
                </Text>
                <Text style={[
                  styles.childAge,
                  isSelected && styles.childAgeSelected
                ]}>
                  {child.idade} anos
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    gap: 10,
    minWidth: 140,
  },
  childCardSelected: {
    backgroundColor: COLORS.BLUE,
    borderColor: COLORS.BLUE,
  },
  childIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.BLUE + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childIconSelected: {
    backgroundColor: COLORS.TEXT_WHITE + '30',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 2,
  },
  childNameSelected: {
    color: COLORS.TEXT_WHITE,
  },
  childAge: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666',
  },
  childAgeSelected: {
    color: COLORS.TEXT_WHITE + 'CC',
  },
});

