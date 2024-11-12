'use client'
import { IFormEvent } from '@/types'
import { socket } from '@/utils/socket'
import styles from './index.module.css'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { useAppContext } from '@/context/socket-context'
import { getAnotherUserIdByRoomName, getRoomNameByUsersIds, getUsers } from '@/utils/actions'

export function Rooms({ roomName }: { roomName: string | null }) {
   const router = useRouter()
   const [users, setUsers] = useState<string | { userId: string; userUsername: string }[]>([])
   const { credentials, isFetchingRoom, setIsFetchingRoom } = useAppContext()

   useEffect(() => {
      async function joinToRoom() {
         if (roomName && credentials) {
            const response = await getAnotherUserIdByRoomName(roomName, credentials.userId)
            if (typeof response === 'string') return
            else {
               socket.emit('client:leave')
               socket.emit('client:join', {
                  roomName,
                  myId: credentials.userId,
                  anotherUserId: response.anotherUserId,
               })
            }
         }
      }
      if (!isFetchingRoom) 
      joinToRoom()
   }, [roomName, credentials])

   const handleRoom = async (anotherUserId: string) => {
      const response = await getRoomNameByUsersIds(credentials!.userId, anotherUserId)

      let options = {
         roomName: '',
         anotherUserId,
         myId: credentials?.userId!,
      }
      if (typeof response === 'string') options.roomName = window.crypto.randomUUID()
      else options.roomName = response.roomName

      socket.emit('client:leave')
      socket.emit('client:join', options)
      setIsFetchingRoom(true)
      router.push(`/?room=${options.roomName}`)
   }

   const handleSubmit = async (e: IFormEvent) => {
      e.preventDefault()
      const filter = e.target[0].value
      const response = await getUsers(filter)
      setUsers(response)
      e.target[0].value = ''
   }
   return (
      <div className={styles.container}>
         {/* Search */}
         <div>
            <form onSubmit={handleSubmit}>
               <input type="search" placeholder="Search for a user..." />
            </form>

            {typeof users === 'string' ? (
               <p className={styles.isError}>{users}</p>
            ) : (
               <ul>
                  {users.map(({ userId, userUsername }, i) => (
                     <Fragment key={i}>
                        {credentials?.username !== userUsername && (
                           <p className={styles.room} onClick={() => handleRoom(userId)}>
                              <span>{userUsername}</span>
                           </p>
                        )}
                     </Fragment>
                  ))}
               </ul>
            )}
         </div>

         {/* Chat */}
         <div className={styles.chatContainer}>
            <h3>Chats:</h3>

            {credentials?.rooms.map((room, i) => (
               <p
                  key={i}
                  onClick={() => {
                     setIsFetchingRoom(false)
                     router.push(`/?room=${room.roomName}`)
                  }}
               >
                  {room.anotherUser}
               </p>
            ))}
         </div>
      </div>
   )
}
