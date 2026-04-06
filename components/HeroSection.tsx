'use client';

import { ArrowRight, Sparkles, Clock, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Sistema de Agendamento Online</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Agende seus horarios com{' '}
            <span className="text-primary">praticidade</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
            Simplifique a gestao do seu negocio. Seus clientes agendam online, 
            voce gerencia tudo em um so lugar.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto gap-2 text-base"
              onClick={scrollToBooking}
            >
              Agendar Agora
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-base"
              onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conhecer Equipe
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border pt-10">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground">Agendamento 24h</p>
              <p className="text-sm text-muted-foreground">Disponivel a qualquer hora</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground">100% Seguro</p>
              <p className="text-sm text-muted-foreground">Seus dados protegidos</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground">Facil de Usar</p>
              <p className="text-sm text-muted-foreground">Interface intuitiva</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
