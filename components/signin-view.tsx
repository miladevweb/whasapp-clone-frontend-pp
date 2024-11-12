'use client'
import { SignInGitHub } from '@/utils/auth-methods'

export function SignInView({ signInContainer }: { signInContainer: string }) {
   return (
      <div className={signInContainer}>
         <button onClick={() => SignInGitHub()}>Sign In</button>
      </div>
   )
}
