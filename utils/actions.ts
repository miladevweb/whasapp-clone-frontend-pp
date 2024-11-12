'use server'
export type GetUsersResponse = {
   userId: string
   userUsername: string
}[]

export async function getUsers(query: string): Promise<GetUsersResponse | string> {
   try {
      const response = await fetch(`${process.env.BACKEND_URL!}/chat?searchedUser=${query}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
   } catch (error) {
      if (error instanceof Error) return error.message
      return 'Something went wrong'
   }
}

export async function getRoomNameByUsersIds(myId: string, anotherUserId: string): Promise<{ roomName: string } | string> {
   try {
      const response = await fetch(`${process.env.BACKEND_URL!}/room?myId=${myId}&anotherUserId=${anotherUserId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
   } catch (error) {
      if (error instanceof Error) return error.message
      return 'Something went wrong'
   }
}

export async function getUserInfo(username: string): Promise<
   | {
        rooms: {
           roomName: string
           anotherUser: string
        }[]
        userId: string
     }
   | string
> {
   try {
      const response = await fetch(`${process.env.BACKEND_URL!}/credentials/${username}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
   } catch (error) {
      if (error instanceof Error) return error.message
      return 'Something went wrong'
   }
}

export async function createUser(username: string, thumbnail: string): Promise<{ myId: string } | string> {
   try {
      const response = await fetch(`${process.env.BACKEND_URL!}/chat`, {
         method: 'POST',
         body: JSON.stringify({ username, thumbnail }),
         headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('A user already exists with this id')
      return await response.json()
   } catch (error) {
      if (error instanceof Error) return error.message
      return 'Something went wrong'
   }
}

export async function getMessages(roomName: string, myUsername: string): Promise<
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
> {
   try {
      const response = await fetch(`${process.env.BACKEND_URL!}/messages/${roomName}/${myUsername}`)
      if (!response.ok) throw new Error('Failed to fetch messages')
      return await response.json()
   } catch (error) {
      if (error instanceof Error) return error.message
      return 'Something went wrong'
   }
}

export async function getAnotherUserIdByRoomName(roomName: string, myId: string): Promise<{ anotherUserId: string } | string> {
   try {
      const response = await fetch(`${process.env.BACKEND_URL!}/roomInfo?roomName=${roomName}&myId=${myId}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      return data
   } catch (error) {
      if (error instanceof Error) return error.message
      return 'Something went wrong'
   }
}
