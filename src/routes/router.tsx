import { createBrowserRouter } from 'react-router'
import { CadastroPage } from './CadastroPage'
import { LandingPage } from './LandingPage'
import { PrivacidadePage } from './PrivacidadePage'
import { TermosPage } from './TermosPage'

// Rotas futuras: '/admin' (Fase 5, painel administrativo autenticado)
// e '/checkout/retorno' (Fase 3, tela de "aguardando confirmação" pós-Stripe —
// nunca a fonte de verdade do pagamento, que vem sempre do webhook).
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/cadastro',
    element: <CadastroPage />,
  },
  {
    path: '/termos',
    element: <TermosPage />,
  },
  {
    path: '/privacidade',
    element: <PrivacidadePage />,
  },
])
