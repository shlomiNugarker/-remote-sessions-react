import { httpService } from './httpService'

export const userService = {
  getUserById,
  saveUser,
}

async function getUserById(userId: string): Promise<any> {
  const user = await httpService.get('user/' + userId)
  return user
}

async function saveUser(userToSave: any): Promise<any> {
  const savedUser = userToSave._id
    ? await httpService.put(`user/` + userToSave._id, userToSave)
    : await httpService.post(`user`, userToSave)

  return savedUser
}
