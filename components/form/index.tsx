import { Send } from '../svg'
import styles from './index.module.css'
import { socket } from '@/utils/socket'
import { SetStateAction, Dispatch } from 'react'
import { IFormEvent, Message, User } from '@/types'

type Props = {
   credentials: User | null
   setMessages: Dispatch<SetStateAction<Message[]>>
}

export function Form({ credentials, setMessages }: Props) {
   const handleSubmit = (e: IFormEvent) => {
      e.preventDefault()

      const message = e.target[0].value
      const options = {
         content: message,
         myId: credentials?.userId,
         myUsername: credentials?.username,
      }
      socket.auth.serverOffset += 1

      if (message.length > 0) {
         socket.emit('client:message', options)
         setMessages((prev) => [
            ...prev,
            {
               content: message,
               user: credentials!.username,
               messageId: socket.auth.serverOffset,
            },
         ])
         e.target[0].value = ''
      }
   }
   return (
      <form className={styles.container} autoComplete="off" onSubmit={handleSubmit}>
         <input type="text" placeholder="Send a Message" autoFocus={true} />
         <button>
            <Send />
         </button>
      </form>
   )
}
