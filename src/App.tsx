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
import AddCodeBlockPage from './pages/AddCodeBlockPage'
import { socketService } from './services/socketService'

export default function App() {
  const [loggedUser, setLoggedUser] = useState<null | IUser>(null)
  const [connectedSockets, setConnectedSockets] = useState<null | string[]>(
    null
  )
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
    const loggedUser = authService.getLoggedUser()
    setLoggedUser(loggedUser)

    loadCodeBlocksIds()
  }, [])

  useEffect(() => {
    socketService.on(
      'update-connected-sockets',
      (connectedSockets: string[]) => {
        setConnectedSockets(connectedSockets)
      }
    )

    return () => {
      socketService.off('update-connected-sockets')
    }
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
          path="/add-code-block"
          element={
            <ProtectedRoute path="/add-code-block">
              <AddCodeBlockPage loadCodeBlocksIds={loadCodeBlocksIds} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <CodeBlockPage loggedUser={loggedUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute path="/">
              <HomePage
                codeBlocksIds={codeBlocksIds}
                loggedUser={loggedUser}
                loadCodeBlocksIds={loadCodeBlocksIds}
                setLoggedUser={setLoggedUser}
                connectedSockets={connectedSockets}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  )
}
