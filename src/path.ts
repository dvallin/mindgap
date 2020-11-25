import { route as preactRoute } from 'preact-router'

export function makePath(path: string, params?: { [key: string]: string }) {
  let paramsString = ''
  if (params) {
    const p = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => p.set(k, v))
    paramsString = `?${p.toString()}`
  }
  return `${process.env.PUBLIC_PATH || ''}${path}${paramsString}`
}

export function route(path: string, params?: { [key: string]: string }): void {
  preactRoute(makePath(path, params))
}
