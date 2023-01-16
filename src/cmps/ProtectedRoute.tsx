import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { authService } from '../services/authService'

function ProtectedRoute({
  children,
}: {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>
}) {
  const loggedUser = authService.getLoggedUser()
  if (!loggedUser) {
    return <Navigate to="/sign-in" replace />
  }
  return children
}
export default ProtectedRoute
