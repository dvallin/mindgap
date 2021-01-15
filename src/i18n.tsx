import { h, createContext, RenderableProps } from 'preact'
import { useContext } from 'preact/hooks'

export interface Translations {
  search: string
  done: string
  active: string
}
export type locale = 'en' | 'de' | 'tlh'
export const translations: { [key in locale]: Translations } = {
  en: {
    search: 'search',
    done: 'done',
    active: 'active',
  },
  de: {
    search: 'suchen',
    done: 'fertig',
    active: 'aktiv',
  },
  tlh: {
    search: 'nej',
    done: 'pItlh',
    active: 'ghob',
  },
}

export const I18N = createContext<Translations>(translations['en'])

export interface ProviderProps {
  locale: locale
}
export function Provider<T>(props: RenderableProps<T> & ProviderProps) {
  return <I18N.Provider value={translations[props.locale]}>{props.children}</I18N.Provider>
}

export function useI18N(): Translations {
  return useContext(I18N)
}
