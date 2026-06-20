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
      <h1 class="font-headline-md font-bold text-on-surface text-center mb-lg">Create Account</h1>

      <!-- Step 1: Send Code -->
      <form v-if="step === 1" @submit.prevent="sendCode" class="flex flex-col gap-md">
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

        <button
          type="submit"
          :disabled="!email || sending"
          class="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold py-sm rounded-xl transition-all active:scale-95 shadow-md shadow-primary/20 cursor-pointer disabled:cursor-not-allowed"
        >
          {{ sending ? 'Sending…' : 'Send Code' }}
        </button>
      </form>

      <!-- Step 2: Verify Code + Set Password -->
      <form v-else @submit.prevent="handleRegister" class="flex flex-col gap-md">
        <div>
          <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Email</label>
          <input
            :value="email"
            type="email"
            class="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface-variant text-on-surface-variant text-sm cursor-not-allowed"
            disabled
          />
        </div>

        <div>
          <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Code</label>
          <div class="relative">
            <input
              v-model="code"
              type="text"
              placeholder="6-digit code"
              maxlength="6"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-lg tracking-widest text-center font-bold"
              required
            />
          </div>
        </div>

        <div>
          <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="At least 6 characters"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-xl"
              required
              minlength="6"
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
          :disabled="registering"
          class="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold py-sm rounded-xl transition-all active:scale-95 shadow-md shadow-primary/20 cursor-pointer disabled:cursor-not-allowed"
        >
          {{ registering ? 'Creating…' : 'Create Account' }}
        </button>

        <button
          type="button"
          class="w-full text-on-surface-variant text-sm hover:text-primary transition-colors cursor-pointer"
          @click="step = 1"
        >
          ← Change email
        </button>
      </form>

      <div class="text-center mt-md">
        <router-link to="/login" class="text-label-sm text-primary hover:underline">
          Already have an account? Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../lib/api'
import { useToast } from '../composables/useToast'

const { show: showToast } = useToast()

const step = ref(1)
const email = ref('')
const code = ref('')
const password = ref('')
const showPassword = ref(false)
const sending = ref(false)
const registering = ref(false)

async function sendCode() {
  sending.value = true
  try {
    await api('/api/auth/register/send-code', {
      method: 'POST',
      body: { email: email.value },
    })
    showToast('Code sent to your email')
    step.value = 2
  } catch (e: any) {
    showToast(e.message || 'Failed to send code', 'error')
  } finally {
    sending.value = false
  }
}

async function handleRegister() {
  registering.value = true
  try {
    await api('/api/auth/register', {
      method: 'POST',
      body: { email: email.value, password: password.value, code: code.value },
    })
    showToast('Account created! Please sign in.')
    // redirect to login after brief delay
    setTimeout(() => window.location.href = '/login', 1500)
  } catch (e: any) {
    showToast(e.message || 'Registration failed', 'error')
  } finally {
    registering.value = false
  }
}
</script>
