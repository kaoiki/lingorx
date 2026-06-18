<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <h1 class="font-headline-md text-headline-md text-on-surface mb-lg">Courses</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
      <div
        v-for="course in courses"
        :key="course.id"
        class="glass-card p-lg rounded-2xl cursor-pointer hover:translate-y-[-2px] transition-all"
      >
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-md" :style="{ backgroundColor: course.color }">
          <span class="material-symbols-outlined text-[24px]">{{ course.icon }}</span>
        </div>
        <h3 class="font-headline-md font-bold text-on-surface mb-xs">{{ course.title }}</h3>
        <p class="text-on-surface-variant text-body-md mb-md">{{ course.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-label-sm text-on-surface-variant">{{ course.lessons }} lessons</span>
          <span class="text-label-sm font-bold" :class="course.progress > 0 ? 'text-primary' : 'text-on-surface-variant'">
            {{ course.progress > 0 ? course.progress + '%' : 'Not started' }}
          </span>
        </div>
        <div class="w-full h-2 bg-surface-variant rounded-full mt-sm overflow-hidden">
          <div class="h-full rounded-full transition-all" :style="{ width: course.progress + '%', backgroundColor: course.color }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const courses = [
  { id: 1, title: 'English Beginner', description: 'Start with basic vocabulary and daily phrases.', lessons: 12, progress: 60, icon: 'menu_book', color: '#10b981' },
  { id: 2, title: 'English Intermediate', description: 'Build sentences and improve your grammar.', lessons: 16, progress: 25, icon: 'auto_stories', color: '#0ea5e9' },
  { id: 3, title: 'English Advanced', description: 'Master complex expressions and fluency.', lessons: 20, progress: 0, icon: 'psychology', color: '#8b5cf6' },
  { id: 4, title: 'Japanese N5', description: 'Learn hiragana, katakana and basic kanji.', lessons: 10, progress: 0, icon: 'translate', color: '#f43f5e' },
  { id: 5, title: 'Japanese N4', description: 'Expand vocabulary and reading comprehension.', lessons: 14, progress: 0, icon: 'language', color: '#f59e0b' },
  { id: 6, title: 'Spanish Basics', description: 'Greetings, numbers, and everyday conversation.', lessons: 8, progress: 0, icon: 'flag', color: '#ec4899' },
]
</script>
