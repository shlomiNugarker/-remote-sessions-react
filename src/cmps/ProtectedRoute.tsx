import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { authService } from '../services/authService'

type Props = {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>
  path?: string
}

function ProtectedRoute({ children, path }: Props) {
  const loggedUser = authService.getLoggedUser()

  if (!loggedUser) return <Navigate to="/sign-in" replace />
  //
  else if (path === '/add-code-block' && !loggedUser.isMentor)
    return <Navigate to="/" replace />

  return children
}
export default ProtectedRoute
