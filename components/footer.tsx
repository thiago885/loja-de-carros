import Link from "next/link"
import { Car, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">AutoElite</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Sua melhor escolha em veículos premium e seminovos de procedência. 
              Qualidade, transparência e o melhor atendimento do mercado.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/estoque" className="text-muted-foreground hover:text-primary">Nosso Estoque</Link></li>
              <li><Link href="/financiamento" className="text-muted-foreground hover:text-primary">Financiamento</Link></li>
              <li><Link href="/venda" className="text-muted-foreground hover:text-primary">Venda seu Carro</Link></li>
              <li><Link href="/sobre" className="text-muted-foreground hover:text-primary">Sobre Nós</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                (11) 4002-8922
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                contato@autoelite.com.br
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Av. Europa, 1234 - São Paulo, SP
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Segunda a Sexta: 09h às 19h</li>
              <li>Sábados: 09h às 17h</li>
              <li>Domingos e Feriados: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AutoElite Veículos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
