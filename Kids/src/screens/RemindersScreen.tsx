import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ArrowLeft, Bell, AlertCircle, CheckCircle } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { remindersService, Reminder } from '../services/remindersService';

type RemindersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reminders'>;

export const RemindersScreen: React.FC = () => {
  const navigation = useNavigation<RemindersScreenNavigationProp>();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRead, setShowRead] = useState(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    setIsLoading(true);
    const data = await remindersService.getReminders();
    setReminders([...data.naoLidos, ...data.lidos]);
    setIsLoading(false);
  };

  const handleMarkAsRead = async (reminderId: string) => {
    const success = await remindersService.markAsRead(reminderId);
    if (success) {
      // Atualizar lista
      setReminders(prev => prev.map(r => 
        r.id === reminderId ? { ...r, lido: true } : r
      ));
    }
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return COLORS.RED;
      case 'media': return COLORS.YELLOW;
      case 'baixa': return COLORS.BLUE;
      default: return COLORS.GREEN;
    }
  };

  const getPriorityLabel = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'Urgente';
      case 'media': return 'Normal';
      case 'baixa': return 'Baixa';
      default: return prioridade;
    }
  };

  const unreadReminders = reminders.filter(r => !r.lido);
  const readReminders = reminders.filter(r => r.lido);
  const displayReminders = showRead ? readReminders : unreadReminders;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.BLUE} />
          <Text style={styles.loadingText}>Carregando lembretes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={COLORS.TEXT_WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Lembretes</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, !showRead && styles.toggleButtonActive]}
          onPress={() => setShowRead(false)}
          activeOpacity={0.7}
        >
          <Bell size={18} color={!showRead ? COLORS.TEXT_WHITE : COLORS.BLUE} />
          <Text style={[styles.toggleText, !showRead && styles.toggleTextActive]}>
            Novos ({unreadReminders.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleButton, showRead && styles.toggleButtonActive]}
          onPress={() => setShowRead(true)}
          activeOpacity={0.7}
        >
          <CheckCircle size={18} color={showRead ? COLORS.TEXT_WHITE : COLORS.GREEN} />
          <Text style={[styles.toggleText, showRead && styles.toggleTextActive]}>
            Lidos ({readReminders.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lembretes */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {displayReminders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Bell size={48} color="#CCCCCC" />
            <Text style={styles.emptyText}>
              {showRead ? 'Nenhum lembrete lido' : 'Nenhum lembrete novo'}
            </Text>
          </View>
        ) : (
          displayReminders.map((reminder) => (
            <View 
              key={reminder.id}
              style={[styles.reminderCard, { borderLeftColor: getPriorityColor(reminder.prioridade) }]}
            >
              {/* Header do Lembrete */}
              <View style={styles.reminderHeader}>
                <View style={styles.reminderTitleRow}>
                  <Text style={styles.reminderTitle}>{reminder.titulo}</Text>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(reminder.prioridade) }]}>
                    <Text style={styles.priorityText}>{getPriorityLabel(reminder.prioridade)}</Text>
                  </View>
                </View>
                <Text style={styles.reminderProfessional}>
                  De: {reminder.professionalName}
                </Text>
              </View>

              {/* Mensagem */}
              <Text style={styles.reminderMessage}>{reminder.mensagem}</Text>

              {/* Footer */}
              <View style={styles.reminderFooter}>
                <Text style={styles.reminderDate}>
                  {new Date(reminder.criadoEm).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>

                {!reminder.lido && (
                  <TouchableOpacity 
                    style={styles.markReadButton}
                    onPress={() => handleMarkAsRead(reminder.id)}
                    activeOpacity={0.7}
                  >
                    <CheckCircle size={16} color={COLORS.GREEN} />
                    <Text style={styles.markReadText}>Marcar como lido</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.BACKGROUND_BLUE,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  placeholder: {
    width: 40,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  toggleButtonActive: {
    backgroundColor: COLORS.BLUE,
    borderColor: COLORS.BLUE,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  toggleTextActive: {
    color: COLORS.TEXT_WHITE,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
  reminderCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderHeader: {
    marginBottom: 12,
  },
  reminderTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reminderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  reminderProfessional: {
    fontSize: 13,
    color: '#666666',
    fontStyle: 'italic',
  },
  reminderMessage: {
    fontSize: 15,
    color: COLORS.TEXT_BLACK,
    lineHeight: 22,
    marginBottom: 12,
  },
  reminderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  reminderDate: {
    fontSize: 12,
    color: '#999999',
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GREEN,
  },
});

