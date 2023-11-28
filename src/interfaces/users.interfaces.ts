export type IRole = 'ADMIN' | 'COLLE'

export interface IRequestUser {
  id: string
  role: IRole
}
