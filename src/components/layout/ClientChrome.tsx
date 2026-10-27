import { Outlet } from 'react-router'
import { ClientHeader } from './ClientHeader'
import { Footer } from './Footer'

export function ClientChrome() {
  return (
    <>
      <ClientHeader />
      <main className="bg-off-white min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
