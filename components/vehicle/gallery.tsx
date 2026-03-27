"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface VehicleGalleryProps {
  images: any[]
}

export function VehicleGallery({ images }: VehicleGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted">
                <Image
                  src={image.url}
                  alt={`Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  referrerPolicy="no-referrer"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
              current === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
