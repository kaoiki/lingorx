<template>
  <div v-if="loading" class="flex items-center justify-center py-32">
    <div class="w-10 h-10 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>

  <div v-else class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <!-- Hero: Stats + AI Matcher -->
    <section class="mb-xl relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
      <div class="relative p-xl flex flex-col md:flex-row gap-lg">
        <!-- Personal Stats -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-md">
            <p class="text-on-surface-variant text-sm font-bold">👋 Welcome back, <span class="text-on-surface">{{ nickname }}</span></p>
            <div class="flex items-center gap-xs bg-primary/10 text-primary px-sm py-xs rounded-full font-bold text-label-sm">
              <span class="material-symbols-outlined text-[14px]">local_fire_department</span>
              <span>{{ streak }} day{{ streak > 1 ? 's' : '' }} streak</span>
            </div>
          </div>

          <!-- Today's Progress -->
          <div class="mb-md">
            <p class="text-label-sm font-bold text-on-surface-variant mb-sm">Today's Progress</p>
            <div class="flex items-center gap-md mb-xs">
              <span class="text-label-sm text-on-surface-variant w-20 shrink-0">Practice</span>
              <div class="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                <div class="h-full bg-primary rounded-full transition-all" :style="{ width: practicePct + '%' }" />
              </div>
              <span class="text-label-sm font-bold text-on-surface-variant w-16 text-right">{{ todayPracticeMin }}/10 min</span>
            </div>
            <div class="flex items-center gap-md">
              <span class="text-label-sm text-on-surface-variant w-20 shrink-0">Words</span>
              <div class="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                <div class="h-full bg-secondary rounded-full transition-all" :style="{ width: wordsPct + '%' }" />
              </div>
              <span class="text-label-sm font-bold text-on-surface-variant w-16 text-right">{{ todayWords }}/20</span>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="flex items-center gap-lg mb-md">
            <div class="text-center flex-1">
              <div class="font-headline-md text-headline-md text-on-surface">{{ xp }}</div>
              <div class="text-label-sm font-bold text-on-surface-variant">XP</div>
            </div>
            <div class="w-px h-8 bg-outline-variant" />
            <div class="text-center flex-1">
              <div class="font-headline-md text-headline-md text-on-surface">{{ lessons }}</div>
              <div class="text-label-sm font-bold text-on-surface-variant">Lessons</div>
            </div>
            <div class="w-px h-8 bg-outline-variant" />
            <div class="text-center flex-1">
              <div class="font-headline-md text-headline-md text-on-surface">{{ totalTimeMin }}</div>
              <div class="text-label-sm font-bold text-on-surface-variant">Minutes</div>
            </div>
            <div class="w-px h-8 bg-outline-variant" />
            <div class="text-center flex-1">
              <div class="font-headline-md text-headline-md text-on-surface">{{ totalAccuracy }}%</div>
              <div class="text-label-sm font-bold text-on-surface-variant">Accuracy</div>
            </div>
          </div>

        </div>

        <!-- AI Matcher -->
        <div class="w-full md:w-64 shrink-0 bg-surface-container-low p-md rounded-2xl border border-primary/20">
          <div class="flex items-center gap-xs text-secondary font-bold font-label-sm mb-xs">
            <span class="material-symbols-outlined text-[14px]">psychology</span>
            <span>AI MATCHER</span>
          </div>
          <p class="text-label-md text-on-surface-variant leading-relaxed mb-md">
            Not sure what to learn next? Answer a few questions and LingoRx will recommend a course for you.
          </p>
          <button class="w-full py-xs bg-white text-secondary font-bold rounded-lg border border-secondary/20 hover:bg-secondary/5 transition-colors shadow-sm cursor-pointer">
            Get Recommendation
          </button>
        </div>
      </div>
    </section>

    <!-- Grid: Main + Right Sidebar -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-lg">
      <!-- Left: Today's Mission + Stats -->
      <div class="xl:col-span-8 flex flex-col gap-lg">
        <!-- Today's Mission -->
        <section class="glass-card p-lg rounded-2xl">
          <div class="flex justify-between items-center mb-lg">
            <h2 class="font-headline-md text-headline-md text-on-surface">Today's Mission</h2>
            <span class="bg-secondary/10 text-secondary px-sm py-xs rounded-full font-bold text-label-sm flex items-center gap-xs">
              <span class="material-symbols-outlined text-[14px]">monetization_on</span>
              + {{ coins }} Coins
            </span>
          </div>
          <div class="flex items-center gap-lg mb-lg">
            <div class="relative w-20 h-20">
              <svg class="w-full h-full transform -rotate-90">
                <circle class="text-surface-variant" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-width="6" />
                <circle class="text-secondary" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-dasharray="226" :stroke-dashoffset="226 - (226 * todayPracticeMin / 10)" stroke-width="6" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="font-bold text-on-surface leading-none">{{ todayPracticeMin }}/10</span>
                <span class="text-[10px] text-on-surface-variant uppercase font-bold">min</span>
              </div>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-on-surface mb-xs">Daily Training</h4>
              <p class="text-on-surface-variant font-body-md text-body-md">
                Play for 10 minutes today to maintain your mental agility.
              </p>
            </div>
          </div>
          <div class="space-y-sm">
            <div
              v-for="mission in missions"
              :key="mission.id"
              class="flex items-center gap-md p-sm rounded-xl transition-colors"
              :class="mission.done ? 'bg-primary/5 border border-primary/10' : 'hover:bg-surface-variant'"
            >
              <div
                class="w-6 h-6 rounded-md flex items-center justify-center"
                :class="mission.done ? 'bg-primary text-white' : 'border-2 border-outline-variant'"
              >
                <span v-if="mission.done" class="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span class="text-on-surface">{{ mission.label }}</span>
              <span
                class="ml-auto font-bold text-label-sm"
                :class="mission.done ? 'text-primary' : 'text-on-surface-variant'"
              >{{ mission.done ? 'DONE' : mission.progress }}</span>
            </div>

          </div>
        </section>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-md">
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-primary/40">
            <div class="text-primary mb-xs">
              <span class="material-symbols-outlined text-[28px]">local_fire_department</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">{{ streak }} Days</div>
            <div class="text-label-sm font-bold text-on-surface-variant">Streak</div>
          </div>
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-secondary/40">
            <div class="text-secondary mb-xs">
              <span class="material-symbols-outlined text-[28px]">keyboard</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">{{ totalWords }}</div>
            <div class="text-label-sm font-bold text-on-surface-variant">Words Typed</div>
          </div>
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-error/40">
            <div class="text-error mb-xs">
              <span class="material-symbols-outlined text-[28px]">trending_up</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">{{ totalAccuracy }}%</div>
            <div class="text-label-sm font-bold text-on-surface-variant">Accuracy</div>
          </div>
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-tertiary/40">
            <div class="text-tertiary mb-xs">
              <span class="material-symbols-outlined text-[28px]">bolt</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">{{ xp }}</div>
            <div class="text-label-sm font-bold text-on-surface-variant">XP</div>
          </div>
        </div>
      </div>

      <!-- Right: Achievement + Community -->
      <div class="xl:col-span-4 flex flex-col gap-lg">
        <!-- Latest Achievement -->
        <section class="glass-card p-lg rounded-2xl border-tertiary/20">
          <h3 class="text-label-sm font-bold text-tertiary mb-lg tracking-widest uppercase">Latest Achievement</h3>
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 hex-frame bg-gradient-to-br from-tertiary to-tertiary/70 flex items-center justify-center mb-md shadow-lg shadow-tertiary/20">
              <span
                class="material-symbols-outlined text-white text-[40px]"
                style="font-variation-settings: 'FILL' 1;"
              >workspace_premium</span>
            </div>
            <h4 class="font-headline-md text-on-surface mb-xs">First Victory</h4>
            <p class="text-on-surface-variant font-body-md text-body-md mb-lg">
              Completed your first Typing Battle with 100% accuracy.
            </p>
            <div class="w-full mb-md">
              <div class="flex justify-between text-label-sm font-bold text-on-surface-variant mb-xs">
                <span>Achievements</span>
                <span>{{ unlockedCount }}/{{ totalCount }}</span>
              </div>
              <div class="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                <div class="h-full bg-tertiary rounded-full transition-all" :style="{ width: (unlockedCount / totalCount) * 100 + '%' }" />
              </div>
            </div>
            <a
              class="text-tertiary font-bold hover:translate-x-1 transition-transform flex items-center gap-xs"
              href="#"
            >
              View Achievements
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </section>

        <!-- Community Feed -->
        <section class="glass-card p-lg rounded-2xl mb-lg">
          <div class="flex items-center justify-between mb-lg">
            <h3 class="font-headline-md text-on-surface">Community Check-in Top 3</h3>
            <router-link to="/community" class="text-primary text-label-sm font-bold uppercase hover:underline">View</router-link>
          </div>
          <div class="flex flex-col gap-md">
            <div class="flex items-center gap-md">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(16,185,129,0.1); color: #10b981">
                <span class="material-symbols-outlined text-[22px]">menu_book</span>
              </div>
              <div class="flex-1">
                <p class="font-headline-md text-headline-md text-on-surface">English</p>
                <p class="text-label-sm font-bold text-on-surface-variant">256 learners · 34 checked in</p>
              </div>
            </div>
            <div class="flex items-center gap-md">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(244,63,94,0.1); color: #f43f5e">
                <span class="material-symbols-outlined text-[22px]">translate</span>
              </div>
              <div class="flex-1">
                <p class="font-headline-md text-headline-md text-on-surface">Japanese</p>
                <p class="text-label-sm font-bold text-on-surface-variant">128 learners · 18 checked in</p>
              </div>
            </div>
            <div class="flex items-center gap-md">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(139,92,246,0.1); color: #8b5cf6">
                <span class="material-symbols-outlined text-[22px]">flag</span>
              </div>
              <div class="flex-1">
                <p class="font-headline-md text-headline-md text-on-surface">Spanish</p>
                <p class="text-label-sm font-bold text-on-surface-variant">64 learners · 8 checked in</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { api } from '../lib/api'

const { user, isLoggedIn } = useAuth()
const loading = ref(true)

const nickname = ref(user.value?.nickname || 'Learner')
const streak = ref(0)
const todayPracticeMin = ref(0)
const todayWords = ref(0)
const xp = ref(0)
const lessons = ref(0)
const totalAccuracy = ref(0)
const totalTimeMin = ref(0)
const totalWords = ref(0)

const practicePct = ref(0)
const wordsPct = ref(0)

const missions = ref([
  { id: 1, label: 'Complete one battle', done: false, progress: '' },
  { id: 2, label: 'Practice 10 minutes', done: false, progress: '' },
  { id: 3, label: 'Learn 20 words', done: false, progress: '' },
  { id: 4, label: 'Earn 50 XP', done: false, progress: '' },
  { id: 5, label: '80%+ accuracy', done: false, progress: '' },
  { id: 6, label: 'Login streak +1', done: false, progress: '' },
])

const coins = ref(0)
const unlockedCount = ref(0)
const totalCount = ref(0)

onMounted(async () => {
  document.querySelectorAll('.glass-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      (card as HTMLElement).style.transform = 'translateY(-2px)'
    })
    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = 'translateY(0)'
    })
  })

  if (!isLoggedIn.value) {
    loading.value = false
    return
  }

  try {
    const data = await api<{
      total_xp: number
      total_coins: number
      total_lessons: number
      total_accuracy: number
      total_words_typed: number
      total_time_seconds: number
      today_time_seconds: number
      today_words: number
      today_missions: { id: number; label: string; done: boolean; progress: string }[]
      achievements: { unlocked: number; total: number }
      streak_days: number
    }>('/api/stats')

    xp.value = data.total_xp
    coins.value = data.total_coins
    lessons.value = data.total_lessons
    totalAccuracy.value = data.total_accuracy
    totalTimeMin.value = Math.floor(data.total_time_seconds / 60)
    totalWords.value = data.total_words_typed
    streak.value = data.streak_days
    todayPracticeMin.value = Math.floor(data.today_time_seconds / 60)
    todayWords.value = data.today_words

    practicePct.value = Math.min((todayPracticeMin.value / 10) * 100, 100)
    wordsPct.value = Math.min((todayWords.value / 20) * 100, 100)

    missions.value = data.today_missions
    unlockedCount.value = data.achievements.unlocked
    totalCount.value = data.achievements.total
  } catch {
    // 未登录或接口失败，保持 0 值
  } finally {
    loading.value = false
  }
})
</script>
