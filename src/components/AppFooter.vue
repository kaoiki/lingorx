<template>
  <footer class="fixed bottom-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md py-lg px-gutter shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-md">
      <div class="flex items-center gap-md">
        <button
          class="flex items-center gap-xs bg-primary hover:bg-primary/90 text-on-primary font-bold px-md py-xs rounded-xl transition-all active:scale-95 shadow-sm cursor-pointer text-xs"
          @click="handleClick"
        >
          <span class="material-symbols-outlined text-[14px]">edit_note</span>
          Feedback
        </button>
        <p class="text-on-surface-variant text-xs">© 2026 LingoRx. All rights reserved.</p>
      </div>
      <div class="flex items-center gap-lg">
        <a
          class="text-on-surface-variant text-xs hover:text-primary transition-colors"
          href="#"
        >Privacy Policy</a>
        <a
          class="text-on-surface-variant text-xs hover:text-primary transition-colors"
          href="#"
        >Terms of Service</a>
        <a
          class="text-on-surface-variant text-xs hover:text-primary transition-colors"
          href="#"
        >Contact</a>
        <span class="text-on-surface-variant text-xs font-mono">v{{ version }}</span>
      </div>
    </div>

    <!-- Login Prompt Modal -->
    <Teleport to="body">
      <div
        v-if="showLoginPrompt"
        class="fixed inset-0 z-[300] flex items-center justify-center bg-black/30"
        @click.self="showLoginPrompt = false"
      >
        <div class="bg-white rounded-2xl shadow-xl p-xl mx-4 text-center" style="max-width: 400px;">
          <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[36px] text-primary">edit_note</span>
          </div>
          <h3 class="font-headline-md font-bold text-on-surface mb-xs">Sign in to submit feedback</h3>
          <p class="text-on-surface-variant text-sm mb-lg">Please sign in or create an account to send us your feedback.</p>
          <div class="flex flex-col gap-sm">
            <router-link
              to="/login"
              class="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-sm rounded-xl transition-all active:scale-95 shadow-sm text-center"
              @click="showLoginPrompt = false"
            >
              Sign In
            </router-link>
            <router-link
              to="/register"
              class="w-full border border-outline-variant hover:bg-surface-variant text-on-surface font-bold py-sm rounded-xl transition-all text-center"
              @click="showLoginPrompt = false"
            >
              Create Account
            </router-link>
            <button
              class="text-sm text-on-surface-variant hover:text-primary transition-colors mt-xs cursor-pointer"
              @click="showLoginPrompt = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { version } from '../../package.json'
import { useAuth } from '../composables/useAuth'

const { isLoggedIn } = useAuth()
const showLoginPrompt = ref(false)

const emit = defineEmits<{ openFeedback: [] }>()

function handleClick() {
  if (!isLoggedIn.value) {
    showLoginPrompt.value = true
    return
  }
  emit('openFeedback')
}
</script>
