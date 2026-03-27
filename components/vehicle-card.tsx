import Link from "next/link"
import Image from "next/image"
import { Calendar, Gauge, Settings2 } from "lucide-react"
import { cn, formatCurrency, formatMileage } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VehicleCardProps {
  vehicle: any
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link href={`/estoque/${vehicle.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted-foreground/10">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={vehicle.images?.[0]?.url || "https://picsum.photos/seed/placeholder/800/600"}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {vehicle.fuelType}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {vehicle.brand}
            </p>
            <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
              {vehicle.model} <span className="text-muted-foreground font-normal">{vehicle.version}</span>
            </h3>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground py-2 border-y border-muted-foreground/10">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{vehicle.year}/{vehicle.modelYear}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" />
              <span>{formatMileage(vehicle.mileage)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings2 className="h-3.5 w-3.5" />
              <span>{vehicle.transmission.charAt(0)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <p className="text-xl font-bold text-primary">
            {formatCurrency(vehicle.price)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}
