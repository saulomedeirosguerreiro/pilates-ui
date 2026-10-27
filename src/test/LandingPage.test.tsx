import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LandingPage } from '../routes/LandingPage'

describe('LandingPage', () => {
  it('renderiza a landing page sem lançar erro', () => {
    render(<LandingPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName('Pilates Studio')
    expect(screen.getAllByText(/Começar Agora|Começar →/i).length).toBeGreaterThan(0)
  })
})
