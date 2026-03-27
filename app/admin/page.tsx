import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Users, TrendingUp, DollarSign } from 'lucide-react';

export default async function AdminDashboard() {
  const [vehicleCount, leadCount, recentLeads, featuredCount] = await Promise.all([
    prisma.vehicle.count(),
    prisma.lead.count(),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { vehicle: true } }),
    prisma.vehicle.count({ where: { flagDestaque: true } }),
  ]);

  const stats = [
    { title: 'Total Veículos', value: vehicleCount, icon: Car, color: 'text-blue-600' },
    { title: 'Total Leads', value: leadCount, icon: Users, color: 'text-green-600' },
    { title: 'Destaques', value: featuredCount, icon: TrendingUp, color: 'text-orange-600' },
    { title: 'Novos Leads (Hoje)', value: recentLeads.length, icon: DollarSign, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Visão Geral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lead.nomeCompleto}</p>
                    <p className="text-xs text-muted-foreground">{lead.tipoContato} - {lead.vehicle?.modelo || 'Geral'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{new Date(lead.createdAt).toLocaleDateString()}</p>
                    <p className="text-[10px] uppercase">{lead.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <a href="/admin/estoque/novo" className="p-4 border rounded-xl hover:bg-muted transition-colors text-center">
              <Car className="mx-auto mb-2" />
              <span className="text-sm font-medium">Novo Veículo</span>
            </a>
            <a href="/admin/banners" className="p-4 border rounded-xl hover:bg-muted transition-colors text-center">
              <TrendingUp className="mx-auto mb-2" />
              <span className="text-sm font-medium">Gerenciar Banners</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
