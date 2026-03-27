import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default async function AdminInventoryPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { images: { where: { isPrincipal: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestão de Estoque</h1>
        <Button asChild>
          <Link href="/admin/estoque/novo">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Veículo
          </Link>
        </Button>
      </div>

      <div className="border rounded-xl bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Veículo</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 relative rounded overflow-hidden bg-muted">
                      {vehicle.images[0] && (
                        <img src={vehicle.images[0].url} className="object-cover w-full h-full" alt="" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold">{vehicle.modelo}</p>
                      <p className="text-xs text-muted-foreground">{vehicle.marca} - {vehicle.versao}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{vehicle.anoModelo}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vehicle.precoVenda)}
                </TableCell>
                <TableCell>
                  <Badge variant={vehicle.statusInventario === 'DISPONIVEL' ? 'default' : 'secondary'}>
                    {vehicle.statusInventario}
                  </Badge>
                </TableCell>
                <TableCell>
                  {vehicle.flagDestaque ? <Badge className="bg-orange-500">SIM</Badge> : 'Não'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/estoque/${vehicle.id}`}>Editar</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
