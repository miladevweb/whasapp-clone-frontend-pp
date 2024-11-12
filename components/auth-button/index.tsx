'use client'
import Link from 'next/link'
import { Logo } from '../svg'
import { useEffect } from 'react'
import { Session } from 'next-auth'
import styles from './index.module.css'
import { createUser } from '@/utils/actions'
import { SignOutGitHub } from '@/utils/auth-methods'
import { useAppContext } from '@/context/socket-context'
import Image from 'next/image'

type Props = {
   session: Session
   myInfo:
      | string
      | {
           rooms: {
              roomName: string
              anotherUser: string
           }[]
           userId: string
        }
}
export function AuthButton({ session, myInfo }: Props) {
   const { setCredentials, setIsFetchingRoom } = useAppContext()

   useEffect(() => {
      async function setUserInContext() {
         if (typeof myInfo === 'string') {
            const createResponse = await createUser(session.user!.name!, session.user!.image!)
            setCredentials({
               rooms: [],
               username: session.user!.name!,
               thumbnail: session.user!.image!,
               userId: typeof createResponse !== 'string' ? createResponse.myId : '',
            })
         } else {
            setCredentials({
               rooms: myInfo.rooms,
               userId: myInfo.userId,
               username: session.user!.name!,
               thumbnail: session.user!.image!,
            })
         }
      }

      setUserInContext()
   }, [])
   return (
      <div className={styles.container}>
         <Link href={'/?room='} onClick={() => setIsFetchingRoom(false)} aria-label="home page">
            <Logo />
         </Link>

         <div>
            <button
               onClick={() => {
                  SignOutGitHub()
                  setCredentials(null)
               }}
            >
               Sign out
            </button>
            <Image src={session.user?.image!} alt={session.user?.name!} width={30} height={30} />
         </div>
      </div>
   )
}
