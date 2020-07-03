import { Option } from 'lazy-space'

export interface StorageService {}

export class LocalStorageService implements StorageService {
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get<T>(key: string): Option<T> {
    return Option.of(localStorage.getItem(key)).map((a) => JSON.parse(a) as T)
  }
}
