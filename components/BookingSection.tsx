'use client';

import AppointmentForm from './AppointmentForm';
import { Clock, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Agendamento Rapido',
    description: 'Reserve seu horario em menos de 2 minutos',
  },
  {
    icon: Shield,
    title: 'Confirmacao Garantida',
    description: 'Receba confirmacao por e-mail instantaneamente',
  },
  {
    icon: Sparkles,
    title: 'Atendimento VIP',
    description: 'Experiencia personalizada em todas as unidades',
  },
];

export default function BookingSection() {
  return (
    <section id="booking" className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Info */}
          <div className="lg:sticky lg:top-24">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Pronto para agendar?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Escolha o servico ideal para voce e reserve seu horario com nossa equipe de especialistas.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="mt-12 rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Precisa de ajuda?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Entre em contato conosco para tirar duvidas ou fazer agendamentos especiais.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Telefone:</span> (11) 9999-9999
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">E-mail:</span> contato@scheduling.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex justify-center lg:justify-end">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
