<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[70] bg-black/30 flex items-center justify-center px-4" @click.self="dismiss">
      <div class="w-full bg-white rounded-2xl shadow-xl p-xl text-center animate-fade-in-up" style="max-width: 440px;">
        <div class="w-14 h-14 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[28px] text-primary">psychology</span>
        </div>
        <p class="text-sm text-on-surface leading-relaxed font-medium italic">"{{ message }}"</p>
        <p class="text-xs text-on-surface-variant mt-md">— LingoRx</p>
        <button class="mt-lg bg-primary hover:bg-primary/90 text-on-primary font-bold px-lg py-sm rounded-xl transition-all cursor-pointer w-full" @click="dismiss">
          Thanks
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'lingorx_encouragement_date'
const visible = ref(false)
const message = ref('')

function dismiss() {
  visible.value = false
}

onMounted(async () => {
  const today = new Date().toDateString()
  const lastShown = localStorage.getItem(STORAGE_KEY)

  if (lastShown === today) return

  try {
    const resp = await fetch('/encouragements.json')
    const list: { text: string }[] = await resp.json()
    const pick = list[Math.floor(Math.random() * list.length)]
    message.value = pick.text

    // 延迟一下弹窗，避免打断首屏加载
    setTimeout(() => {
      visible.value = true
      localStorage.setItem(STORAGE_KEY, today)
    }, 1500)
  } catch {
    // silently fail
  }
})
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out;
}
</style>
