import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { IUser } from '../interfaces/IUser'

import { useFormik } from 'formik'

type Props = {
  setLoggedUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function SignIn({ setLoggedUser }: Props) {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const loggedUser = await authService.login(values)
        setLoggedUser(loggedUser)
        navigate('/')
      } catch (err) {
        alert("couldn't sign in...")
      }
    },
  })

  return (
    <section className="sign-in">
      <h1>Sign-in</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">
          <input
            id="userName"
            placeholder="Enter your user name"
            type="text"
            onChange={formik.handleChange}
            name="userName"
            value={formik.values.userName}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            placeholder="Enter your password"
            type="password"
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
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
