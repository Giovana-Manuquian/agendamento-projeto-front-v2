'use client';

import { Calendar, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">
              AgendaFacil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <a href="#team" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Equipe
            </a>
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#booking" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Agendar
            </a>

            {/* Sessão de Autenticação Desktop */}
            <div className="flex items-center gap-4 ml-4 border-l pl-4 border-border">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <UserIcon className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    {/* CORREÇÃO: Proteção contra valor undefined para evitar erro de split */}
                    <span>{user?.name?.split(' ')[0] || 'Usuário'}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Entrar
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-foreground">Início</Link>
              <a href="#team" className="text-sm font-medium text-muted-foreground">Equipe</a>
              <a href="#services" className="text-sm font-medium text-muted-foreground">Serviços</a>
              <a href="#booking" className="text-sm font-medium text-muted-foreground">Agendar</a>

              <hr className="border-border my-2" />

              {/* Sessão de Autenticação Mobile */}
              {user ? (
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5 text-muted-foreground" />
                    {/* CORREÇÃO: Proteção também na versão mobile */}
                    <span className="text-sm font-medium">{user?.name || 'Usuário'}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-destructive/10 py-2.5 text-sm font-semibold text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair da conta
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Entrar na conta
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}