import { ref } from 'vue'

const TOKEN_KEY = 'lingorx_token'
const PROFILE_KEY = 'lingorx_profile'

export interface UserProfile {
  user_id: string
  email: string
  nickname: string
  avatar: string
}

// Vite HMR 安全：把状态挂在 import.meta.hot.data 上
function getState() {
  if (import.meta.hot?.data && import.meta.hot.data.__auth) {
    return import.meta.hot.data.__auth as ReturnType<typeof createState>
  }

  const state = createState()
  if (import.meta.hot) {
    import.meta.hot.data.__auth = state
  }
  return state
}

function createState() {
  const isLoggedIn = ref(false)
  const user = ref<UserProfile | null>(null)

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

  return { isLoggedIn, user }
}

export function useAuth() {
  const { isLoggedIn, user } = getState()

  function login(token: string, profile: UserProfile) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    isLoggedIn.value = true
    user.value = profile
    sessionStorage.removeItem('auth_expired_dismissed')
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
    window.location.reload()
  }

  return { isLoggedIn, user, login, updateProfile, logout }
}
