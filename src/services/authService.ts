import { httpService } from './httpService'

export const authService = {
  login,
  logout,
  signup,
  getLoggedUser,
}

const STORAGE_KEY_LOGGED_USER = 'logged_user'

async function login(userCred: { userName: string; password: string }) {
  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}

async function signup(userCred: {
  userName: string
  password: string
  fullName: string
}) {
  const user = await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGED_USER)
  return await httpService.post('auth/logout')
}

function _saveLocalUser(user: any) {
  sessionStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(user))
  return user
}

function getLoggedUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_USER) || 'null')
}
