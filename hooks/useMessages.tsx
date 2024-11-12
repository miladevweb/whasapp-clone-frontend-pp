import { socket } from '@/utils/socket'
import { IMessagesResponse, Message } from '@/types'
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'

export function useMessages(setMessages: Dispatch<SetStateAction<Message[]>>, messagesResponse: IMessagesResponse, messages: Message[], ref: RefObject<HTMLUListElement>) {
   /* Listen to the event server:message */
   useEffect(() => {
      function getMessages(options: { content: string; messageId: number; myUsername: string }) {
         socket.auth.serverOffset = options.messageId
         setMessages((prev) => [...prev, { content: options.content, user: options.myUsername, messageId: options.messageId }])
      }

      if (ref.current) {
         ref.current.scrollTop = ref.current.scrollHeight
         socket.on('server:message', getMessages)
         return () => {
            socket.off('server:message', getMessages)
         }
      }
   }, [messages])

   /* Set messages in state */
   useEffect(() => {
      if (typeof messagesResponse === 'string') return
      setMessages(messagesResponse.messages)
   }, [messagesResponse])
   return
}
