import { Socket } from 'socket.io-client'
import { Dispatch, FormEvent, SetStateAction } from 'react'

export interface IFormEvent extends FormEvent<HTMLFormElement> {
   target: EventTarget & {
      [key: number]: HTMLInputElement
   }
}

export interface ISocket extends Socket {
   auth: {
      myId: string
      roomName: string
      serverOffset: number
      anotherUserId: string
   }
}

export type Context = {
   credentials: User | null
   setCredentials: Dispatch<SetStateAction<User | null>>
   messages: Message[]
   setMessages: Dispatch<SetStateAction<Message[]>>
   isFetchingRoom: boolean
   setIsFetchingRoom: Dispatch<SetStateAction<boolean>>
}

export type User = {
   userId: string
   username: string
   thumbnail: string
   rooms: { roomName: string; anotherUser: string }[]
}

export type Message = {
   user: string
   content: string
   messageId: number
}

export type IMessagesResponse =
   | {
        messages: {
           messageId: number
           content: string
           user: string
        }[]
        username: string
        thumbnail: string | null
     }
   | string
