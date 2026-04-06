'use client';

import { Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">
              AgendaFacil
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#team" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Equipe
            </a>
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Servicos
            </a>
            <a href="#booking" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Agendar
            </a>
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
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Inicio
              </a>
              <a href="#team" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Equipe
              </a>
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Servicos
              </a>
              <a href="#booking" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Agendar
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
