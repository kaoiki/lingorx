<template>
  <Teleport to="body">
    <div v-if="visible"
      class="fixed bottom-4 right-4 left-4 md:bottom-6 md:right-6 md:left-auto z-50 w-auto md:min-w-[360px] md:max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-outline-variant/50 p-lg animate-fade-in">
      <div class="flex items-start gap-md">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[20px] text-primary">cookie</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-on-surface mb-xs">🍪 Just a heads up</p>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-md">
            We use essential cookies to keep you signed in and make the app work. No tracking, no ads.
            <a href="/privacy" target="_blank" class="text-primary hover:underline ml-1">Learn more</a>
          </p>
          <div class="flex items-center gap-sm">
            <button class="bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold px-md py-sm rounded-xl transition-all cursor-pointer" @click="accept">Got it</button>
            <button class="text-xs text-on-surface-variant hover:text-primary font-bold transition-colors cursor-pointer" @click="accept">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const COOKIE_KEY = 'lingorx_cookie_consent'
const visible = ref(false)

function accept() {
  localStorage.setItem(COOKIE_KEY, '1')
  visible.value = false
}

onMounted(() => {
  if (!localStorage.getItem(COOKIE_KEY)) {
    // 延迟一下弹出，不让用户一进来就被打断
    setTimeout(() => { visible.value = true }, 1000)
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>
