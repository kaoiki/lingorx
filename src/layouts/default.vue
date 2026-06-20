<template>
  <div class="min-h-screen bg-surface text-on-surface overflow-x-hidden">
    <TopNavBar />
    <main class="pt-16 pb-32 lg:pb-20">
      <router-view />
    </main>
    <AppFooter @open-feedback="feedbackOpen = true" />
    <FeedbackModal :show="feedbackOpen" @close="feedbackOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeedbackModal from '../components/FeedbackModal.vue'

const feedbackOpen = ref(false)
</script>
