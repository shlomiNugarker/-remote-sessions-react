import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { IUser } from '../interfaces/IUser'

type Props = {
  setLoggedUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function SignIn({ setLoggedUser }: Props) {
  const navigate = useNavigate()

  const [creds, setCreds] = useState({
    userName: '',
    password: '',
  })

  const handleChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const field = ev.target.name
    let value =
      ev.target.type === 'number' ? +ev.target.value || '' : ev.target.value
    setCreds((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const cleanFields = () => setCreds(() => ({ userName: '', password: '' }))

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    try {
      const loggedUser = await authService.login(creds)
      setLoggedUser(loggedUser)
      navigate('/')
    } catch (err) {
      console.log(err)
      alert("couldn't sign in...")
    } finally {
      cleanFields()
    }
  }

  return (
    <section className="sign-in">
      <h1>Sign-in</h1>
      <form onSubmit={submit}>
        <label htmlFor="userName">
          <input
            id="userName"
            placeholder="Enter your user name"
            type="text"
            onChange={handleChange}
            name="userName"
            value={creds.userName}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            placeholder="Enter your password"
            type="password"
            onChange={(ev) => handleChange(ev)}
            name="password"
            value={creds.password}
          />
        </label>
        <button type="submit">Sign in</button>
      </form>
      <br />
      <p>
        Don't have an account yet? <Link to="/sign-up">sign-up.</Link>
      </p>
    </section>
  )
}
