import { Ingredient } from '../ingredients'
import { IsoDuration, Note, Unit } from '../common'

export type Step = Partial<Note> & (Addition | Measurement | Wait | Observation | Manipulation)

export function empty(kind: Step['kind']): Step {
  switch (kind) {
    case 'addition':
      return { kind, ingredients: [] }
    case 'measurement':
      return { kind, value: '20', unit: 'celcius' }
    case 'wait':
      return { kind, duration: '20M' }
    default:
      return { kind }
  }
}

export interface Addition {
  kind: 'addition'
  ingredients: Ingredient[]
}
export interface Measurement {
  kind: 'measurement'
  value: string
  unit: Unit
}
export type Wait = { kind: 'wait' } & ({ min: IsoDuration; max: IsoDuration } | { duration: IsoDuration })

export interface Observation {
  kind: 'observation'
}
export interface Manipulation {
  kind: 'manipulation'
}
