"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const mockBanners = [
  {
    id: "1",
    title: "Encontre o Carro dos Seus Sonhos",
    subtitle: "As melhores ofertas em veículos premium e seminovos com garantia.",
    imageUrl: "https://picsum.photos/seed/car1/1920/1080",
    linkUrl: "/estoque",
  },
  {
    id: "2",
    title: "Financiamento Facilitado",
    subtitle: "Taxas exclusivas e aprovação rápida com os principais bancos.",
    imageUrl: "https://picsum.photos/seed/car2/1920/1080",
    linkUrl: "/financiamento",
  },
]

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {mockBanners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
                <div className="max-w-3xl space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tight">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90">
                    {banner.subtitle}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href={banner.linkUrl || "/estoque"}>
                      <Button size="lg" className="px-8">
                        Ver Estoque
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  )
}
