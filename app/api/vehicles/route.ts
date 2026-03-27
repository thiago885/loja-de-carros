import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { images, features, ...vehicleData } = body;

    const vehicle = await prisma.vehicle.create({
      data: {
        ...vehicleData,
        images: {
          create: images.map((img: any) => ({
            url: img.url,
            isPrincipal: img.isPrincipal,
            order: img.order,
          })),
        },
        features: {
          create: features.map((f: string) => ({
            name: f,
          })),
        },
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar veículo' }, { status: 500 });
  }
}
