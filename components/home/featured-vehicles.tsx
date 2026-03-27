import * as React from "react"
import { VehicleCard } from "@/components/vehicle-card"

const mockVehicles = [
  {
    id: "1",
    brand: "BMW",
    model: "320i",
    version: "M Sport",
    year: 2023,
    modelYear: 2024,
    mileage: 5000,
    price: 320000,
    fuelType: "Flex",
    transmission: "Automático",
    images: [{ url: "https://picsum.photos/seed/bmw320/800/600" }],
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla",
    version: "Altis Hybrid",
    year: 2022,
    modelYear: 2023,
    mileage: 15000,
    price: 165000,
    fuelType: "Híbrido",
    transmission: "Automático",
    images: [{ url: "https://picsum.photos/seed/corolla/800/600" }],
  },
  {
    id: "3",
    brand: "Honda",
    model: "Civic",
    version: "Touring",
    year: 2021,
    modelYear: 2021,
    mileage: 30000,
    price: 145000,
    fuelType: "Gasolina",
    transmission: "Automático",
    images: [{ url: "https://picsum.photos/seed/civic/800/600" }],
  },
  {
    id: "4",
    brand: "Volkswagen",
    model: "Golf",
    version: "GTI",
    year: 2019,
    modelYear: 2020,
    mileage: 45000,
    price: 195000,
    fuelType: "Gasolina",
    transmission: "Automático",
    images: [{ url: "https://picsum.photos/seed/golf/800/600" }],
  },
]

export function FeaturedVehicles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}
