'use client';

import { Calendar, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-serif text-lg font-bold text-foreground">AgendaFacil</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Sistema completo de agendamento online para o seu negocio. 
                Simples, rapido e profissional.
              </p>
            </div>

            {/* Servicos */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">Agendamento online</li>
                <li className="text-sm text-muted-foreground">Gestao de clientes</li>
                <li className="text-sm text-muted-foreground">Lembretes automaticos</li>
                <li className="text-sm text-muted-foreground">Relatorios completos</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Links Rapidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Nossa Equipe
                  </a>
                </li>
                <li>
                  <a href="#booking" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Agendar Horario
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Politica de Privacidade
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  (00) 00000-0000
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  contato@seunegocio.com
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground mb-2">Redes Sociais</p>
                <div className="flex items-center gap-3">
                  <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AgendaFacil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
