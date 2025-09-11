export interface User {
  id: string | undefined
  version?: number | null
  uid: string
  username: string | null
  displayname: string | null
  photoURL: string | null
  email?: string | null
  birthDay?: string | null
  gender?: string | null
}
