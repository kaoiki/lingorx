<template>
  <div class="w-full px-4" style="max-width: 500px;">
    <!-- Logo -->
    <div class="text-center mb-lg">
      <router-link to="/" class="inline-flex items-center gap-sm font-headline-lg font-extrabold text-primary text-[24px]">
        <span class="material-symbols-outlined text-primary" style="font-size: 28px; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 28;">auto_stories</span>
        LingoRx
      </router-link>
    </div>

    <div class="glass-card p-xl rounded-2xl">
      <div class="flex items-center mb-lg">
        <router-link to="/" class="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-sm">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          Back
        </router-link>
      </div>
      <h1 class="font-headline-md font-bold text-on-surface text-center mb-lg">Sign In</h1>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-md">
        <div>
          <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-lg"
              required
            />
            <button
              v-if="email"
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 text-on-surface-variant hover:text-on-surface transition-colors"
              @click="email = ''"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        <div>
          <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="············"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-xl"
              required
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                v-if="password"
                type="button"
                class="flex items-center justify-center w-5 h-5 text-on-surface-variant hover:text-on-surface transition-colors"
                @click="password = ''"
              >
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
              <button
                type="button"
                class="flex items-center justify-center w-5 h-5 text-on-surface-variant hover:text-on-surface transition-colors"
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined text-[16px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-sm rounded-xl transition-all active:scale-95 shadow-md shadow-primary/20 cursor-pointer"
        >
          Sign In
        </button>
      </form>

      <div class="flex justify-between mt-md">
        <router-link to="/register" class="text-label-sm text-primary hover:underline">
          Create account
        </router-link>
        <router-link to="/forgot-password" class="text-label-sm text-on-surface-variant hover:text-primary transition-colors">
          Forgot password?
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { api } from '../lib/api'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleLogin() {
  const data = await api<{ token: string }>('/auth/login', {
    method: 'POST',
    body: { email: email.value, password: password.value },
  })
  login(data.token)
  router.push('/')
}
</script>
