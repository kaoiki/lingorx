<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <!-- Header -->
    <section class="mb-lg">
      <div>
        <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
          <span class="material-symbols-outlined text-[18px]">school</span>
          <span>COURSES</span>
        </div>
        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Choose Your Course</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Learn through language courses designed for vocabulary, grammar, listening, speaking, and review.</p>
      </div>
    </section>

    <!-- Not logged in -->
    <section v-if="!isLoggedIn" class="glass-card p-xl rounded-2xl text-center">
      <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
        <span class="material-symbols-outlined text-[36px] text-primary">school</span>
      </div>
      <h2 class="font-headline-md font-bold text-on-surface mb-xs">Sign in to browse courses</h2>
      <p class="text-on-surface-variant text-sm mb-lg">Please sign in or create an account to start learning.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-sm">
        <router-link to="/login" class="w-full sm:w-auto bg-primary hover:bg-primary/90 text-on-primary font-bold px-lg py-sm rounded-xl transition-all text-center">Sign In</router-link>
        <router-link to="/register" class="w-full sm:w-auto border border-outline-variant hover:bg-surface-variant text-on-surface font-bold px-lg py-sm rounded-xl transition-all text-center">Create Account</router-link>
      </div>
    </section>

    <!-- Loading -->
    <section v-else-if="loading" class="flex flex-col items-center justify-center py-20 gap-md">
      <div class="w-10 h-10 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
      <p class="text-on-surface-variant text-sm">Loading courses…</p>
    </section>

    <!-- Courses content -->
    <template v-else>
      <!-- AI Course Matcher -->
      <section class="mb-lg relative overflow-hidden rounded-2xl bg-white border border-secondary/20 shadow-sm">
        <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 pointer-events-none" />
        <div class="relative p-lg flex flex-col md:flex-row md:items-center md:justify-between gap-lg">
          <div>
            <div class="flex items-center gap-xs text-secondary font-bold text-label-sm mb-xs">
              <span class="material-symbols-outlined text-[18px]">psychology</span>
              <span>AI COURSE MATCHER</span>
            </div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-xs">Not sure where to start?</h2>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">Tell AI your target language, current level, and goal. LingoRx will recommend a course for you.</p>
          </div>
          <button class="bg-secondary hover:bg-secondary/90 text-white font-bold px-lg py-sm rounded-xl transition-all active:scale-95 shadow-md shadow-secondary/20 cursor-pointer flex items-center gap-xs shrink-0" @click="showAiModal = true">
            <span class="material-symbols-outlined text-[20px]">chat</span>
            Ask AI
          </button>
        </div>
      </section>

      <!-- Language Tabs -->
      <section v-if="languages.length > 1" class="glass-card p-md rounded-2xl mb-lg">
        <div class="flex items-center justify-between gap-sm">
          <div class="flex flex-wrap gap-sm">
            <button v-for="language in languages" :key="language"
              class="px-md py-xs rounded-full font-bold text-label-sm transition-colors cursor-pointer"
              :class="activeLanguage === language ? 'bg-primary text-on-primary shadow-sm shadow-primary/20' : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-variant'"
              @click="activeLanguage = language">
              {{ language }}
            </button>
          </div>
          <button class="flex items-center gap-xs text-on-surface-variant hover:text-primary text-xs transition-colors cursor-pointer shrink-0" @click="refresh">
            <span class="material-symbols-outlined text-[16px]" :class="{ 'animate-spin': refreshing }">refresh</span>
          </button>
        </div>
      </section>

      <!-- Learning Courses -->
      <section v-if="learningCourses.length" class="mb-xl">
        <div class="flex items-center justify-between mb-md">
          <h2 class="font-headline-md text-headline-md text-on-surface">Learning</h2>
          <span class="text-label-sm font-bold text-on-surface-variant">{{ learningCourses.length }} active</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <article v-for="course in learningCourses" :key="course.id" class="glass-card p-lg rounded-2xl">
            <div class="flex gap-md">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" :class="courseGradient(courses.indexOf(course))">
                <span class="material-symbols-outlined text-white text-[30px]">{{ course.icon }}</span>
              </div>
              <div class="flex-1">
                <div class="flex items-start justify-between gap-md mb-xs">
                  <h3 class="font-headline-md text-on-surface">{{ course.title }}</h3>
                  <span class="bg-primary/10 text-primary px-sm py-xs rounded-full font-bold text-label-sm shrink-0">Learning</span>
                </div>
                <p class="text-body-md text-on-surface-variant mb-md">Lesson {{ course.current_lesson }} / {{ course.total_lessons }}</p>
                <div class="w-full h-2 bg-surface-variant rounded-full overflow-hidden mb-md">
                  <div class="h-full bg-gradient-to-r from-primary to-secondary" :style="{ width: `${(course.current_lesson / course.total_lessons) * 100}%` }" />
                </div>
                <button class="bg-primary hover:bg-primary/90 text-on-primary font-bold px-md py-xs rounded-xl transition-all active:scale-95 cursor-pointer">Continue</button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- All Courses -->
      <section class="mb-xl relative">
        <div class="flex items-center justify-between mb-md">
          <h2 class="font-headline-md text-headline-md text-on-surface">All Courses</h2>
          <span class="text-label-sm font-bold text-on-surface-variant">{{ filteredCourses.length }} courses</span>
        </div>

        <!-- Refreshing overlay -->
        <div v-if="refreshing" class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 rounded-2xl" style="min-height: 200px;">
          <div class="w-8 h-8 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
          <article v-for="course in filteredCourses" :key="course.id" class="glass-card rounded-2xl overflow-hidden transition-transform">
            <div class="relative h-28 p-md overflow-hidden" :class="courseGradient(courses.indexOf(course))">
              <div class="absolute right-[-20px] top-[-20px] w-28 h-28 rounded-full bg-white/20" />
              <div class="absolute right-12 bottom-[-32px] w-20 h-20 rounded-full bg-white/10" />
              <div class="relative flex items-start justify-between">
                <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <span class="material-symbols-outlined text-white text-[30px]">{{ course.icon }}</span>
                </div>
                <span class="px-sm py-xs rounded-full font-bold text-label-sm" :class="statusClass(course.status)">{{ course.status === 'learning' ? 'Learning' : course.status === 'completed' ? 'Completed' : 'Not Started' }}</span>
              </div>
            </div>
            <div class="p-lg">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-xs">{{ course.title }}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-md">{{ course.description }}</p>
              <div class="flex flex-wrap gap-sm mb-md">
                <span class="px-sm py-xs rounded-full bg-primary/10 text-primary text-label-sm font-bold">{{ course.level }}</span>
                <span class="px-sm py-xs rounded-full bg-secondary/10 text-secondary text-label-sm font-bold">{{ course.languageLabel }}</span>
              </div>
              <div class="flex items-center justify-between mb-md text-label-sm font-bold text-on-surface-variant">
                <span>{{ course.total_lessons }} Lessons</span>
              </div>
              <button class="w-full font-bold py-sm rounded-xl transition-all active:scale-95 cursor-pointer"
                :class="course.status === 'learning' ? 'bg-primary text-on-primary hover:bg-primary/90' : course.status === 'completed' ? 'bg-white border border-outline-variant text-on-surface hover:bg-surface-variant' : 'bg-secondary text-white hover:bg-secondary/90'">
                {{ course.status === 'learning' ? 'Continue' : course.status === 'completed' ? 'Review' : 'Start Course' }}
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Creator Program Preview -->
      <section class="relative overflow-hidden rounded-2xl bg-white border border-tertiary/20 shadow-sm">
        <div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-primary/5 pointer-events-none" />
        <div class="relative p-lg flex flex-col md:flex-row md:items-center md:justify-between gap-lg">
          <div>
            <div class="flex items-center gap-xs text-tertiary font-bold text-label-sm mb-xs">
              <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>CREATOR PROGRAM</span>
            </div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-xs">Create courses. Share knowledge. Earn rewards.</h2>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">Soon, you will be able to build your own language course packages and earn when other learners study them.</p>
          </div>
          <button class="bg-white border border-tertiary/30 text-tertiary hover:bg-tertiary/5 font-bold px-lg py-sm rounded-xl transition-all active:scale-95 cursor-pointer shrink-0">Coming Soon</button>
        </div>
      </section>
    </template>

    <!-- AI Modal -->
    <div v-if="showAiModal" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4" @click.self="showAiModal = false">
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-outline-variant overflow-hidden">
        <div class="p-lg border-b border-outline-variant flex items-center justify-between">
          <div>
            <div class="flex items-center gap-xs text-secondary font-bold text-label-sm mb-xs">
              <span class="material-symbols-outlined text-[18px]">psychology</span>
              <span>AI COURSE MATCHER</span>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-surface">Tell AI your goal</h3>
          </div>
          <button class="w-9 h-9 rounded-full hover:bg-surface-variant flex items-center justify-center cursor-pointer" @click="showAiModal = false">
            <span class="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>
        <div class="p-lg space-y-md">
          <div class="bg-surface-container-low rounded-2xl p-md border border-secondary/20">
            <p class="text-on-surface-variant font-body-md text-body-md leading-relaxed">Example: I want to learn Japanese for travel. I am a complete beginner.</p>
          </div>
          <textarea v-model="aiMessage" class="w-full min-h-32 rounded-2xl border border-outline-variant p-md outline-none focus:border-secondary resize-none text-on-surface" placeholder="Tell me your target language, current level, and goal..." />
          <button class="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-sm rounded-xl transition-all active:scale-95 cursor-pointer">Get Recommendation</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { api } from '../lib/api'
import { useAuth } from '../composables/useAuth'

const { isLoggedIn } = useAuth()

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English', ja: 'Japanese', zh: 'Chinese', es: 'Spanish',
}

type CourseStatus = 'learning' | 'not_started' | 'completed'

interface Course {
  id: string
  title: string
  description: string
  status: CourseStatus
  level: string
  language: string
  languageLabel: string
  total_lessons: number
  current_lesson: number
  icon: string
}

const activeLanguage = ref('All')
const showAiModal = ref(false)
const aiMessage = ref('')
const loading = ref(true)
const refreshing = ref(false)
const courses = ref<Course[]>([])

watch(isLoggedIn, (val) => {
  if (!val) {
    courses.value = []
  }
})

const languages = computed(() => {
  const labels = [...new Set(courses.value.map(c => c.languageLabel))]
  return ['All', ...labels]
})

const filteredCourses = computed(() =>
  courses.value.filter(c => activeLanguage.value === 'All' || c.languageLabel === activeLanguage.value)
)

const learningCourses = computed(() => filteredCourses.value.filter(c => c.status === 'learning'))

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

function statusClass(status: CourseStatus) {
  if (status === 'learning') return 'bg-white text-primary'
  if (status === 'completed') return 'bg-white text-tertiary'
  return 'bg-white/20 text-white backdrop-blur'
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

async function refresh() {
  refreshing.value = true
  try {
    const data = await api<Course[]>('/api/courses')
    courses.value = data.map(c => ({
      ...c,
      languageLabel: LANGUAGE_LABELS[c.language] || c.language,
    }))
  } catch {
    // silently fail
  } finally {
    refreshing.value = false
  }
}
</script>
