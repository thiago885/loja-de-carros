"use client"

import * as React from "react"
import { useQueryState, parseAsInteger, parseAsString } from "nuqs"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

export function InventoryFilters() {
  const [brand, setBrand] = useQueryState("brand", parseAsString.withDefault(""))
  const [model, setModel] = useQueryState("model", parseAsString.withDefault(""))
  const [minPrice, setMinPrice] = useQueryState("minPrice", parseAsInteger.withDefault(0))
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger.withDefault(1000000))
  const [minYear, setMinYear] = useQueryState("minYear", parseAsInteger.withDefault(2000))

  const handleClearFilters = () => {
    setBrand("")
    setModel("")
    setMinPrice(0)
    setMaxPrice(1000000)
    setMinYear(2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="brand">Marca</Label>
        <Input
          id="brand"
          placeholder="Ex: Toyota"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Modelo</Label>
        <Input
          id="model"
          placeholder="Ex: Corolla"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="h-9"
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Preço Máximo</Label>
          <span className="text-xs font-medium text-primary">
            Até R$ {maxPrice.toLocaleString('pt-BR')}
          </span>
        </div>
        <Slider
          min={0}
          max={1000000}
          step={10000}
          value={[maxPrice]}
          onValueChange={(value) => setMaxPrice(value[0])}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Ano Mínimo</Label>
          <span className="text-xs font-medium text-primary">
            A partir de {minYear}
          </span>
        </div>
        <Slider
          min={2000}
          max={2025}
          step={1}
          value={[minYear]}
          onValueChange={(value) => setMinYear(value[0])}
        />
      </div>

      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={handleClearFilters}
      >
        <X className="h-4 w-4" />
        Limpar Filtros
      </Button>
    </div>
  )
}
