"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CLIENT', // Valor padrão
    specialty: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Cadastro realizado com sucesso!')
        router.push('/login') // Manda para o login após cadastrar
      } else {
        const errorData = await response.json()
        alert(`Erro: ${errorData.message}`)
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="text-muted-foreground">Escolha como deseja usar a plataforma</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome Completo</label>
            <input
              required
              className="w-full rounded-md border bg-transparent p-2"
              placeholder="Ex: Giovana Manuquian"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">E-mail</label>
            <input
              required
              type="email"
              className="w-full rounded-md border bg-transparent p-2"
              placeholder="seu@email.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Senha</label>
            <input
              required
              type="password"
              className="w-full rounded-md border bg-transparent p-2"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Eu sou:</label>
            <select
              className="w-full rounded-md border bg-card p-2 text-foreground"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="CLIENT">Cliente (quero agendar)</option>
              <option value="PROVIDER">Profissional (vou prestar serviço)</option>
            </select>
          </div>

          {/* Campo condicional: só aparece se for PROVIDER */}
          {formData.role === 'PROVIDER' && (
            <div>
              <label className="text-sm font-medium">Sua Especialidade</label>
              <input
                required
                className="w-full rounded-md border bg-transparent p-2"
                placeholder="Ex: Desenvolvedora, Cabeleireira..."
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary p-2 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>
        </form>

        <p className="text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  )
}