import { ISocket } from '@/types'
import { io } from 'socket.io-client'

export const socket = io('ws://localhost:8000', {
   auth: {
      myId: '',
      roomName: '',
      serverOffset: 0,
   },
}) as ISocket
