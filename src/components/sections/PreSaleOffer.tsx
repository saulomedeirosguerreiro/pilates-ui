import { useId, useState } from 'react'
import { useSiteConfig } from '../../config/useSiteConfig'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Modal } from '../ui/Modal'
import { SectionHeading } from '../ui/SectionHeading'
import { WaitlistForm } from './WaitlistForm'

export function PreSaleOffer() {
  const { campaign, links } = useSiteConfig()
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const modalTitleId = useId()

  const seatsAvailable = Math.max(campaign.seatLimit - campaign.seatsTaken, 0)
  const isFull = campaign.status === 'closed' || seatsAvailable <= 0

  return (
    <section id="pre-venda" aria-labelledby="presale-heading" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="presale-heading"
          eyebrow="Pré-venda"
          title="Garanta sua vaga com preço especial"
          align="center"
        />

        <div className="rounded-editorial border-brown-medium/20 bg-beige-light mx-auto flex w-full max-w-2xl flex-col gap-8 border p-8 sm:p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-brown-deep font-serif text-5xl">
              R$ {campaign.pricePerMonthBRL}
              <span className="text-brown-warm/70 font-sans text-lg">/mês</span>
            </p>
            <p className="text-brown-warm/80 font-sans text-sm">
              Preço garantido por {campaign.priceLockMonths} meses. Cobrança mensal recorrente — o valor de R${' '}
              {campaign.pricePerMonthBRL} é pago mês a mês, nunca antecipado em um único pagamento de 12
              mensalidades.
            </p>
          </div>

          <ul className="text-brown-warm/90 flex flex-col gap-2 font-sans text-sm">
            <li>• Limite inicial de {campaign.seatLimit} clientes pagantes.</li>
            <li>• Lista de espera gratuita, sem cartão, caso as vagas se esgotem.</li>
            <li>
              • Antes da confirmação do pagamento você verá o valor cobrado, a periodicidade e as regras de
              cancelamento e reembolso.
            </li>
          </ul>

          {!isFull ? (
            <Button variant="primary" className="w-full" onClick={() => setIsCheckoutModalOpen(true)}>
              Quero garantir minha vaga
            </Button>
          ) : (
            <div className="rounded-editorial bg-off-white flex flex-col gap-4 p-6">
              <p className="text-brown-deep font-serif text-lg">As vagas da pré-venda foram preenchidas.</p>
              <p className="text-brown-warm/80 font-sans text-sm">
                Entre na nossa lista de espera para receber informações sobre novas oportunidades no Pilates
                Studio.
              </p>
              <WaitlistForm />
            </div>
          )}

          <p className="text-brown-warm/60 text-center font-sans text-xs">
            Ao contratar, você concorda com os{' '}
            {links.terms ? (
              <a href={links.terms} className="underline">
                termos de contratação
              </a>
            ) : (
              'termos de contratação (a publicar)'
            )}{' '}
            e a{' '}
            {links.privacyPolicy ? (
              <a href={links.privacyPolicy} className="underline">
                política de privacidade
              </a>
            ) : (
              'política de privacidade (a publicar)'
            )}
            .
          </p>
        </div>
      </Container>

      <Modal open={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} titleId={modalTitleId}>
        <h3 id={modalTitleId} className="text-brown-deep font-serif text-xl">
          Checkout em breve
        </h3>
        <p className="text-brown-warm/80 mt-3 font-sans text-sm">
          O pagamento online ainda está sendo preparado. Em breve você poderá concluir sua assinatura mensal
          de R$ {campaign.pricePerMonthBRL} diretamente por aqui, com todas as condições comerciais
          apresentadas antes da confirmação.
        </p>
        <Button variant="primary" className="mt-6 w-full" onClick={() => setIsCheckoutModalOpen(false)}>
          Entendi
        </Button>
      </Modal>
    </section>
  )
}
