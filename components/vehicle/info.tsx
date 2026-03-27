import * as React from "react"
import { Calendar, Gauge, Settings2, Fuel, Palette, Hash, Zap } from "lucide-react"
import { formatCurrency, formatMileage } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface VehicleInfoProps {
  vehicle: any
}

export function VehicleInfo({ vehicle }: VehicleInfoProps) {
  const specs = [
    { label: "Ano", value: `${vehicle.year}/${vehicle.modelYear}`, icon: Calendar },
    { label: "Quilometragem", value: formatMileage(vehicle.mileage), icon: Gauge },
    { label: "Câmbio", value: vehicle.transmission, icon: Settings2 },
    { label: "Combustível", value: vehicle.fuelType, icon: Fuel },
    { label: "Cor", value: vehicle.color, icon: Palette },
    { label: "Motorização", value: vehicle.engineSize || "N/A", icon: Zap },
    { label: "Final de Placa", value: vehicle.plateEnding || "N/A", icon: Hash },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="uppercase tracking-wider font-semibold">
            {vehicle.brand}
          </Badge>
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {vehicle.status === 'AVAILABLE' ? 'Disponível' : vehicle.status}
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {vehicle.model} <span className="text-muted-foreground font-normal">{vehicle.version}</span>
        </h1>
      </div>

      <div className="bg-muted/50 p-6 rounded-2xl border border-muted-foreground/10">
        <p className="text-sm text-muted-foreground mb-1">Preço à vista</p>
        <p className="text-4xl font-extrabold text-primary tracking-tight">
          {formatCurrency(vehicle.price)}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {specs.map((spec) => (
          <div key={spec.label} className="bg-background p-4 rounded-xl border border-muted-foreground/10 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <spec.icon className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">{spec.label}</span>
            </div>
            <p className="font-bold text-sm">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
