import axios from 'axios';

// Configuração do Axios para conectar com seu backend
const api = axios.create({
  baseURL: 'agendamento-projeto-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Tipos
export interface User {
  id: number;
  name: string;
  specialty: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
}

export interface AppointmentData {
  clientName: string;
  clientEmail: string;
  date: string;
  serviceId: string;
}

// Dados de fallback caso a API não esteja disponível
const fallbackUsers: User[] = [
  { id: 1, name: 'Funcionario 1', specialty: 'Especialista' },
  { id: 2, name: 'Funcionario 2', specialty: 'Especialista' },
];

const fallbackServices: Service[] = [
  { id: 1, name: 'Servico Padrao', price: 50 },
];

// Funções de API
export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch {
    // Retorna dados de fallback se a API não estiver disponível
    console.warn('[API] Backend não disponível, usando dados de demonstração');
    return fallbackUsers;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch {
    // Retorna dados de fallback se a API não estiver disponível
    console.warn('[API] Backend não disponível, usando dados de demonstração');
    return fallbackServices;
  }
}

export async function createAppointment(data: AppointmentData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.post('/appointments', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Erro ao criar agendamento');
    }
    throw new Error('Erro de conexão com o servidor. Verifique se o backend está rodando.');
  }
}

export default api;
