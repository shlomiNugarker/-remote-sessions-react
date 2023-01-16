import { useNavigate } from 'react-router-dom'

import loadingGif from '../assets/imgs/loading.gif'
import { authService } from '../services/authService'
import { IUser } from '../interfaces/IUser'

type Props = {
  codeBlocksIds: { _id: string; title: string }[] | null
  loggedUser: IUser | null
  loadCodeBlocksIds: () => Promise<void>
}

export default function Home({
  codeBlocksIds,
  loggedUser,
  loadCodeBlocksIds,
}: Props) {
  const navigate = useNavigate()
  if (!codeBlocksIds)
    return (
      <div className="home-page">
        <img className="loading-gif" src={loadingGif} alt="" />
      </div>
    )

  if (!codeBlocksIds.length)
    return <div className="home-page">No block codes yet... 🙂</div>

  const logout = () => {
    try {
      authService.logout()
      navigate('/sign-in')
    } catch (err) {
      console.log(err)
      alert("couldn't logout...")
    }
  }

  return (
    <section className="home-page">
      <div className="logout-btn">
        <p>Hello, {loggedUser?.fullName}</p>
        <button onClick={logout}>Logout</button>
      </div>

      <button onClick={() => navigate('/add-code-block')}>
        +Add Code block
      </button>
      <p>or</p>
      <h1>Choose code block:</h1>

      <div className="code-blocks">
        {codeBlocksIds.map((codeBlock) => (
          <button
            className="code-block-btn"
            key={codeBlock._id}
            onClick={() => navigate(`/${codeBlock._id}`)}
          >
            {codeBlock.title}
          </button>
        ))}
      </div>

      <button className="refresh-btn" onClick={loadCodeBlocksIds}>
        Refresh
      </button>
    </section>
  )
}
