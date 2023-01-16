import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { IUser } from '../interfaces/IUser'

function ProtectedRoute({
  children,
  loggedUser = null,
}: {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>
  loggedUser: IUser | null
}) {
  if (!loggedUser) {
    return <Navigate to="/sign-in" replace />
  }
  return children
}
export default ProtectedRoute
