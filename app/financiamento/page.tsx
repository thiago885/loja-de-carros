'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, User, Home, Briefcase, Car } from 'lucide-react';

const financingSchema = z.object({
  // Step 1: Personal
  nomeCompleto: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  telefoneWhatsapp: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
  // Step 2: Residential
  cep: z.string().length(8, 'CEP deve ter 8 dígitos'),
  endereco: z.string().min(5, 'Endereço obrigatório'),
  numero: z.string().min(1, 'Obrigatório'),
  // Step 3: Professional
  profissao: z.string().min(3, 'Obrigatório'),
  rendaMensal: z.string().min(1, 'Obrigatório'),
  // Step 4: Vehicle
  vehicleId: z.string().optional(),
});

type FinancingValues = z.infer<typeof financingSchema>;

export default function FinancingPage() {
  const [step, setStep] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FinancingValues>({
    resolver: zodResolver(financingSchema),
    defaultValues: {
      nomeCompleto: '',
      email: '',
      telefoneWhatsapp: '',
      cpf: '',
      cep: '',
      endereco: '',
      numero: '',
      profissao: '',
      rendaMensal: '',
    },
  });

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          form.setValue('endereco', `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP', error);
      }
    }
  };

  async function onSubmit(values: FinancingValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          tipoContato: 'FINANCIAMENTO',
          rendaMensal: parseFloat(values.rendaMensal),
          dadosComplementares: {
            endereco: values.endereco,
            numero: values.numero,
            profissao: values.profissao,
            cep: values.cep
          }
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Proposta Enviada com Sucesso!</h1>
        <p className="text-muted-foreground max-w-md">
          Recebemos sua ficha de financiamento. Nossa equipe de análise de crédito entrará em contato em breve via WhatsApp ou E-mail.
        </p>
        <Button className="mt-8" asChild>
          <a href="/">Voltar para Home</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Ficha de Financiamento</h1>
          <p className="text-muted-foreground">Preencha os dados abaixo para uma pré-análise de crédito instantânea.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={step} onValueChange={setStep} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="personal" disabled={step !== 'personal' && !form.getValues('nomeCompleto')}>
                  <User className="mr-2 h-4 w-4 hidden sm:inline" />
                  Pessoal
                </TabsTrigger>
                <TabsTrigger value="residential" disabled={step === 'personal'}>
                  <Home className="mr-2 h-4 w-4 hidden sm:inline" />
                  Residencial
                </TabsTrigger>
                <TabsTrigger value="professional" disabled={step === 'personal' || step === 'residential'}>
                  <Briefcase className="mr-2 h-4 w-4 hidden sm:inline" />
                  Profissional
                </TabsTrigger>
                <TabsTrigger value="vehicle" disabled={step !== 'vehicle'}>
                  <Car className="mr-2 h-4 w-4 hidden sm:inline" />
                  Veículo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Pessoais</CardTitle>
                    <CardDescription>Precisamos te identificar para a consulta de crédito.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nomeCompleto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl><Input placeholder="seu@email.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="telefoneWhatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp</FormLabel>
                            <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF (Apenas números)</FormLabel>
                          <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" className="w-full" onClick={() => setStep('residential')}>
                      Próximo Passo
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="residential" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Residenciais</CardTitle>
                    <CardDescription>Onde você mora atualmente?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl><Input placeholder="00000-000" {...field} onBlur={handleCepBlur} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="endereco"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Endereço</FormLabel>
                              <FormControl><Input placeholder="Rua, Bairro, Cidade" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="numero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número / Complemento</FormLabel>
                          <FormControl><Input placeholder="Ex: 123, Apto 4" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setStep('personal')}>Voltar</Button>
                      <Button type="button" className="flex-1" onClick={() => setStep('professional')}>Próximo</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Profissionais</CardTitle>
                    <CardDescription>Qual sua ocupação e renda mensal?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="profissao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profissão</FormLabel>
                          <FormControl><Input placeholder="Sua profissão" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rendaMensal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Renda Mensal Bruta (R$)</FormLabel>
                          <FormControl><Input type="number" placeholder="Ex: 5000" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setStep('residential')}>Voltar</Button>
                      <Button type="button" className="flex-1" onClick={() => setStep('vehicle')}>Próximo</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vehicle" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Finalizar Proposta</CardTitle>
                    <CardDescription>Confirme seus dados e envie para análise.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                      <p><strong>Nome:</strong> {form.getValues('nomeCompleto')}</p>
                      <p><strong>CPF:</strong> {form.getValues('cpf')}</p>
                      <p><strong>Renda:</strong> R$ {form.getValues('rendaMensal')}</p>
                    </div>
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setStep('professional')}>Voltar</Button>
                      <Button type="submit" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Proposta'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
}
