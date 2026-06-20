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
  </UApp>
</template>

<script setup lang="ts">
import { useToast } from './composables/useToast'

const { toast } = useToast()
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