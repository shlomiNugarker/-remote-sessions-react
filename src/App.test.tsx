import { render, screen } from '@testing-library/react'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
test('renders the App cmp', () => {
  render(
    <Router>
      <App />
    </Router>
  )
})

describe('Testing sum', () => {
  function sum(a: number, b: number) {
    return a + b
  }

  it('should equal 4', () => {
    expect(sum(2, 2)).toBe(4)
  })

  test('also should equal 4', () => {
    expect(sum(2, 2)).toBe(4)
  })
})
