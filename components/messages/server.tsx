import { Messages } from '.'
import { getMessages } from '@/utils/actions'

type Props = { roomName: string | null, myUsername: string }
export async function MessagesServer({ roomName, myUsername }: Props) {
   if (!roomName) return <Messages messagesResponse="Escoge a uno de tus contactos para iniciar una conversación!!!" />
   const response = await getMessages(roomName, myUsername)
   return <Messages messagesResponse={response} />
}
