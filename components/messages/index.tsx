'use client'
import { Form } from '../form/index'
import styles from './index.module.css'
import { Fragment, useRef } from 'react'
import { IMessagesResponse } from '@/types'
import { useMessages } from '@/hooks/useMessages'
import { useAppContext } from '@/context/socket-context'
import Image from 'next/image'

type Props = { messagesResponse: IMessagesResponse }
export function Messages({ messagesResponse }: Props) {
   const ref = useRef<HTMLUListElement>(null)
   const { credentials, messages, setMessages } = useAppContext()

   useMessages(setMessages, messagesResponse, messages, ref)

   return (
      <Fragment>
         {typeof messagesResponse !== 'string' ? (
            <div className={styles.container}>
               <div>
                  <Image
                     src={messagesResponse.thumbnail ?? 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp'}
                     alt={messagesResponse.username}
                     width={25}
                     height={25}
                  />
                  <span>{messagesResponse.username}</span>
               </div>
               <ul ref={ref}>
                  {messages.map((msg, i) => (
                     <Fragment key={i}>
                        {credentials?.username === msg.user ? (
                           <li className={styles.myMessages}>
                              <p>{msg.content}</p>
                           </li>
                        ) : (
                           <li className={styles.otherMessages}>
                              <p>{msg.content}</p>
                           </li>
                        )}
                     </Fragment>
                  ))}
               </ul>

               <Form credentials={credentials} setMessages={setMessages} />
            </div>
         ) : (
            <div className={styles.noConversations}>
               <p>{messagesResponse}</p>
            </div>
         )}
      </Fragment>
   )
}
