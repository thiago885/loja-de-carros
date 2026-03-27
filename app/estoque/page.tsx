import * as React from "react"
import prisma from "@/lib/prisma"
import { VehicleCard } from "@/components/vehicle-card"
import { InventoryFilters } from "@/components/inventory/filters"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface InventoryPageProps {
  searchParams: Promise<{
    brand?: string
    model?: string
    minPrice?: string
    maxPrice?: string
    minYear?: string
    maxYear?: string
  }>
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const params = await searchParams
  
  const vehicles = await prisma.vehicle.findMany({
    where: {
      status: "AVAILABLE",
      brand: params.brand ? { contains: params.brand, mode: 'insensitive' } : undefined,
      model: params.model ? { contains: params.model, mode: 'insensitive' } : undefined,
      price: {
        gte: params.minPrice ? Number(params.minPrice) : undefined,
        lte: params.maxPrice ? Number(params.maxPrice) : undefined,
      },
      year: {
        gte: params.minYear ? Number(params.minYear) : undefined,
        lte: params.maxYear ? Number(params.maxYear) : undefined,
      },
    },
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-4">Filtros</h2>
              <InventoryFilters />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">
              {vehicles.length} {vehicles.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
            </h1>
          </div>
          
          <Separator />

          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="bg-muted p-4 rounded-full">
                <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Nenhum veículo encontrado</h3>
                <p className="text-muted-foreground">Tente ajustar seus filtros para encontrar o que procura.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
