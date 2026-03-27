import * as React from "react"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { VehicleGallery } from "@/components/vehicle/gallery"
import { VehicleInfo } from "@/components/vehicle/info"
import { FinancingCalculator } from "@/components/vehicle/financing-calculator"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

interface VehiclePageProps {
  params: Promise<{ id: string }>
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = await params
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      features: true,
    },
  })

  if (!vehicle) {
    notFound()
  }

  // JSON-LD for Google Vehicle Listings
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": `${vehicle.brand} ${vehicle.model} ${vehicle.version || ''}`,
    "image": vehicle.images.map(img => img.url),
    "description": vehicle.description,
    "brand": {
      "@type": "Brand",
      "name": vehicle.brand
    },
    "model": vehicle.model,
    "modelDate": vehicle.year,
    "vehicleTransmission": vehicle.transmission,
    "fuelType": vehicle.fuelType,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": vehicle.mileage,
      "unitCode": "KMT"
    },
    "offers": {
      "@type": "Offer",
      "price": vehicle.price,
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Gallery */}
        <div className="space-y-6">
          <VehicleGallery images={vehicle.images} />
          
          <div className="hidden lg:block space-y-6">
            <Separator />
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Descrição</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {vehicle.description || "Nenhuma descrição disponível para este veículo."}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Opcionais e Itens de Série</h2>
              <div className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="space-y-8">
          <VehicleInfo vehicle={vehicle} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FinancingCalculator vehicle={vehicle} />
            <Button size="lg" className="w-full text-lg h-14">
              Tenho Interesse
            </Button>
          </div>

          {/* Mobile Description & Features */}
          <div className="lg:hidden space-y-6 pt-6 border-t">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Descrição</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {vehicle.description || "Nenhuma descrição disponível para este veículo."}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Opcionais</h2>
              <div className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
