import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()

  return (
    <section className="sign-in">
      <h1>Sign-in</h1>
      <form>
        <label htmlFor="userName">
          <input id="userName" placeholder="Enter your user name" type="text" />
        </label>
        <label htmlFor="password">
          <input id="password" placeholder="Enter your password" type="text" />
        </label>
      </form>
    </section>
  )
}
