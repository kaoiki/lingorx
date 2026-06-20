<template>
  <footer class="fixed bottom-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md py-lg px-gutter shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-md">
      <div class="flex items-center gap-md">
        <button
          class="flex items-center gap-xs bg-primary hover:bg-primary/90 text-on-primary font-bold px-md py-xs rounded-xl transition-all active:scale-95 shadow-sm cursor-pointer text-xs"
          @click="$emit('openFeedback')"
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
  </footer>
</template>

<script setup lang="ts">
import { version } from '../../package.json'
</script>
