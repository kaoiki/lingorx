<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <!-- Header -->
    <section class="mb-lg">
      <div>
        <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
          <span class="material-symbols-outlined text-[18px]">school</span>
          <span>COURSES</span>
        </div>

        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">
          Choose Your Course
        </h1>

        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Learn through language courses designed for vocabulary, grammar, listening, speaking, and review.
        </p>
      </div>
    </section>

    <!-- AI Course Matcher -->
    <section class="mb-lg relative overflow-hidden rounded-2xl bg-white border border-secondary/20 shadow-sm">
      <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 pointer-events-none" />

      <div class="relative p-lg flex flex-col md:flex-row md:items-center md:justify-between gap-lg">
        <div>
          <div class="flex items-center gap-xs text-secondary font-bold text-label-sm mb-xs">
            <span class="material-symbols-outlined text-[18px]">psychology</span>
            <span>AI COURSE MATCHER</span>
          </div>

          <h2 class="font-headline-md text-headline-md text-on-surface mb-xs">
            Not sure where to start?
          </h2>

          <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Tell AI your target language, current level, and goal. LingoRx will recommend a course for you.
          </p>
        </div>

        <button
          class="bg-secondary hover:bg-secondary/90 text-white font-bold px-lg py-sm rounded-xl transition-all active:scale-95 shadow-md shadow-secondary/20 cursor-pointer flex items-center gap-xs shrink-0"
          @click="showAiModal = true"
        >
          <span class="material-symbols-outlined text-[20px]">chat</span>
          Ask AI
        </button>
      </div>
    </section>

    <!-- Language Tabs -->
    <section class="glass-card p-md rounded-2xl mb-lg">
      <div class="flex flex-wrap gap-sm">
        <button
          v-for="language in languages"
          :key="language"
          class="px-md py-xs rounded-full font-bold text-label-sm transition-colors cursor-pointer"
          :class="
            activeLanguage === language
              ? 'bg-primary text-on-primary shadow-sm shadow-primary/20'
              : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-variant'
          "
          @click="activeLanguage = language"
        >
          {{ language }}
        </button>
      </div>
    </section>

    <!-- Learning Courses -->
    <section v-if="learningCourses.length" class="mb-xl">
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md text-headline-md text-on-surface">
          Learning
        </h2>

        <span class="text-label-sm font-bold text-on-surface-variant">
          {{ learningCourses.length }} active
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <article
          v-for="course in learningCourses"
          :key="course.id"
          class="glass-card p-lg rounded-2xl"
        >
          <div class="flex gap-md">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              :class="course.iconClass"
            >
              <span class="material-symbols-outlined text-white text-[30px]">
                {{ course.icon }}
              </span>
            </div>

            <div class="flex-1">
              <div class="flex items-start justify-between gap-md mb-xs">
                <h3 class="font-headline-md text-on-surface">
                  {{ course.title }}
                </h3>

                <span class="bg-primary/10 text-primary px-sm py-xs rounded-full font-bold text-label-sm shrink-0">
                  Learning
                </span>
              </div>

              <p class="text-body-md text-on-surface-variant mb-md">
                Lesson {{ course.currentLesson }} / {{ course.lessons }} · {{ course.currentLessonTitle }}
              </p>

              <div class="w-full h-2 bg-surface-variant rounded-full overflow-hidden mb-md">
                <div
                  class="h-full bg-gradient-to-r from-primary to-secondary"
                  :style="{ width: `${(course.currentLesson / course.lessons) * 100}%` }"
                />
              </div>

              <button
                class="bg-primary hover:bg-primary/90 text-on-primary font-bold px-md py-xs rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- All Courses -->
    <section class="mb-xl">
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md text-headline-md text-on-surface">
          All Courses
        </h2>

        <span class="text-label-sm font-bold text-on-surface-variant">
          {{ filteredCourses.length }} courses
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
        <article
          v-for="course in filteredCourses"
          :key="course.id"
          class="glass-card rounded-2xl overflow-hidden transition-transform"
        >
          <div class="relative h-28 p-md overflow-hidden" :class="course.bgClass">
            <div class="absolute right-[-20px] top-[-20px] w-28 h-28 rounded-full bg-white/20" />
            <div class="absolute right-12 bottom-[-32px] w-20 h-20 rounded-full bg-white/10" />

            <div class="relative flex items-start justify-between">
              <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-[30px]">
                  {{ course.icon }}
                </span>
              </div>

              <span
                class="px-sm py-xs rounded-full font-bold text-label-sm"
                :class="statusClass(course.status)"
              >
                {{ course.status }}
              </span>
            </div>
          </div>

          <div class="p-lg">
            <h3 class="font-headline-md text-headline-md text-on-surface mb-xs">
              {{ course.title }}
            </h3>

            <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-md">
              {{ course.description }}
            </p>

            <div class="flex flex-wrap gap-sm mb-md">
              <span class="px-sm py-xs rounded-full bg-primary/10 text-primary text-label-sm font-bold">
                {{ course.level }}
              </span>

              <span class="px-sm py-xs rounded-full bg-secondary/10 text-secondary text-label-sm font-bold">
                {{ course.language }}
              </span>

              <span class="px-sm py-xs rounded-full bg-tertiary/10 text-tertiary text-label-sm font-bold">
                {{ course.type }}
              </span>
            </div>

            <div class="flex items-center justify-between mb-md text-label-sm font-bold text-on-surface-variant">
              <span>{{ course.lessons }} Lessons</span>
              <span>{{ course.words }} Words</span>
              <span>{{ course.time }}</span>
            </div>

            <button
              class="w-full font-bold py-sm rounded-xl transition-all active:scale-95 cursor-pointer"
              :class="
                course.status === 'Learning'
                  ? 'bg-primary text-on-primary hover:bg-primary/90'
                  : course.status === 'Completed'
                    ? 'bg-white border border-outline-variant text-on-surface hover:bg-surface-variant'
                    : 'bg-secondary text-white hover:bg-secondary/90'
              "
            >
              {{ course.status === 'Learning' ? 'Continue' : course.status === 'Completed' ? 'Review' : 'Start Course' }}
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

          <h2 class="font-headline-md text-headline-md text-on-surface mb-xs">
            Create courses. Share knowledge. Earn rewards.
          </h2>

          <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Soon, you will be able to build your own language course packages and earn when other learners study them.
          </p>
        </div>

        <button
          class="bg-white border border-tertiary/30 text-tertiary hover:bg-tertiary/5 font-bold px-lg py-sm rounded-xl transition-all active:scale-95 cursor-pointer shrink-0"
        >
          Coming Soon
        </button>
      </div>
    </section>

    <!-- AI Modal -->
    <div
      v-if="showAiModal"
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
      @click.self="showAiModal = false"
    >
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-outline-variant overflow-hidden">
        <div class="p-lg border-b border-outline-variant flex items-center justify-between">
          <div>
            <div class="flex items-center gap-xs text-secondary font-bold text-label-sm mb-xs">
              <span class="material-symbols-outlined text-[18px]">psychology</span>
              <span>AI COURSE MATCHER</span>
            </div>

            <h3 class="font-headline-md text-headline-md text-on-surface">
              Tell AI your goal
            </h3>
          </div>

          <button
            class="w-9 h-9 rounded-full hover:bg-surface-variant flex items-center justify-center cursor-pointer"
            @click="showAiModal = false"
          >
            <span class="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        <div class="p-lg space-y-md">
          <div class="bg-surface-container-low rounded-2xl p-md border border-secondary/20">
            <p class="text-on-surface-variant font-body-md text-body-md leading-relaxed">
              Example: I want to learn Japanese for travel. I am a complete beginner.
            </p>
          </div>

          <textarea
            v-model="aiMessage"
            class="w-full min-h-32 rounded-2xl border border-outline-variant p-md outline-none focus:border-secondary resize-none text-on-surface"
            placeholder="Tell me your target language, current level, and goal..."
          />

          <button
            class="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-sm rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            Get Recommendation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type CourseStatus = 'Learning' | 'Not Started' | 'Completed'

interface Course {
  id: number
  title: string
  description: string
  status: CourseStatus
  level: string
  language: string
  type: string
  lessons: number
  words: number
  time: string
  currentLesson: number
  currentLessonTitle: string
  icon: string
  bgClass: string
  iconClass: string
}

const activeLanguage = ref('All')
const showAiModal = ref(false)
const aiMessage = ref('')

const languages = ['All', 'English', 'Japanese', 'Chinese', 'Spanish']

const courses: Course[] = [
  {
    id: 1,
    title: 'English Beginner',
    description: 'Learn daily words, simple sentences, and basic expressions for everyday use.',
    status: 'Learning',
    level: 'Beginner',
    language: 'English',
    type: 'Vocabulary',
    lessons: 20,
    words: 320,
    time: '2-3h',
    currentLesson: 4,
    currentLessonTitle: 'Daily Objects',
    icon: 'menu_book',
    bgClass: 'bg-gradient-to-br from-primary to-primary/70',
    iconClass: 'bg-gradient-to-br from-primary to-primary/70'
  },
  {
    id: 2,
    title: 'Japanese N5 Starter',
    description: 'Start with kana, basic words, and simple Japanese sentence patterns.',
    status: 'Learning',
    level: 'N5',
    language: 'Japanese',
    type: 'Grammar',
    lessons: 24,
    words: 280,
    time: '3-4h',
    currentLesson: 3,
    currentLessonTitle: 'Greetings',
    icon: 'translate',
    bgClass: 'bg-gradient-to-br from-secondary to-secondary/70',
    iconClass: 'bg-gradient-to-br from-secondary to-secondary/70'
  },
  {
    id: 3,
    title: 'Travel English',
    description: 'Useful words and phrases for airports, hotels, restaurants, and shopping.',
    status: 'Not Started',
    level: 'Beginner',
    language: 'English',
    type: 'Speaking',
    lessons: 18,
    words: 260,
    time: '2h',
    currentLesson: 0,
    currentLessonTitle: '',
    icon: 'flight_takeoff',
    bgClass: 'bg-gradient-to-br from-tertiary to-primary',
    iconClass: 'bg-gradient-to-br from-tertiary to-primary'
  },
  {
    id: 4,
    title: 'Chinese Daily Listening',
    description: 'Practice short listening tasks based on daily life conversations.',
    status: 'Not Started',
    level: 'Beginner',
    language: 'Chinese',
    type: 'Listening',
    lessons: 16,
    words: 220,
    time: '2h',
    currentLesson: 0,
    currentLessonTitle: '',
    icon: 'headphones',
    bgClass: 'bg-gradient-to-br from-error to-error/70',
    iconClass: 'bg-gradient-to-br from-error to-error/70'
  },
  {
    id: 5,
    title: 'Spanish A1 Basics',
    description: 'Build your first Spanish foundation with common words and simple grammar.',
    status: 'Not Started',
    level: 'A1',
    language: 'Spanish',
    type: 'Vocabulary',
    lessons: 22,
    words: 300,
    time: '3h',
    currentLesson: 0,
    currentLessonTitle: '',
    icon: 'language',
    bgClass: 'bg-gradient-to-br from-primary to-secondary',
    iconClass: 'bg-gradient-to-br from-primary to-secondary'
  },
  {
    id: 6,
    title: 'English Dictation Basic',
    description: 'Improve spelling, listening, and typing accuracy through short dictation lessons.',
    status: 'Completed',
    level: 'Beginner',
    language: 'English',
    type: 'Dictation',
    lessons: 12,
    words: 180,
    time: '1.5h',
    currentLesson: 12,
    currentLessonTitle: 'Final Review',
    icon: 'edit_note',
    bgClass: 'bg-gradient-to-br from-tertiary to-tertiary/70',
    iconClass: 'bg-gradient-to-br from-tertiary to-tertiary/70'
  }
]

const filteredCourses = computed(() => {
  if (activeLanguage.value === 'All') {
    return courses
  }

  return courses.filter((course) => course.language === activeLanguage.value)
})

const learningCourses = computed(() => {
  return filteredCourses.value.filter((course) => course.status === 'Learning')
})

const statusClass = (status: CourseStatus) => {
  if (status === 'Learning') {
    return 'bg-white text-primary'
  }

  if (status === 'Completed') {
    return 'bg-white text-tertiary'
  }

  return 'bg-white/20 text-white backdrop-blur'
}
</script>