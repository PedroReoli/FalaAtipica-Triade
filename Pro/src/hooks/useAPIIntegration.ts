// Hook para integração com API - Pro
import { useEffect, useState } from 'react';
import { apiService, SessionData } from '../services/apiService';
import { socketService } from '../services/socketService';

export const useAPIIntegration = (professionalId?: string, professionalName?: string) => {
  const [isAPIAvailable, setIsAPIAvailable] = useState(false);

  useEffect(() => {
    // Verificar se API está disponível
    checkAPIAvailability();

    // Conectar WebSocket se profissional estiver definido
    if (professionalId && professionalName) {
      socketService.connect(professionalId, professionalName);
    }

    return () => {
      // Não desconectar aqui - manter conexão ativa durante sessão
    };
  }, [professionalId, professionalName]);

  const checkAPIAvailability = async () => {
    try {
      const isAvailable = await apiService.checkHealth();
      setIsAPIAvailable(isAvailable);
      
      if (isAvailable) {
        console.log('✅ API disponível');
      } else {
        console.log('⚠️ API não disponível - usando dados locais');
      }
    } catch (error) {
      setIsAPIAvailable(false);
      console.log('⚠️ API offline - usando dados locais');
    }
  };

  // Buscar pacientes (com fallback)
  const getPatients = async (professionalId: string, fallbackData?: any) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.getPatients(professionalId);
        console.log('✅ Pacientes carregados da API');
        return result;
      } else {
        console.log('⚠️ Usando dados mockados locais');
        return fallbackData || null;
      }
    } catch (error) {
      console.error('❌ Erro ao buscar pacientes, usando fallback');
      return fallbackData || null;
    }
  };

  // Criar sessão (com fallback)
  const createSession = async (data: SessionData, onSuccess?: () => void) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.createSession(data);
        console.log('✅ Sessão criada na API:', result);
        onSuccess?.();
        return result;
      } else {
        console.log('⚠️ API offline - sessão não sincronizada');
        // Simular sucesso local
        onSuccess?.();
        return { sessionId: 'local_' + Date.now() };
      }
    } catch (error) {
      console.error('❌ Erro ao criar sessão:', error);
      return null;
    }
  };

  // Buscar paciente (com fallback)
  const getPatient = async (patientId: string, fallbackData?: any) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.getPatient(patientId);
        console.log('✅ Paciente carregado da API');
        return result;
      } else {
        console.log('⚠️ Usando dados mockados locais');
        return fallbackData || null;
      }
    } catch (error) {
      console.error('❌ Erro ao buscar paciente, usando fallback');
      return fallbackData || null;
    }
  };

  // Buscar relatórios (com fallback)
  const getReports = async (patientId: string, fallbackData?: any) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.getReports(patientId);
        console.log('✅ Relatórios carregados da API');
        return result;
      } else {
        console.log('⚠️ Usando dados mockados locais');
        return fallbackData || null;
      }
    } catch (error) {
      console.error('❌ Erro ao buscar relatórios, usando fallback');
      return fallbackData || null;
    }
  };

  // Atualizar paciente
  const updatePatient = async (patientId: string, updates: any) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.updatePatient(patientId, updates);
        console.log('✅ Paciente atualizado na API');
        return result;
      } else {
        console.log('⚠️ API offline - atualização não sincronizada');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar paciente:', error);
      return null;
    }
  };

  // Buscar medicamentos (com fallback)
  const getMedications = async (fallbackData?: any) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.getMedications();
        console.log('✅ Medicamentos carregados da API');
        return result;
      } else {
        console.log('⚠️ Usando dados mockados locais');
        return fallbackData || null;
      }
    } catch (error) {
      console.error('❌ Erro ao buscar medicamentos, usando fallback');
      return fallbackData || null;
    }
  };

  // Adicionar medicamento
  const addMedication = async (medicationData: any, onSuccess?: () => void) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.addMedication(medicationData);
        console.log('✅ Medicamento adicionado na API');
        onSuccess?.();
        return result;
      } else {
        console.log('⚠️ API offline - medicamento não sincronizado');
        onSuccess?.();
        return { id: 'local_' + Date.now() };
      }
    } catch (error) {
      console.error('❌ Erro ao adicionar medicamento:', error);
      return null;
    }
  };

  return {
    isAPIAvailable,
    getPatients,
    getPatient,
    createSession,
    getReports,
    updatePatient,
    getMedications,
    addMedication,
    checkAPIAvailability
  };
};

