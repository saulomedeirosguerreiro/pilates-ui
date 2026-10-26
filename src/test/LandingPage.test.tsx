import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LandingPage } from '../routes/LandingPage'

describe('LandingPage', () => {
  it('renderiza a landing page sem lançar erro', () => {
    render(<LandingPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sua melhor versão')
    expect(screen.getAllByText(/Garantir minha vaga|Quero garantir minha vaga/i).length).toBeGreaterThan(0)
  })
})
