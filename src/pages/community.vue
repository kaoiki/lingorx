<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <h1 class="font-headline-md text-headline-md text-on-surface mb-lg">Community</h1>
    <div class="max-w-2xl space-y-lg">
      <div v-for="post in feed" :key="post.id" class="glass-card p-lg rounded-2xl">
        <div class="flex items-start gap-md mb-md">
          <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-outline-variant" :class="post.avatarBg">
            <span class="material-symbols-outlined text-[20px] text-white">{{ post.avatarIcon }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-sm mb-xs">
              <span class="font-bold text-on-surface text-sm">{{ post.name }}</span>
              <span class="text-label-sm text-on-surface-variant">{{ post.time }}</span>
            </div>
            <p class="text-on-surface-variant text-sm leading-relaxed">{{ post.content }}</p>
            <div class="flex items-center gap-lg mt-sm">
              <button class="flex items-center gap-xs hover:text-error transition-colors cursor-pointer" @click="toggleLike(post.id)">
                <span class="material-symbols-outlined text-[16px]" :class="post.liked ? 'text-error' : 'text-on-surface-variant'" :style="post.liked ? 'font-variation-settings: \'FILL\' 1' : ''">favorite</span>
                <span class="text-label-sm font-bold" :class="post.liked ? 'text-error' : 'text-on-surface-variant'">{{ post.likes }}</span>
              </button>
              <span class="material-symbols-outlined text-[16px] text-on-surface-variant">chat_bubble</span>
              <span class="text-label-sm text-on-surface-variant">{{ post.comments }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const feed = reactive([
  { id: 1, name: 'Mika', time: '2m ago', content: 'Defeated 24 enemies in Japanese N5 — almost max score!', likes: 12, liked: false, comments: 3, avatarBg: 'bg-secondary', avatarIcon: 'face' },
  { id: 2, name: 'Alex', time: '15m ago', content: 'Completed English Beginner Lesson 02. Daily Objects are getting easier!', likes: 5, liked: false, comments: 1, avatarBg: 'bg-primary', avatarIcon: 'face' },
  { id: 3, name: 'Sara', time: '1h ago', content: 'Hit a 30-day streak! 🔥 Never felt more motivated to learn.', likes: 24, liked: true, comments: 7, avatarBg: 'bg-tertiary', avatarIcon: 'face' },
  { id: 4, name: 'Tom', time: '2h ago', content: 'Started Spanish Basics today. ¡Hola mundo!', likes: 8, liked: false, comments: 2, avatarBg: 'bg-error', avatarIcon: 'face' },
  { id: 5, name: 'Lina', time: '3h ago', content: '100% accuracy on English Intermediate Lesson 8! That was tough.', likes: 18, liked: false, comments: 4, avatarBg: 'bg-secondary', avatarIcon: 'face' },
])

function toggleLike(id: number) {
  const post = feed.find(p => p.id === id)
  if (post) {
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
  }
}
</script>
