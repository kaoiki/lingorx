const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const APP_CODE = import.meta.env.VITE_APP_CODE || ''
const TOKEN_KEY = 'lingorx_token'

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

export async function api<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const authHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-App-Code': APP_CODE,
  }

  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { ...authHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })

  const json = await res.json()

  // Token invalid — 清除登录态并通知用户
  if (json.code === 401 || res.status === 401) {
    localStorage.removeItem('lingorx_token')
    localStorage.removeItem('lingorx_profile')
    window.dispatchEvent(new CustomEvent('auth:expired'))
    throw new Error('Session expired. Please sign in again.')
  }

  if (json.code !== 0) {
    throw new Error(json.message || 'API error')
  }

  return json.data as T
}
