export type Unit = string
export type IsoDate = string
export type IsoDuration = string
export type Id = string

export interface Event {
  date: IsoDate
}

export interface Note {
  note: string
}

export interface Name {
  name: string
  description: string
}
