'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const vehicleSchema = z.object({
  marca: z.string().min(1, 'Obrigatório'),
  modelo: z.string().min(1, 'Obrigatório'),
  versao: z.string().min(1, 'Obrigatório'),
  anoFabricacao: z.string().min(4, 'Obrigatório'),
  anoModelo: z.string().min(4, 'Obrigatório'),
  quilometragem: z.string().min(1, 'Obrigatório'),
  precoVenda: z.string().min(1, 'Obrigatório'),
  precoPromocional: z.string().optional(),
  combustivel: z.string().min(1, 'Obrigatório'),
  tipoCambio: z.string().min(1, 'Obrigatório'),
  placaFinal: z.string().length(1, 'Apenas o último dígito'),
  chassiVin: z.string().min(5, 'Obrigatório'),
  descricaoVendedor: z.string().optional(),
  flagDestaque: z.boolean().default(false),
  features: z.array(z.string()).default([]),
  images: z.array(z.object({
    url: z.string().url(),
    isPrincipal: z.boolean().default(false),
    order: z.number().default(0)
  })).min(1, 'Adicione pelo menos uma imagem'),
});

const commonFeatures = [
  'Ar Condicionado', 'Direção Hidráulica', 'Vidros Elétricos', 'Travas Elétricas',
  'Alarme', 'Airbag', 'Freios ABS', 'Rodas de Liga Leve', 'Bancos de Couro',
  'Central Multimídia', 'Câmera de Ré', 'Sensor de Estacionamento', 'Teto Solar'
];

export default function NewVehiclePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basics');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      marca: '',
      modelo: '',
      versao: '',
      anoFabricacao: '',
      anoModelo: '',
      quilometragem: '',
      precoVenda: '',
      combustivel: 'Flex',
      tipoCambio: 'Automático',
      placaFinal: '',
      chassiVin: '',
      descricaoVendedor: '',
      flagDestaque: false,
      features: [],
      images: [{ url: 'https://picsum.photos/seed/car1/800/600', isPrincipal: true, order: 0 }],
    },
  });

  async function onSubmit(values: z.infer<typeof vehicleSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          anoFabricacao: parseInt(values.anoFabricacao),
          anoModelo: parseInt(values.anoModelo),
          quilometragem: parseInt(values.quilometragem),
          precoVenda: parseFloat(values.precoVenda),
          precoPromocional: values.precoPromocional ? parseFloat(values.precoPromocional) : null,
        }),
      });

      if (response.ok) {
        router.push('/admin/estoque');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Cadastrar Novo Veículo</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="basics">Dados Básicos</TabsTrigger>
              <TabsTrigger value="specs">Atributos Físicos</TabsTrigger>
              <TabsTrigger value="features">Opcionais</TabsTrigger>
              <TabsTrigger value="media">Upload e Mídia</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Identificação e Valores</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="marca"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca</FormLabel>
                        <FormControl><Input placeholder="Ex: Toyota" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelo</FormLabel>
                        <FormControl><Input placeholder="Ex: Corolla" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="versao"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Versão</FormLabel>
                        <FormControl><Input placeholder="Ex: 2.0 XEi 16V Flex 4P Automático" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="precoVenda"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço de Venda (R$)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="precoPromocional"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço Promocional (Opcional)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2 pt-8">
                    <FormField
                      control={form.control}
                      name="flagDestaque"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Destacar no Site</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Button type="button" className="w-full" onClick={() => setActiveTab('specs')}>Próximo Passo</Button>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Especificações Técnicas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="anoFabricacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ano Fabricação</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="anoModelo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ano Modelo</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quilometragem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quilometragem</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="combustivel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Combustível</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Flex">Flex</SelectItem>
                            <SelectItem value="Gasolina">Gasolina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Elétrico">Elétrico</SelectItem>
                            <SelectItem value="Híbrido">Híbrido</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tipoCambio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Câmbio</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="Automático">Automático</SelectItem>
                            <SelectItem value="CVT">CVT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="placaFinal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final da Placa</FormLabel>
                        <FormControl><Input maxLength={1} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chassiVin"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Chassi / VIN</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setActiveTab('basics')}>Voltar</Button>
                <Button type="button" className="flex-1" onClick={() => setActiveTab('features')}>Próximo</Button>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Opcionais e Acessórios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {commonFeatures.map((feature) => (
                      <FormField
                        key={feature}
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(feature)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, feature])
                                    : field.onChange(field.value?.filter((value) => value !== feature));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{feature}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <div className="mt-8">
                    <FormField
                      control={form.control}
                      name="descricaoVendedor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição Adicional</FormLabel>
                          <FormControl><Textarea rows={5} placeholder="Descreva detalhes do veículo..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setActiveTab('specs')}>Voltar</Button>
                <Button type="button" className="flex-1" onClick={() => setActiveTab('media')}>Próximo</Button>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Galeria de Fotos</CardTitle>
                  <CardDescription>Adicione as URLs das fotos do veículo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {form.watch('images').map((_, index) => (
                    <div key={index} className="flex gap-4 items-end">
                      <FormField
                        control={form.control}
                        name={`images.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>URL da Imagem {index + 1}</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`images.${index}.isPrincipal`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0 pb-3">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={(v) => {
                                if (v) {
                                  const imgs = form.getValues('images').map((img, i) => ({
                                    ...img,
                                    isPrincipal: i === index
                                  }));
                                  form.setValue('images', imgs);
                                }
                              }} />
                            </FormControl>
                            <FormLabel className="text-xs">Principal</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => {
                    const current = form.getValues('images');
                    form.setValue('images', [...current, { url: '', isPrincipal: false, order: current.length }]);
                  }}>
                    Adicionar mais fotos
                  </Button>
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setActiveTab('features')}>Voltar</Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Finalizar Cadastro'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
