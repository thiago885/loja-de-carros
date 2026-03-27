import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { BrandFilter } from "@/components/home/brand-filter"
import { FeaturedVehicles } from "@/components/home/featured-vehicles"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative">
        <HeroCarousel />
      </section>

      {/* Brand Filter */}
      <section className="container">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Marcas em Destaque</h2>
          <BrandFilter />
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Veículos em Destaque</h2>
            <p className="text-muted-foreground">Confira as melhores ofertas selecionadas para você.</p>
          </div>
          <Link href="/estoque">
            <Button variant="ghost" className="gap-2">
              Ver estoque completo <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <FeaturedVehicles />
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Por que escolher a AutoElite?</h2>
            <p className="text-muted-foreground">
              Somos referência no mercado automotivo premium, oferecendo uma experiência 
              de compra segura, transparente e personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm border space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Procedência Garantida</h3>
              <p className="text-muted-foreground">
                Todos os nossos veículos passam por uma rigorosa perícia cautelar e 
                revisão técnica antes de entrarem no estoque.
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm border space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Aprovação Rápida</h3>
              <p className="text-muted-foreground">
                Parceria com as principais instituições financeiras para garantir 
                as melhores taxas e aprovação em minutos.
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm border space-y-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Atendimento VIP</h3>
              <p className="text-muted-foreground">
                Consultores especializados prontos para ajudar você a encontrar 
                o carro dos seus sonhos com total comodidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Quer vender seu carro?</h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl">
              Nós compramos seu veículo com a melhor avaliação do mercado e 
              pagamento à vista. Simples, rápido e seguro.
            </p>
          </div>
          <Link href="/venda">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Avaliar meu carro
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
