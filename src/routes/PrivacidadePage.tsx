import { SiteChrome } from '../components/layout/SiteChrome'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'
import { useSiteConfig } from '../config/useSiteConfig'

export function PrivacidadePage() {
  const { company } = useSiteConfig()

  return (
    <SiteChrome>
      <LegalLayout
        eyebrow="Política de Privacidade"
        title="Política de Privacidade"
        updatedAtLabel="Última atualização: outubro de 2026."
      >
        <LegalSection title="1. Quais dados coletamos">
          <p>
            Coletamos os dados que você nos fornece diretamente, como nome, e-mail, telefone/WhatsApp, CPF,
            data de nascimento, plano de interesse e preferências de horário — por exemplo, ao preencher o
            formulário de cadastro. Informações de saúde relevantes para a prática do pilates são coletadas
            separadamente, apenas quando necessário, com os devidos cuidados de segurança.
          </p>
        </LegalSection>

        <LegalSection title="2. Como usamos os seus dados">
          <ul className="list-disc pl-5">
            <li>Para viabilizar seu cadastro e a contratação do plano escolhido.</li>
            <li>Para organizar e confirmar suas sessões de pilates e/ou massoterapia.</li>
            <li>Para enviar comunicações operacionais (confirmações, avisos de agenda).</li>
            <li>
              Para enviar comunicações promocionais, apenas se você consentir expressamente no momento do
              cadastro.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Compartilhamento de dados">
          <p>
            Não vendemos seus dados pessoais. Podemos compartilhar informações com prestadores de serviço que
            nos ajudam a operar o estúdio (por exemplo, ferramentas de agendamento, pagamento ou comunicação),
            sempre limitado ao necessário para a prestação do serviço, e com autoridades públicas quando
            exigido por lei.
          </p>
        </LegalSection>

        <LegalSection title="4. Base legal (LGPD)">
          <p>
            Tratamos seus dados com base na execução de contrato (para viabilizar o plano contratado), no
            consentimento (para comunicações promocionais) e no legítimo interesse (para melhorar nossos
            serviços), conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
        </LegalSection>

        <LegalSection title="5. Seus direitos como titular dos dados">
          <ul className="list-disc pl-5">
            <li>Confirmar a existência de tratamento dos seus dados.</li>
            <li>Acessar, corrigir ou atualizar seus dados.</li>
            <li>Solicitar a exclusão ou anonimização de dados que não sejam mais necessários.</li>
            <li>Revogar, a qualquer momento, o consentimento para comunicações promocionais.</li>
            <li>Solicitar a portabilidade dos seus dados, nos termos da lei.</li>
          </ul>
        </LegalSection>

        <LegalSection title="6. Armazenamento e segurança">
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra acesso não
            autorizado, perda ou alteração indevida. Seus dados são mantidos apenas pelo tempo necessário para
            as finalidades descritas nesta política ou conforme exigido por lei.
          </p>
        </LegalSection>

        <LegalSection title="7. Cookies">
          <p>
            Este site pode utilizar cookies para lembrar suas preferências e entender como você navega pelo
            conteúdo. Você pode gerenciar ou desativar cookies diretamente nas configurações do seu navegador.
          </p>
        </LegalSection>

        <LegalSection title="8. Dados de menores de idade">
          <p>
            Caso o aluno seja menor de idade, o cadastro e o tratamento dos dados dependem do consentimento
            específico e destacado de um dos pais ou responsável legal.
          </p>
        </LegalSection>

        <LegalSection title="9. Alterações nesta política">
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. A versão vigente estará sempre
            disponível nesta página, com a data da última atualização indicada no topo.
          </p>
        </LegalSection>

        <LegalSection title="10. Contato e encarregado de dados">
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre o tratamento dos seus dados, entre em contato
            pelo e-mail{' '}
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
