<template>
  <div class="p-gutter max-w-2xl mx-auto px-4 md:px-gutter">
    <h1 class="font-headline-md text-headline-md text-on-surface mb-lg">Settings</h1>

    <div class="flex flex-col gap-lg">
      <!-- Profile -->
      <section class="glass-card p-lg rounded-2xl">
        <h2 class="font-headline-md font-bold text-on-surface mb-md">Profile</h2>

        <div class="flex items-center gap-md mb-md">
          <div class="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary shrink-0">
            <span class="material-symbols-outlined text-[28px]">account_circle</span>
          </div>
          <div class="min-w-0">
            <p class="font-bold text-on-surface truncate">{{ profile.nickname || 'User' }}</p>
            <p class="text-on-surface-variant text-sm truncate">{{ profile.email }}</p>
          </div>
        </div>

        <div class="flex items-center gap-md">
          <input
            v-model="nickname"
            type="text"
            placeholder="Nickname"
            class="flex-1 min-w-0 px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          <button
            :disabled="!nickname || nickname === profile.nickname || updating"
            class="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold px-lg py-sm rounded-xl transition-all active:scale-95 shadow-sm cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
            @click="updateNickname"
          >
            {{ updating ? 'Saving…' : 'Save' }}
          </button>
        </div>

        <div class="mt-md">
          <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Native Language</label>
          <select
            v-model="nativeLang"
            class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            @change="updateNativeLang"
          >
            <option value="">— Select —</option>
            <option value="cn">中文</option>
            <option value="tw">中文（繁體）</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
            <option value="th">ไทย</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </div>
      </section>

      <!-- Security -->
      <section class="glass-card p-lg rounded-2xl">
        <h2 class="font-headline-md font-bold text-on-surface mb-md">Security</h2>

        <form @submit.prevent="changePassword" class="flex flex-col gap-md">
          <div>
            <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Current Password</label>
            <input
              v-model="currentPassword"
              :type="showCurrent ? 'text' : 'password'"
              placeholder="············"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              required
            />
          </div>
          <div>
            <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">New Password (8+ chars)</label>
            <input
              v-model="newPassword"
              :type="showNew ? 'text' : 'password'"
              placeholder="············"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              required
              minlength="8"
            />
          </div>
          <button
            type="submit"
            :disabled="!currentPassword || !newPassword || newPassword.length < 8 || changing"
            class="self-start bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold px-lg py-sm rounded-xl transition-all active:scale-95 shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            {{ changing ? 'Changing…' : 'Change Password' }}
          </button>
        </form>
      </section>

      <!-- Bind Google -->
      <section class="glass-card p-lg rounded-2xl">
        <h2 class="font-headline-md font-bold text-on-surface mb-md">Account Binding</h2>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-md">
            <div class="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" class="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-on-surface text-sm">Google</p>
              <p class="text-on-surface-variant text-xs">Not bound</p>
            </div>
          </div>
          <button
            class="bg-white border border-outline-variant hover:bg-surface-variant text-on-surface font-bold px-lg py-sm rounded-xl transition-all cursor-pointer text-sm"
            @click="showComingSoon = true"
          >
            Bind
          </button>
        </div>
      </section>

      <!-- Danger Zone -->
      <section class="glass-card p-lg rounded-2xl border-error/20">
        <h2 class="font-headline-md font-bold text-error mb-md">Danger Zone</h2>
        <p class="text-on-surface-variant text-sm mb-md">
          Once you delete your account, it will be deactivated and you won't be able to sign in again.
        </p>
        <div class="flex items-center gap-md">
          <input
            v-model="deletePassword"
            type="password"
            placeholder="Confirm password"
            class="flex-1 min-w-0 px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-error focus:ring-1 focus:ring-error transition-colors"
          />
          <button
            :disabled="!deletePassword || deleting"
            class="bg-error hover:bg-error/90 disabled:bg-error/50 text-on-error font-bold px-lg py-sm rounded-xl transition-all active:scale-95 shadow-sm cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
            @click="deleteAccount"
          >
            {{ deleting ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </section>
    </div>

    <!-- Coming Soon Modal -->
    <Teleport to="body">
      <div
        v-if="showComingSoon"
        class="fixed inset-0 z-[300] flex items-center justify-center bg-black/30"
        @click.self="showComingSoon = false"
      >
        <div class="bg-white rounded-2xl shadow-xl p-xl mx-4 text-center" style="max-width: 480px;">
          <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-secondary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[36px] text-secondary">psychology</span>
          </div>
          <h3 class="font-headline-md font-bold text-on-surface mb-xs">Coming Soon</h3>
          <p class="text-on-surface-variant text-sm mb-lg">Google account binding will be available in a future update.</p>
          <button
            class="bg-primary hover:bg-primary/90 text-on-primary font-bold px-lg py-sm rounded-xl transition-all cursor-pointer"
            @click="showComingSoon = false"
          >
            Got it
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../lib/api'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { user, updateProfile, logout } = useAuth()
const { show: showToast } = useToast()

// Profile
const profile = ref({ nickname: user.value?.nickname || '', email: user.value?.email || '' })
const nickname = ref(user.value?.nickname || '')
const nativeLang = ref('')
const updating = ref(false)
const updatingLang = ref(false)

// Password
const currentPassword = ref('')
const newPassword = ref('')
const showCurrent = ref(false)
const showNew = ref(false)
const changing = ref(false)

// Delete
const deletePassword = ref('')
const deleting = ref(false)

// Modal
const showComingSoon = ref(false)

onMounted(async () => {
  try {
    const data = await api<{ nickname: string; native_language?: string }>('/api/profile')
    if (data.nickname) {
      profile.value.nickname = data.nickname
      nickname.value = data.nickname
    }
    if (data.native_language) {
      nativeLang.value = data.native_language
    }
  } catch {
    // silently use cached
  }
})

async function updateNickname() {
  updating.value = true
  try {
    const data = await api<{ nickname: string }>('/api/profile', {
      method: 'PUT',
      body: { nickname: nickname.value },
    })
    profile.value.nickname = data.nickname
    updateProfile({ nickname: data.nickname })
    showToast('Nickname updated')
  } catch (e: any) {
    showToast(e.message || 'Failed to update', 'error')
  } finally {
    updating.value = false
  }
}

async function updateNativeLang() {
  updatingLang.value = true
  try {
    await api('/api/profile', {
      method: 'PUT',
      body: { native_language: nativeLang.value },
    })
    showToast('Native language updated')
  } catch (e: any) {
    showToast(e.message || 'Failed to update', 'error')
  } finally {
    updatingLang.value = false
  }
}

async function changePassword() {
  changing.value = true
  try {
    await api('/api/auth/password/change', {
      method: 'PUT',
      body: { current_password: currentPassword.value, new_password: newPassword.value },
    })
    showToast('Password changed successfully')
    currentPassword.value = ''
    newPassword.value = ''
  } catch (e: any) {
    showToast(e.message || 'Failed to change password', 'error')
  } finally {
    changing.value = false
  }
}

async function deleteAccount() {
  deleting.value = true
  try {
    await api('/api/account', {
      method: 'DELETE',
      body: { password: deletePassword.value },
    })
    showToast('Account has been deactivated')
    logout()
    router.push('/')
  } catch (e: any) {
    showToast(e.message || 'Failed to delete account', 'error')
  } finally {
    deleting.value = false
  }
}
</script>
