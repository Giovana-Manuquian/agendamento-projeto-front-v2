'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin } from '@/services/api'; 
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login: contextLogin } = useAuth(); // Função que atualiza o estado global do usuário
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Se já estiver logado, redireciona para a home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Faz a chamada para o seu backend NestJS via api.ts
      const response = await apiLogin(formData);
      
      // 2. Sincroniza o AuthContext
      // Isso salva no localStorage e atualiza o Header instantaneamente
      contextLogin(response.user, response.access_token);

      // 3. Redireciona para a página principal
      router.push('/');
      
    } catch (err: any) {
      console.error('Erro no login:', err);
      const message = err.response?.data?.message || 'Falha no login. Verifique seu e-mail e senha.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 text-black">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Acesse sua conta</h2>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              required
              placeholder="exemplo@email.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-sm"
          >
            {isLoading ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não tem conta?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Cadastre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
}