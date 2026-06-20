import { ref } from 'vue'

const TOKEN_KEY = 'lingorx_token'
const PROFILE_KEY = 'lingorx_profile'

export interface UserProfile {
  user_id: string
  email: string
  nickname: string
  avatar: string
}

const isLoggedIn = ref(false)
const user = ref<UserProfile | null>(null)

// 初始化时检查 localStorage
const stored = localStorage.getItem(TOKEN_KEY)
const storedProfile = localStorage.getItem(PROFILE_KEY)
if (stored) {
  isLoggedIn.value = true
  if (storedProfile) {
    try {
      user.value = JSON.parse(storedProfile)
    } catch {}
  }
}

function login(token: string, profile: UserProfile) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  isLoggedIn.value = true
  user.value = profile
}

function updateProfile(partial: Partial<UserProfile>) {
  if (user.value) {
    user.value = { ...user.value, ...partial }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(user.value))
  }
}

function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(PROFILE_KEY)
  isLoggedIn.value = false
  user.value = null
}

export function useAuth() {
  return { isLoggedIn, user, login, updateProfile, logout }
}
