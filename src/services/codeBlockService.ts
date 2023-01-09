import { ICodeBlock } from '../interfaces/ICodeBlock'
import { httpService } from './httpService'
import { socketService } from './socketService'

export const codeBlockService = {
  getById,
  save,
  remove,
  query,
}

async function query(): Promise<ICodeBlock[]> {
  return await httpService.get(`codeBlock`)
}

async function getById(id: string): Promise<ICodeBlock> {
  return await httpService.get(`codeBlock/${id}`)
}

async function save(codeBlock: ICodeBlock): Promise<ICodeBlock> {
  const savedCodeBlock = codeBlock._id
    ? await httpService.put(`codeBlock/${codeBlock._id}`, codeBlock)
    : await httpService.post('codeBlock/', codeBlock)

  socketService.emit('code-block-saved', savedCodeBlock)

  return savedCodeBlock
}

async function remove(id: string): Promise<ICodeBlock> {
  return await httpService.delete(`codeBlock/${id}`)
}
