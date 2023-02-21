import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { IUser } from '../interfaces/IUser'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

type Props = {
  setLoggedUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function SignUp({ setLoggedUser }: Props) {
  const navigate = useNavigate()

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),

    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),

    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 4 chars minimum'),

    isMentor: Yup.boolean().required('Required'),
  })

  return (
    <div className="sign-up">
      <h1>Signup</h1>
      <Formik
        initialValues={{
          userName: '',
          fullName: '',
          password: '',
          isMentor: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const loggedUser = await authService.signup(values)
            setLoggedUser(loggedUser)

            navigate('/')
          } catch (err) {
            alert("couldn't sign in...")
          }
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Field name="userName" placeholder="Enter your full name" />
            {errors.userName && touched.userName ? (
              <div>{errors.userName}</div>
            ) : null}
            <Field name="fullName" placeholder="Enter your user name" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <div className="btns-container">
              <p
                onClick={() => setFieldValue('isMentor', true)}
                className={values.isMentor ? 'chosen' : ''}
              >
                I'm a mentor
              </p>
              <p
                onClick={() => setFieldValue('isMentor', false)}
                className={!values.isMentor ? 'chosen' : ''}
              >
                I'm a student
              </p>
            </div>
            {errors.isMentor && touched.isMentor ? (
              <div>{errors.isMentor}</div>
            ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <br />
      <p>
        Already have an account? <Link to="/sign-in">sign-in.</Link>
      </p>
    </div>
  )
}
