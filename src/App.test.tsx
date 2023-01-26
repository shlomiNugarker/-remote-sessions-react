import { render, screen } from '@testing-library/react'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitFor } from '@testing-library/react'

const server = setupServer(
  rest.get('http://localhost:3030/api/codeBlock', (req, res, ctx) => {
    return res(
      ctx.json({
        code: 'code',
        _id: 'dfdaf',
        createdBy: '3346346fgq35',
        title: 'title',
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('gets the data', async () => {
  render(
    <Router>
      <App />
    </Router>
  )

  // const out = await screen.findByRole('contentinfo')

  // expect(out).toHaveTextContent('Name is Jack')
})
