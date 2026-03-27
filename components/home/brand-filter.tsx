"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const brands = [
  { name: "Toyota", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/toyota.png" },
  { name: "Honda", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/honda.png" },
  { name: "Ford", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/ford.png" },
  { name: "Chevrolet", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/chevrolet.png" },
  { name: "Volkswagen", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/volkswagen.png" },
  { name: "BMW", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/bmw.png" },
  { name: "Mercedes", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/mercedes.png" },
  { name: "Audi", logo: "https://www.car-logos.org/wp-content/uploads/2011/09/audi.png" },
]

export function BrandFilter() {
  const router = useRouter()

  const handleBrandClick = (brandName: string) => {
    router.push(`/estoque?brand=${brandName.toLowerCase()}`)
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 py-4">
      {brands.map((brand) => (
        <button
          key={brand.name}
          onClick={() => handleBrandClick(brand.name)}
          className="flex flex-col items-center justify-center p-4 rounded-xl border bg-background hover:border-primary hover:shadow-md transition-all group"
        >
          <div className="relative h-12 w-12 mb-2 grayscale group-hover:grayscale-0 transition-all">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">
            {brand.name}
          </span>
        </button>
      ))}
    </div>
  )
}
