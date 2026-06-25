<template>
  <div class="p-gutter max-w-5xl mx-auto px-4 md:px-gutter">
    <!-- Header -->
    <section class="mb-lg">
      <div>
        <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
          <span class="material-symbols-outlined text-[18px]">menu_book</span>
          <span>MY COURSES</span>
        </div>
        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">My Courses</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">Courses you are learning or have completed.</p>
      </div>
    </section>

    <!-- Not logged in -->
    <section v-if="!isLoggedIn" class="glass-card p-xl rounded-2xl text-center">
      <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
        <span class="material-symbols-outlined text-[36px] text-primary">school</span>
      </div>
      <h2 class="font-headline-md font-bold text-on-surface mb-xs">Sign in to view your courses</h2>
      <p class="text-on-surface-variant text-sm mb-lg">Please sign in or create an account to start learning.</p>
      <router-link to="/login" class="inline-block bg-primary hover:bg-primary/90 text-on-primary font-bold px-lg py-sm rounded-xl transition-all">Sign In</router-link>
    </section>

    <!-- Loading -->
    <section v-else-if="loading" class="flex flex-col items-center justify-center py-20 gap-md">
      <div class="w-10 h-10 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
      <p class="text-on-surface-variant text-sm">Loading your courses…</p>
    </section>

    <!-- Empty -->
    <section v-else-if="myCourses.length === 0" class="glass-card p-xl rounded-2xl text-center">
      <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
        <span class="material-symbols-outlined text-[36px] text-primary">school</span>
      </div>
      <h2 class="font-headline-md font-bold text-on-surface mb-xs">No courses yet</h2>
      <p class="text-on-surface-variant text-sm mb-lg">You haven't started any courses yet.</p>
      <router-link to="/courses" class="inline-block bg-primary hover:bg-primary/90 text-on-primary font-bold px-lg py-sm rounded-xl transition-all">Browse Courses</router-link>
    </section>

    <!-- Learning -->
    <template v-else>
      <section v-if="learningCourses.length" class="mb-xl">
        <div class="flex items-center justify-between mb-md">
          <h2 class="font-headline-md font-bold text-on-surface">Learning</h2>
          <span class="text-label-sm font-bold text-on-surface-variant">{{ learningCourses.length }} active</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <article v-for="course in learningCourses" :key="course.id" class="glass-card p-lg rounded-2xl">
            <div class="flex gap-md">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" :class="courseGradient(courses.indexOf(course))">
                <span class="material-symbols-outlined text-white text-[30px]">{{ course.icon }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-md mb-xs">
                  <h3 class="font-headline-md text-on-surface truncate">{{ course.title }}</h3>
                  <span class="bg-primary/10 text-primary px-sm py-xs rounded-full font-bold text-label-sm shrink-0">Learning</span>
                </div>
                <p class="text-body-md text-on-surface-variant mb-md">Lesson {{ course.current_lesson }} / {{ course.total_lessons }}</p>
                <div class="w-full h-2 bg-surface-variant rounded-full overflow-hidden mb-md">
                  <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full" :style="{ width: `${(course.current_lesson / course.total_lessons) * 100}%` }" />
                </div>
                <router-link :to="`/courses/${course.id}`" class="inline-block bg-primary hover:bg-primary/90 text-on-primary font-bold px-md py-xs rounded-xl transition-all active:scale-95 cursor-pointer">
                  Continue
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Completed -->
      <section v-if="completedCourses.length">
        <div class="flex items-center justify-between mb-md">
          <h2 class="font-headline-md font-bold text-on-surface">Completed</h2>
          <span class="text-label-sm font-bold text-on-surface-variant">{{ completedCourses.length }} courses</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <article v-for="course in completedCourses" :key="course.id" class="glass-card p-lg rounded-2xl">
            <div class="flex gap-md">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-tertiary/20">
                <span class="material-symbols-outlined text-white text-[30px] text-tertiary">check_circle</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-md mb-xs">
                  <h3 class="font-headline-md text-on-surface truncate">{{ course.title }}</h3>
                  <span class="bg-tertiary/10 text-tertiary px-sm py-xs rounded-full font-bold text-label-sm shrink-0">Completed</span>
                </div>
                <p class="text-body-md text-on-surface-variant mb-md">{{ course.languageLabel }} · {{ course.level }}</p>
                <router-link :to="`/courses/${course.id}`" class="inline-block bg-tertiary hover:bg-tertiary/90 text-white font-bold px-md py-xs rounded-xl transition-all active:scale-95 cursor-pointer">
                  Review
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { api } from '../lib/api'
import { useAuth } from '../composables/useAuth'

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English', ja: 'Japanese', zh: 'Chinese', es: 'Spanish',
}

interface Course {
  id: string
  title: string
  description: string
  level: string
  language: string
  languageLabel: string
  total_lessons: number
  current_lesson: number
  icon: string
  status: 'learning' | 'not_started' | 'completed'
}

const { isLoggedIn } = useAuth()
const loading = ref(true)
const courses = ref<Course[]>([])

const myCourses = computed(() => courses.value.filter(c => c.status !== 'not_started'))
const learningCourses = computed(() => courses.value.filter(c => c.status === 'learning'))
const completedCourses = computed(() => courses.value.filter(c => c.status === 'completed'))

const gradients = [
  'from-primary to-primary/70',
  'from-secondary to-secondary/70',
  'from-tertiary to-primary',
  'from-error to-error/70',
  'from-primary to-secondary',
  'from-tertiary to-tertiary/70',
]

function courseGradient(index: number) {
  return `bg-gradient-to-br ${gradients[index % gradients.length]}`
}

onMounted(async () => {
  if (!isLoggedIn.value) {
    loading.value = false
    return
  }
  try {
    const data = await api<Course[]>('/api/courses')
    courses.value = data.map(c => ({
      ...c,
      languageLabel: LANGUAGE_LABELS[c.language] || c.language,
    }))
  } catch {
    // silently fail
  } finally {
    loading.value = false
  }
})
</script>
