'use client';

import { useState, useEffect } from 'react';
import { getServices, createAppointment, type Service } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, User, Mail, Store, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AppointmentForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    date: '',
    serviceId: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      await createAppointment(formData);
      setMessage({ type: 'success', text: 'Agendamento realizado com sucesso!' });
      setFormData({ clientName: '', clientEmail: '', date: '', serviceId: '' });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro ao agendar. Tente novamente.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = services.find(s => String(s.id) === formData.serviceId);

  return (
    <Card className="w-full max-w-lg shadow-xl border-border/50">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-serif">Novo Agendamento</CardTitle>
            <CardDescription>Preencha os dados para reservar seu horario</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Nome Completo
            </Label>
            <Input
              id="clientName"
              type="text"
              placeholder="Digite seu nome"
              value={formData.clientName}
              onChange={e => setFormData({...formData, clientName: e.target.value})}
              required
              className="h-11"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="clientEmail" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              E-mail
            </Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="seu@email.com"
              value={formData.clientEmail}
              onChange={e => setFormData({...formData, clientEmail: e.target.value})}
              required
              className="h-11"
            />
          </div>

          {/* Data e Hora */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              Data e Horario
            </Label>
            <Input
              id="date"
              type="datetime-local"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              required
              className="h-11"
            />
          </div>

          {/* Serviço */}
          <div className="space-y-2">
            <Label htmlFor="service" className="text-sm font-medium flex items-center gap-2">
              <Store className="h-4 w-4 text-muted-foreground" />
              Servico
            </Label>
            {loading ? (
              <div className="h-11 rounded-md border border-input bg-muted animate-pulse" />
            ) : (
              <Select
                value={formData.serviceId}
                onValueChange={(value) => setFormData({...formData, serviceId: value})}
                required
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecione o servico" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={String(service.id)}>
                      <div className="flex items-center justify-between gap-4">
                        <span>{service.name}</span>
                        <span className="text-muted-foreground">
                          R$ {service.price.toFixed(2)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Resumo do Serviço Selecionado */}
          {selectedService && (
            <div className="rounded-lg bg-secondary/50 p-4 border border-border">
              <p className="text-sm text-muted-foreground">Servico selecionado:</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-medium text-foreground">{selectedService.name}</span>
                <span className="font-bold text-primary">
                  R$ {selectedService.price.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Mensagem de Feedback */}
          {message && (
            <div className={`flex items-center gap-3 rounded-lg p-4 ${
              message.type === 'success' 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'bg-destructive/10 text-destructive border border-destructive/20'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          {/* Botão Submit */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium"
            disabled={submitting || loading}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Agendando...
              </>
            ) : (
              'Reservar Horario'
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Voce recebera um e-mail de confirmacao apos o agendamento.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
