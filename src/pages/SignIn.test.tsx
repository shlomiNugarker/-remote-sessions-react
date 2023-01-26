import { render, screen } from '@testing-library/react'
import SignIn from './SignIn'
import { BrowserRouter as Router } from 'react-router-dom'

test('username & password input should be rendered', () => {
  render(
    <Router>
      <SignIn setLoggedUser={() => console.log()} />
    </Router>
  )
  const usernameInputEl = screen.getByPlaceholderText(/Enter your user name/i)
  expect(usernameInputEl).toBeInTheDocument()

  const passwordInputEl = screen.getByPlaceholderText(/Enter your password/i)
  expect(passwordInputEl).toBeInTheDocument()
})

test('SignIn button should be rendered', async () => {
  render(
    <Router>
      <SignIn setLoggedUser={() => console.log()} />
    </Router>
  )
  const buttonEl = await screen.findByText('Sign in')
  expect(buttonEl).toBeInTheDocument()
})

test('passport input should have type password ', () => {
  render(
    <Router>
      <SignIn setLoggedUser={() => console.log()} />
    </Router>
  )
  const password = screen.getByPlaceholderText(/Enter your password/i)
  expect(password).toHaveAttribute('type', 'password')
})

test('username input should be empty', () => {
  render(
    <Router>
      <SignIn setLoggedUser={() => console.log()} />
    </Router>
  )
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/Enter your user name/i)
  expect(usernameInputEl.value).toBe('')
})
