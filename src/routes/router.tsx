import { createBrowserRouter } from 'react-router'
import { RequireAuth } from '../auth/RequireAuth'
import { ClientChrome } from '../components/layout/ClientChrome'
import { CadastroPage } from './CadastroPage'
import { ClientAccountPage } from './client/ClientAccountPage'
import { ClientHomePage } from './client/ClientHomePage'
import { ClientPlanPage } from './client/ClientPlanPage'
import { ClientSchedulePage } from './client/ClientSchedulePage'
import { ClientVideosPage } from './client/ClientVideosPage'
import { LandingPage } from './LandingPage'
import { LoginPage } from './LoginPage'
import { NotFoundPage } from './NotFoundPage'
import { PreLancamentoPage } from './PreLancamentoPage'
import { PrivacidadePage } from './PrivacidadePage'
import { TermosPage } from './TermosPage'

// Rotas futuras: '/admin' (Fase 5, painel administrativo autenticado)
// e '/checkout/retorno' (Fase 3, tela de "aguardando confirmação" pós-Stripe —
// nunca a fonte de verdade do pagamento, que vem sempre do webhook).
const devRoutes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/cadastro',
    element: <CadastroPage />,
  },
  {
    path: '/entrar',
    element: <LoginPage />,
  },
  {
    path: '/termos',
    element: <TermosPage />,
  },
  {
    path: '/privacidade',
    element: <PrivacidadePage />,
  },
  {
    path: '/pre-lancamento',
    element: <PreLancamentoPage />,
  },
  {
    path: '/area-do-cliente',
    element: (
      <RequireAuth>
        <ClientChrome />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <ClientHomePage /> },
      { path: 'agendamento', element: <ClientSchedulePage /> },
      { path: 'videos', element: <ClientVideosPage /> },
      { path: 'plano', element: <ClientPlanPage /> },
      { path: 'conta', element: <ClientAccountPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

// Em produção (qualquer `vite build`, incluindo deploys de preview), só o
// pré-lançamento fica acessível. Termos e Privacidade continuam no ar porque
// o formulário de cadastro linka para eles nos aceites de uso e privacidade.
const prodRoutes = [
  {
    path: '/',
    element: <PreLancamentoPage />,
  },
  {
    path: '/termos',
    element: <TermosPage />,
  },
  {
    path: '/privacidade',
    element: <PrivacidadePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export const router = createBrowserRouter(import.meta.env.PROD ? prodRoutes : devRoutes)
