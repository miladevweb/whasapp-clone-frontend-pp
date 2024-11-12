'use server'
import { signIn, signOut } from './auth'

export async function SignInGitHub() {
   await signIn('google', { redirectTo: '/', redirect: true })
}

export async function SignOutGitHub() {
   await signOut({ redirect: true, redirectTo: '/' })
}
