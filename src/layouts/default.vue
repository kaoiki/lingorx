<template>
  <div class="min-h-screen bg-surface text-on-surface overflow-x-hidden">
    <TopNavBar />
    <main class="pt-16 pb-32 lg:pb-16">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
</script>
