"use client"

import * as React from "react"
import { Calculator, Info } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface FinancingCalculatorProps {
  vehicle: any
}

export function FinancingCalculator({ vehicle }: FinancingCalculatorProps) {
  const [downPayment, setDownPayment] = React.useState(Number(vehicle.price) * 0.3)
  const [installments, setInstallments] = React.useState(48)
  const [interestRate, setInterestRate] = React.useState(1.49) // Monthly rate

  const amountToFinance = Number(vehicle.price) - downPayment
  const monthlyPayment = (amountToFinance * (interestRate / 100)) / (1 - Math.pow(1 + (interestRate / 100), -installments))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full text-lg h-14 gap-2">
          <Calculator className="h-5 w-5" />
          Simular Financiamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Simulador de Financiamento</DialogTitle>
          <DialogDescription>
            Simule as parcelas para o {vehicle.brand} {vehicle.model}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="downPayment">Valor de Entrada</Label>
              <span className="text-sm font-bold text-primary">{formatCurrency(downPayment)}</span>
            </div>
            <Slider
              min={0}
              max={Number(vehicle.price) * 0.9}
              step={1000}
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
            />
            <Input
              id="downPayment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="h-10"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Número de Parcelas</Label>
              <span className="text-sm font-bold text-primary">{installments}x</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48, 60].map((n) => (
                <Button
                  key={n}
                  variant={installments === n ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInstallments(n)}
                >
                  {n}x
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Valor Financiado</span>
              <span className="font-bold">{formatCurrency(amountToFinance)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Valor da Parcela</span>
              <span className="text-3xl font-extrabold text-primary">{formatCurrency(monthlyPayment)}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground leading-tight">
              <Info className="h-3 w-3 shrink-0" />
              <p>
                * Valores aproximados sujeitos a análise de crédito. Taxa de juros estimada em {interestRate}% a.m.
              </p>
            </div>
          </div>

          <Button className="w-full h-12 text-lg font-bold">Solicitar Análise de Crédito</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
