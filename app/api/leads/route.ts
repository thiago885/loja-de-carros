import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lead = await prisma.lead.create({
      data: {
        tipoContato: body.tipoContato,
        nomeCompleto: body.nomeCompleto,
        email: body.email,
        telefoneWhatsapp: body.telefoneWhatsapp,
        cpf: body.cpf,
        rendaMensal: body.rendaMensal,
        dadosComplementares: body.dadosComplementares,
        vehicleId: body.vehicleId,
      },
    });
    return NextResponse.json(lead);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: { vehicle: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar leads' }, { status: 500 });
  }
}
