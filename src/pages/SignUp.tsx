import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { IUser } from '../interfaces/IUser'

type Props = {
  setLoggedUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function SignUp({ setLoggedUser }: Props) {
  const navigate = useNavigate()

  const [creds, setCreds] = useState({
    userName: '',
    password: '',
    fullName: '',
    isMentor: false,
  })

  const handleChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const field = ev.target.name
    let value =
      ev.target.type === 'number' ? +ev.target.value || '' : ev.target.value
    setCreds((prevCred) => ({ ...prevCred, [field]: value }))
  }

  const cleanFields = () =>
    setCreds(() => ({
      userName: '',
      password: '',
      fullName: '',
      isMentor: false,
    }))

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    try {
      const loggedUser = await authService.signup(creds)
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
    <section className="sign-up">
      <h1>Sign-up</h1>
      <form onSubmit={submit}>
        <label htmlFor="userName">
          <input
            id="fullName"
            placeholder="Enter your full name"
            type="text"
            onChange={handleChange}
            name="fullName"
            value={creds.fullName}
          />
        </label>

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

        <div className="btns-container">
          <p
            onClick={() => setCreds((prev) => ({ ...prev, isMentor: true }))}
            className={creds.isMentor ? 'chosen' : ''}
          >
            I'm a mentor
          </p>
          <p
            onClick={() => setCreds((prev) => ({ ...prev, isMentor: false }))}
            className={!creds.isMentor ? 'chosen' : ''}
          >
            I'm a student
          </p>
        </div>

        <button type="submit">Sign up</button>
      </form>
      <br />
      <p>
        Already have an account? <Link to="/sign-in">sign-in.</Link>
      </p>
    </section>
  )
}
