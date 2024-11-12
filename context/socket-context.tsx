'use client'
import { Context, ISocket, Message, User } from '@/types'
import { createContext, useContext, useState } from 'react'

const SocketContext = createContext<Context | null>(null)

export default function SocketProvider({ children }: { children: React.ReactNode }) {
   // const [socket, setSocket] = useState<ISocket>()
   const [isFetchingRoom, setIsFetchingRoom] = useState(false)

   // useEffect(() => {
   //    async function handleSocket() {
   //       const socketClient = (await import('@/utils/socket')).socket
   //       setSocket(socketClient)
   //    }
   //    handleSocket()
   // }, [])
   const [messages, setMessages] = useState<Message[]>([])
   const [credentials, setCredentials] = useState<User | null>(null)

   return <SocketContext.Provider value={{ messages, setMessages, credentials, setCredentials, isFetchingRoom, setIsFetchingRoom }}>{children}</SocketContext.Provider>
}

export function useAppContext() {
   const context = useContext(SocketContext)
   if (!context) throw new Error('useSocket must be used within a SocketProvider')
   return context
}
