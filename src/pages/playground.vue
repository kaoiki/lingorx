<template>
  <div class="flex overflow-hidden bg-white" style="height: calc(100vh - 64px - 7rem);">
    <!-- Left: Categories -->
    <div class="w-56 shrink-0 bg-white border-r border-outline-variant p-md flex flex-col gap-sm overflow-y-auto">
      <h3 class="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-sm">Practice</h3>
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="flex items-center gap-md px-md py-sm rounded-xl w-full cursor-default"
        :class="selected === cat.id ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant'"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          :style="{ backgroundColor: cat.color + '20', color: cat.color }"
        >
          <span class="material-symbols-outlined text-[18px]">{{ cat.icon }}</span>
        </div>
        <div class="min-w-0">
          <p class="text-sm truncate">{{ cat.name }}</p>
          <p class="text-xs text-on-surface-variant truncate">{{ cat.status }}</p>
        </div>
      </div>
    </div>

    <!-- Right: Coming Soon -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div class="px-gutter py-sm border-b border-outline-variant flex items-center gap-md shrink-0">
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          :style="{ backgroundColor: activeCat.color + '20', color: activeCat.color }"
        >
          <span class="material-symbols-outlined text-[18px]">{{ activeCat.icon }}</span>
        </div>
        <div>
          <p class="font-bold text-on-surface text-sm">{{ activeCat.name }}</p>
          <p class="text-xs text-on-surface-variant">AI Practice</p>
        </div>
      </div>

      <!-- Coming Soon content -->
      <div class="flex-1 flex flex-col items-center justify-center px-gutter">
        <div class="w-24 h-24 rounded-2xl bg-secondary/10 flex items-center justify-center mb-lg">
          <span class="material-symbols-outlined text-[56px] text-secondary">psychology</span>
        </div>
        <h3 class="font-headline-md text-headline-md font-bold text-on-surface mb-sm">Coming Soon</h3>
        <p class="text-on-surface-variant text-sm text-center" style="max-width: 400px;">
          AI Practice will be available in a future update.<br />
          You'll be able to have real conversations with<br />
          interactive feedback and scoring.
        </p>
      </div>

      <!-- Fixed bottom input -->
      <div class="shrink-0 px-gutter py-md border-t border-outline-variant bg-white">
        <div class="flex items-center gap-md" style="max-width: 600px;">
          <input
            v-model="inputText"
            type="text"
            placeholder="Type your message…"
            class="flex-1 px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            @keydown.enter.prevent="handleSend"
          />
          <button
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/90 text-white transition-all active:scale-95 shadow-sm cursor-pointer shrink-0"
            @click="showToast('🎯 AI Practice is coming soon!', 'success')"
          >
            <span class="material-symbols-outlined text-[20px]">mic</span>
          </button>
          <button
            :disabled="!inputText"
            class="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold px-md rounded-xl transition-all active:scale-95 shadow-sm cursor-pointer disabled:cursor-not-allowed whitespace-nowrap h-10"
            @click="handleSend"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '../composables/useToast'

const { show: showToast } = useToast()
const selected = ref(1)
const inputText = ref('')

const categories = [
  { id: 1, name: 'English Beginner', icon: 'menu_book', color: '#10b981', status: '5 practices' },
  { id: 2, name: 'English Intermediate', icon: 'auto_stories', color: '#0ea5e9', status: '3 practices' },
  { id: 3, name: 'Japanese N5', icon: 'translate', color: '#f43f5e', status: '2 practices' },
  { id: 4, name: 'Spanish Basics', icon: 'flag', color: '#8b5cf6', status: 'Coming soon' },
]

const activeCat = computed(() => categories.find(c => c.id === selected.value) || categories[0])

function handleSend() {
  if (!inputText.value) return
  showToast('🎯 AI Practice is coming soon!', 'success')
  inputText.value = ''
}
</script>
