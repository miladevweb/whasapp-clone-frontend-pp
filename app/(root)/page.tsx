import { auth } from '@/utils/auth'
import styles from './page.module.css'
import { Rooms } from '@/components/rooms'
import { getUserInfo } from '@/utils/actions'
import { SignInView } from '@/components/signin-view'
import { AuthButton } from '@/components/auth-button'
import { MessagesServer } from '@/components/messages/server'

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
   const session = await auth()
   if (!session) return <SignInView signInContainer={styles.signInContainer} />
   const myInfo = await getUserInfo(session.user?.name!)
   return (
      <main>
         <AuthButton myInfo={myInfo} session={session} />
         <section className={styles.container}>
            <Rooms roomName={searchParams.room ? searchParams.room : null} />
            <MessagesServer roomName={searchParams.room ? searchParams.room : null} myUsername={session.user?.name!} />
         </section>
      </main>
   )
}
