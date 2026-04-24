import axios from 'axios';

const api = axios.create({
  // @ts-ignore
  // url de teste para desenvolvimento local
  // baseURL: 'http://127.0.0.1:8080',
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://agendamento-projeto-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// INTERCEPTOR: Adiciona o token em cada requisição automaticamente
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    // Verificamos se o token existe e se não é uma string "undefined" ou "null"

// 👇 ADICIONE ESTA LINHA AQUI PARA VERMOS O QUE ESTÁ INDO:
    console.log("TOKEN SENDO ENVIADO:", token);

    if (token && token !== 'undefined' && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Tipos Atualizados
export interface User {
  id: string; // Mudado para string pois o Prisma UUID gera strings
  name: string;
  email: string;
  role: 'CLIENT' | 'PROVIDER';
  specialty?: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
}

export interface AppointmentData {
  serviceId: string;
  date: string;
  clientId: string; // Agora vinculamos ao ID do usuário logado
}

// Funções de Autenticação
export async function login(credentials: any) {
  const response = await api.post('/auth/login', credentials);
  return response.data; // Retorna { access_token, user }
}

export async function register(data: any) {
  const response = await api.post('/users', data);
  return response.data;
}

// Funções de Dados
export async function getServices(): Promise<Service[]> {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    console.warn('[API] Erro ao buscar serviços, usando fallback');
    return [{ id: 1, name: 'Serviço Padrão', price: 50 }];
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
    throw new Error('Erro de conexão com o servidor.');
  }
}

// Nova função: Buscar agendamentos do usuário logado
export async function getUserAppointments() {
  const response = await api.get('/appointments/my-appointments');
  return response.data;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return []; // Retorna lista vazia em caso de erro para não quebrar o front
  }
}

export default api;