import { ref } from 'vue'

const TOKEN_KEY = 'lingorx_token'
const isLoggedIn = ref(false)

// 初始化时检查 localStorage 是否有 token
const stored = localStorage.getItem(TOKEN_KEY)
if (stored) {
  isLoggedIn.value = true
}

function login(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
  isLoggedIn.value = true
}

function logout() {
  localStorage.removeItem(TOKEN_KEY)
  isLoggedIn.value = false
}

export function useAuth() {
  return { isLoggedIn, login, logout }
}
