import { prisma } from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">CRM de Leads</h1>

      <div className="border rounded-xl bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="text-xs">
                  {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-bold">{lead.nomeCompleto}</p>
                    <p className="text-xs text-muted-foreground">{lead.telefoneWhatsapp}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.tipoContato}</Badge>
                </TableCell>
                <TableCell>
                  {lead.vehicle ? (
                    <div className="text-xs">
                      <p className="font-medium">{lead.vehicle.modelo}</p>
                      <p className="text-muted-foreground">{lead.vehicle.marca}</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">Geral</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge>{lead.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Ver Detalhes</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Button({ children, variant, size, className }: any) {
  return <button className={`px-3 py-1 rounded text-sm font-medium ${variant === 'ghost' ? 'hover:bg-muted' : 'bg-primary text-white'} ${className}`}>{children}</button>
}
