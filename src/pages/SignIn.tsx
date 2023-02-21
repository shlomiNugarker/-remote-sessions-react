import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { IUser } from '../interfaces/IUser'

import { useFormik } from 'formik'
import * as Yup from 'yup'

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
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('UserName is required'),

      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password is too short - should be 4 chars minimum'),
    }),
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
        <span>{formik.touched.userName && formik.errors.userName}</span>
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
        <span>{formik.touched.password && formik.errors.password}</span>
        <button type="submit">Sign in</button>
      </form>
      <br />
      <p>
        Don't have an account yet? <Link to="/sign-up">sign-up.</Link>
      </p>
    </section>
  )
}
