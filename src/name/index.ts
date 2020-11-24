export interface Name {
  name: string
  description: string
}

export const name = (): Name => ({ name: '', description: '' })
