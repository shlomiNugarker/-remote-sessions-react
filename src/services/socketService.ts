import { DefaultEventsMap } from '@socket.io/component-emitter'
import io, { Socket } from 'socket.io-client'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

export let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null

socketService.setup()

function createSocketService() {
  const socketService = {
    async setup() {
      socket = io(baseUrl)
    },
    on(eventName: string, cb: any) {
      socket && socket.on(eventName, cb)
    },
    off(eventName: string, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName: string, data: any) {
      socket && socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}
