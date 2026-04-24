"use client"

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  role: 'CLIENT' | 'PROVIDER'
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void // Alterado: User primeiro, Token depois
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    // Verificação de segurança para evitar erro de JSON.parse em strings vazias ou "undefined"
    if (savedToken && savedUser && savedUser !== 'undefined') {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage", error)
        localStorage.clear() // Limpa se os dados estiverem corrompidos
      }
    }
  }, [])

  // Função de login atualizada para refletir a nova ordem
  const login = (newUser: User, newToken: string) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  return context
}