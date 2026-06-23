<template>
  <div class="p-gutter max-w-4xl mx-auto px-4 md:px-gutter pb-lg">
    <!-- Back link -->
    <router-link to="/courses" class="inline-flex items-center gap-xs text-on-surface-variant hover:text-primary text-sm transition-colors mb-lg">
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      Back to Courses
    </router-link>

    <!-- Not logged in -->
    <section v-if="!isLoggedIn" class="glass-card p-xl rounded-2xl text-center">
      <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
        <span class="material-symbols-outlined text-[36px] text-primary">school</span>
      </div>
      <h2 class="font-headline-md font-bold text-on-surface mb-xs">Sign in to view this course</h2>
      <p class="text-on-surface-variant text-sm mb-lg">Please sign in or create an account to start learning.</p>
      <router-link to="/login" class="inline-block bg-primary hover:bg-primary/90 text-on-primary font-bold px-lg py-sm rounded-xl transition-all">Sign In</router-link>
    </section>

    <!-- Loading -->
    <div v-else-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>

    <template v-else-if="course">
      <!-- Course Header -->
      <section class="glass-card p-lg rounded-2xl mb-lg">
        <div class="flex items-start gap-lg">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" :class="courseGradient(0)">
            <span class="material-symbols-outlined text-white text-[34px]">{{ course.icon }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="font-headline-md text-headline-md font-bold text-on-surface mb-xs">{{ course.title }}</h1>
            <p class="text-on-surface-variant text-sm mb-md">{{ course.description }}</p>
            <div class="flex flex-wrap gap-sm mb-md">
              <span class="px-sm py-xs rounded-full bg-primary/10 text-primary text-label-sm font-bold">{{ course.level }}</span>
              <span class="px-sm py-xs rounded-full bg-secondary/10 text-secondary text-label-sm font-bold">{{ course.languageLabel }}</span>
              <span class="px-sm py-xs rounded-full bg-surface-variant text-on-surface-variant text-label-sm font-bold">{{ course.total_lessons }} Lessons</span>
              <span class="px-sm py-xs rounded-full bg-surface-variant text-on-surface-variant text-label-sm font-bold flex items-center gap-xs">
                <span class="material-symbols-outlined text-[12px]">person</span>
                {{ course.author || 'Platform' }}
              </span>
            </div>
            <div v-if="course.current_lesson > 0" class="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full" :style="{ width: `${(course.current_lesson / course.total_lessons) * 100}%` }" />
            </div>
            <p v-if="course.current_lesson > 0" class="text-label-sm font-bold text-primary mt-xs">Lesson {{ course.current_lesson }} / {{ course.total_lessons }}</p>
          </div>
        </div>
      </section>

      <!-- Lessons List -->
      <section>
        <div class="flex items-center justify-between mb-md">
          <h2 class="font-headline-md font-bold text-on-surface">Lessons</h2>
          <span class="text-label-sm font-bold text-on-surface-variant flex items-center gap-xs">
            <span class="material-symbols-outlined text-[14px]">lock</span>
            Complete a lesson to unlock the next
          </span>
        </div>
        <div class="flex flex-col gap-sm">
          <div
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            class="glass-card p-lg rounded-2xl flex items-center gap-lg transition-all"
            :class="lesson.status === 'locked' ? 'opacity-50' : 'hover:translate-y-[-1px] cursor-pointer'"
            @click="lesson.status !== 'locked' && goToBattle(lesson.id)"
          >
            <!-- Number badge -->
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
              :class="lesson.status === 'completed' ? 'bg-primary text-on-primary' : lesson.status === 'available' ? 'bg-primary/10 text-primary' : 'bg-surface-variant text-on-surface-variant'">
              <span v-if="lesson.status === 'completed'" class="material-symbols-outlined text-[20px]">check</span>
              <span v-else>{{ index + 1 }}</span>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-on-surface text-sm">{{ lesson.title }}</h3>
              <p class="text-on-surface-variant text-xs">{{ lesson.description }}</p>
            </div>

            <!-- Status / Action -->
            <div class="shrink-0">
              <span v-if="lesson.status === 'locked'" class="text-on-surface-variant text-label-sm font-bold flex items-center gap-xs group relative">
                <span class="material-symbols-outlined text-[16px]">lock</span>
                <span class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-on-surface text-white text-[10px] px-sm py-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Complete previous lesson first
                </span>
              </span>
              <span v-else-if="lesson.status === 'completed'" class="text-primary text-label-sm font-bold">Completed</span>
              <button v-else class="bg-primary hover:bg-primary/90 text-on-primary font-bold px-md py-xs rounded-xl text-xs transition-all active:scale-95 cursor-pointer">
                Start
              </button>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Not found -->
    <div v-else class="text-center py-20">
      <p class="text-on-surface-variant">Course not found.</p>
      <router-link to="/courses" class="text-primary hover:underline text-sm mt-sm inline-block">Back to Courses</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../lib/api'
import { useAuth } from '../composables/useAuth'

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English', ja: 'Japanese', zh: 'Chinese', es: 'Spanish',
}

const route = useRoute()
const router = useRouter()
const { isLoggedIn } = useAuth()

// TODO: 从 BFF 获取课程详情 GET /api/courses/:courseId
// TODO: 从 BFF 获取 lesson 列表 GET /api/courses/:courseId/lessons

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
  author?: string
}

interface Lesson {
  id: string
  title: string
  description: string
  status: 'locked' | 'available' | 'completed'
}

const loading = ref(true)
const course = ref<Course | null>(null)
const lessons = ref<Lesson[]>([])

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

function goToBattle(lessonId: string) {
  router.push(`/play/${lessonId}`)
}

onMounted(async () => {
  const courseId = route.params.courseId as string

  if (!isLoggedIn.value) {
    loading.value = false
    return
  }

  try {
    // 获取课程信息
    const allCourses = await api<Course[]>('/api/courses')
    const found = allCourses.find((c: Course) => c.id === courseId)
    if (found) {
      course.value = { ...found, languageLabel: LANGUAGE_LABELS[found.language] || found.language }
    }

    // 获取 lesson 列表
    lessons.value = await api<Lesson[]>(`/api/courses/${courseId}/lessons`)
  } catch {
    // 静默失败
  } finally {
    loading.value = false
  }
})
</script>
