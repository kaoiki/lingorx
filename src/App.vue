<template>
  <UApp>
    <router-view />
    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="toast"
        class="fixed top-4 left-1/2 -translate-x-1/2 z-[200] px-lg py-sm rounded-xl shadow-lg text-sm font-bold transition-all"
        :class="toast.type === 'success' ? 'bg-primary text-on-primary' : 'bg-error text-on-error'"
      >
        {{ toast.message }}
      </div>
    </Transition>

    <!-- Auth Expired Modal -->
    <Teleport to="body">
      <div v-if="showAuthExpired" class="fixed inset-0 z-[300] flex items-center justify-center bg-black/30 px-4">
        <div class="w-full bg-white rounded-2xl shadow-xl p-xl text-center" style="max-width: 400px;">
          <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-error/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[36px] text-error">logout</span>
          </div>
          <h3 class="font-headline-md font-bold text-on-surface mb-xs">Session expired</h3>
          <p class="text-on-surface-variant text-sm mb-lg">Your session has expired. Please sign in again to continue.</p>
          <div class="flex flex-col gap-sm">
            <router-link to="/login" class="block w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-sm rounded-xl transition-all text-center" @click="showAuthExpired = false">Sign In</router-link>
            <router-link to="/register" class="block w-full text-primary font-bold py-sm rounded-xl transition-all text-center hover:bg-primary/5" @click="showAuthExpired = false">Create Account</router-link>
            <button class="text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" @click="dismissAuthExpired">Cancel</button>
          </div>
        </div>
      </div>
    </Teleport>
  </UApp>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from './composables/useToast'

const { toast } = useToast()
const showAuthExpired = ref(false)

function onAuthExpired() {
  if (sessionStorage.getItem('auth_expired_dismissed')) return
  showAuthExpired.value = true
  // 强制登出
  localStorage.removeItem('lingorx_token')
  localStorage.removeItem('lingorx_profile')
}

function dismissAuthExpired() {
  showAuthExpired.value = false
  sessionStorage.setItem('auth_expired_dismissed', '1')
}

onMounted(() => {
  window.addEventListener('auth:expired', onAuthExpired)
})

onUnmounted(() => {
  window.removeEventListener('auth:expired', onAuthExpired)
})
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-12px);
}
</style>