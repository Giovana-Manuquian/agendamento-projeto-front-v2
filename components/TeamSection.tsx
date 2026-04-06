'use client';

import { useEffect, useState } from 'react';
import { getUsers, type User } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase } from 'lucide-react';

// Gera cor de avatar baseado no nome
function getAvatarColor(name: string): string {
  const colors = [
    'bg-primary/10 text-primary',
    'bg-accent/10 text-accent',
    'bg-chart-1/10 text-chart-1',
    'bg-chart-2/10 text-chart-2',
    'bg-chart-3/10 text-chart-3',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

// Extrai iniciais do nome
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TeamSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="team" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground mb-6">
            <Users className="h-4 w-4 text-primary" />
            <span>Nossa Equipe</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Profissionais Qualificados
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Conheça os especialistas que fazem parte da nossa equipe dedicada ao seu bem-estar.
          </p>
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 bg-muted rounded" />
                      <div className="h-3 w-20 bg-muted rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <Card 
                key={user.id} 
                className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${getAvatarColor(user.name)} font-semibold text-lg transition-transform duration-300 group-hover:scale-105`}>
                      {getInitials(user.name)}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {user.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground truncate">
                          {user.specialty}
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      Disponivel
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
