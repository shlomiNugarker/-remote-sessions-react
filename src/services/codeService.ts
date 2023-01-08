import { httpService } from './httpService'

export const codeService = {
  getById,
  save,
  remove,
}

async function getById(id: string) {
  return await httpService.get(`code/${id}`)
}

async function save(code: any): Promise<any> {
  return code._id
    ? await httpService.put(`code/${code._id}`, code)
    : await httpService.post('code/', code)
}

async function remove(id: string) {
  return await httpService.delete(`code/${id}`)
}
