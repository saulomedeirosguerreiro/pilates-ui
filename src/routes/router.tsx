import { createBrowserRouter } from 'react-router'
import { LandingPage } from './LandingPage'

// Rotas futuras: '/admin' (Fase 5, painel administrativo autenticado)
// e '/checkout/retorno' (Fase 3, tela de "aguardando confirmação" pós-Stripe —
// nunca a fonte de verdade do pagamento, que vem sempre do webhook).
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
])
