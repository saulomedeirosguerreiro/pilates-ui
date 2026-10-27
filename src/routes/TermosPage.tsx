import { SiteChrome } from '../components/layout/SiteChrome'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'
import { useSiteConfig } from '../config/useSiteConfig'

export function TermosPage() {
  const { company } = useSiteConfig()

  return (
    <SiteChrome>
      <LegalLayout
        eyebrow="Termos de Uso"
        title="Termos de Uso"
        updatedAtLabel="Última atualização: outubro de 2026."
      >
        <LegalSection title="1. Aceitação dos termos">
          <p>
            Ao acessar o site e os serviços de {company.name} (&quot;nós&quot;, &quot;estúdio&quot;), você
            concorda com estes Termos de Uso. Caso não concorde com alguma condição aqui descrita, pedimos que
            não utilize o site ou contrate nossos serviços.
          </p>
        </LegalSection>

        <LegalSection title="2. Descrição dos serviços">
          <p>
            O {company.name} oferece aulas de pilates (em grupo e individuais) e, em alguns planos, sessões de
            massoterapia, mediante assinatura mensal. As modalidades, horários e disponibilidade podem variar
            conforme a unidade e a agenda dos instrutores.
          </p>
        </LegalSection>

        <LegalSection title="3. Cadastro e conta do usuário">
          <ul className="list-disc pl-5">
            <li>
              Você é responsável por fornecer informações verdadeiras, completas e atualizadas no cadastro.
            </li>
            <li>Você é responsável por manter a confidencialidade da sua senha de acesso.</li>
            <li>
              Reservamo-nos o direito de suspender ou encerrar contas com informações falsas ou uso indevido
              da plataforma.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Planos, pagamentos e cancelamento">
          <p>
            Os planos, valores e condições vigentes são os exibidos na página de Planos no momento da
            contratação. A cobrança é recorrente (mensal), salvo quando informado de forma diferente. O
            cancelamento pode ser solicitado a qualquer momento, com efeito a partir do próximo ciclo de
            cobrança, ressalvadas eventuais condições específicas de promoções ou pacotes com fidelidade, que
            serão sempre informadas antes da contratação.
          </p>
        </LegalSection>

        <LegalSection title="5. Responsabilidades do usuário">
          <ul className="list-disc pl-5">
            <li>Informar condições de saúde relevantes antes de iniciar as atividades físicas.</li>
            <li>Seguir as orientações dos instrutores durante as sessões.</li>
            <li>Respeitar os horários agendados e as regras de convivência do estúdio.</li>
          </ul>
        </LegalSection>

        <LegalSection title="6. Propriedade intelectual">
          <p>
            Todo o conteúdo do site (textos, imagens, identidade visual e marca {company.name}) é protegido
            por direitos autorais e não pode ser reproduzido sem autorização prévia.
          </p>
        </LegalSection>

        <LegalSection title="7. Limitação de responsabilidade">
          <p>
            A prática de exercícios físicos envolve riscos inerentes. O {company.name} não se responsabiliza
            por lesões decorrentes de condições de saúde não informadas previamente ou pelo descumprimento das
            orientações dos instrutores.
          </p>
        </LegalSection>

        <LegalSection title="8. Alterações nestes termos">
          <p>
            Podemos atualizar estes Termos de Uso periodicamente. A versão vigente estará sempre disponível
            nesta página, com a data da última atualização indicada no topo.
          </p>
        </LegalSection>

        <LegalSection title="9. Legislação e foro aplicável">
          <p>
            Estes termos são regidos pela legislação brasileira. Eventuais disputas serão resolvidas no foro
            da comarca do domicílio do {company.name}, salvo disposição legal em contrário.
          </p>
        </LegalSection>

        <LegalSection title="10. Contato">
          <p>
            Dúvidas sobre estes Termos de Uso podem ser enviadas para{' '}
            <span className="text-brown-deep font-medium">
              {company.email ?? 'contato a divulgar em breve'}
            </span>
            .
          </p>
        </LegalSection>
      </LegalLayout>
    </SiteChrome>
  )
}
