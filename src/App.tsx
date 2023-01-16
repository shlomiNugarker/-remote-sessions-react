import './assets/scss/global.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CodeBlockPage from './pages/CodeBlockPage'

import { codeBlockService } from './services/codeBlockService'
import { useEffect, useState } from 'react'
import SignIn from './pages/SignIn'
import ProtectedRoute from './cmps/ProtectedRoute'
import { authService } from './services/authService'
import { IUser } from './interfaces/IUser'
import SignUp from './pages/SignUp'

export default function App() {
  const [loggedUser, setLoggedUser] = useState<null | IUser>(null)
  const [codeBlocksIds, setCodeBlocksIds] = useState<
    { _id: string; title: string }[] | null
  >(null)

  const loadCodeBlocksIds = async () => {
    try {
      const codeBlocksIds = await codeBlockService.queryIds()
      setCodeBlocksIds(codeBlocksIds)
    } catch (err) {
      alert("couldn't load code blocks...")
      setCodeBlocksIds([])
    }
  }

  useEffect(() => {
    loadCodeBlocksIds()
  }, [])
  useEffect(() => {
    const loggedUser = authService.getLoggedUser()
    setLoggedUser(loggedUser)
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route
          path="/sign-up"
          element={<SignUp setLoggedUser={setLoggedUser} />}
        />

        <Route
          path="/sign-in"
          element={<SignIn setLoggedUser={setLoggedUser} />}
        />

        <Route
          path="/:id"
          element={
            <ProtectedRoute loggedUser={loggedUser}>
              <CodeBlockPage loggedUser={loggedUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute loggedUser={loggedUser}>
              <HomePage codeBlocksIds={codeBlocksIds} loggedUser={loggedUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
