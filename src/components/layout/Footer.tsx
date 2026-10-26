import { useSiteConfig } from '../../config/useSiteConfig'
import { Container } from '../ui/Container'

export function Footer() {
  const { company, links } = useSiteConfig()

  return (
    <footer className="bg-brown-deep text-off-white py-12">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-serif text-lg">{company.name}</p>
          <p className="text-off-white/70 mt-2 font-sans text-sm">
            {company.address ?? 'Endereço a divulgar em breve.'}
          </p>
          {company.email && <p className="text-off-white/70 font-sans text-sm">{company.email}</p>}
        </div>

        <nav aria-label="Links institucionais" className="flex flex-col gap-2 font-sans text-sm">
          {links.privacyPolicy ? (
            <a href={links.privacyPolicy} className="text-off-white/80 hover:text-off-white">
              Política de privacidade
            </a>
          ) : (
            <span className="text-off-white/50">Política de privacidade — em breve</span>
          )}
          {links.terms ? (
            <a href={links.terms} className="text-off-white/80 hover:text-off-white">
              Termos de contratação
            </a>
          ) : (
            <span className="text-off-white/50">Termos de contratação — em breve</span>
          )}
        </nav>
      </Container>
    </footer>
  )
}
