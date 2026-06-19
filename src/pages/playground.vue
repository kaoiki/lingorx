<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <section class="relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm">
      <Noise :contained="true" :opacity="0.08" :grain-size="2" :fps="4" :z-index="0" />
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5 pointer-events-none" />

      <div class="relative p-xl min-h-[520px] flex flex-col items-center justify-center text-center">
        <div class="w-24 h-24 hex-frame bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-lg shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-white text-[48px]">
            psychology
          </span>
        </div>

        <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
          <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>QUEST</span>
        </div>

        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-md">
          AI Language Quest
        </h1>

        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-lg">
          Practice real language situations with AI, receive instant feedback,
          and improve through scored conversation training.
        </p>

        <div class="flex flex-wrap justify-center gap-sm mb-lg">
          <span class="px-md py-xs rounded-full bg-primary/10 text-primary font-bold text-label-sm">
            AI Conversation
          </span>

          <span class="px-md py-xs rounded-full bg-secondary/10 text-secondary font-bold text-label-sm">
            Situation Practice
          </span>

          <span class="px-md py-xs rounded-full bg-tertiary/10 text-tertiary font-bold text-label-sm">
            Smart Scoring
          </span>
        </div>

        <button
          class="bg-white border border-outline-variant text-on-surface font-bold px-lg py-sm rounded-xl cursor-default"
        >
          Coming Soon
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Noise from '../components/animate/Noise.vue'
</script>