<template>
  <div v-if="loading" class="flex items-center justify-center py-32">
    <div class="w-10 h-10 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>

  <div v-else class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter pb-lg">
    <!-- Header -->
    <section class="mb-lg">
      <div>
        <div class="flex items-center gap-xs text-tertiary font-bold font-label-md mb-xs">
          <span class="material-symbols-outlined text-[18px]">workspace_premium</span>
          <span>ACHIEVEMENTS</span>
        </div>
        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Achievements</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Unlock badges by completing lessons, maintaining streaks, and mastering accuracy.</p>
      </div>
    </section>

    <!-- Summary Cards -->
    <section class="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
      <div class="glass-card p-md rounded-2xl text-center">
        <div class="text-primary mb-xs">
          <span class="material-symbols-outlined text-[28px]">emoji_events</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ unlockedCount }} / {{ achievements.length }}</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Unlocked</div>
      </div>
      <div class="glass-card p-md rounded-2xl text-center">
        <div class="text-secondary mb-xs">
          <span class="material-symbols-outlined text-[28px]">local_fire_department</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ streak }} Days</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Current Streak</div>
      </div>
      <div class="glass-card p-md rounded-2xl text-center">
        <div class="text-tertiary mb-xs">
          <span class="material-symbols-outlined text-[28px]">bolt</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ completionRate }}%</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Completion</div>
      </div>
      <div class="glass-card p-md rounded-2xl text-center">
        <div class="text-error mb-xs">
          <span class="material-symbols-outlined text-[28px]">stars</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ totalXp }}</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Total XP</div>
      </div>
    </section>

    <!-- Latest Unlock -->
    <section v-if="latestUnlock" class="glass-card p-lg rounded-2xl mb-lg border border-tertiary/20">
      <div class="flex items-center gap-lg">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" :class="categoryGradient[latestUnlock.category]">
          <span class="material-symbols-outlined text-white text-[30px] filled">{{ latestUnlock.icon }}</span>
        </div>
        <div class="flex-1">
          <p class="text-label-sm font-bold text-tertiary uppercase tracking-widest mb-xs">Latest Unlock</p>
          <h2 class="font-headline-md font-bold text-on-surface mb-xs">{{ latestUnlock.title }}</h2>
          <p class="text-sm text-on-surface-variant">{{ latestUnlock.description }}</p>
        </div>
        <span class="bg-tertiary/10 text-tertiary px-sm py-xs rounded-full font-bold text-label-sm shrink-0">+{{ latestUnlock.reward_description }}</span>
      </div>
    </section>

    <!-- Category Tabs -->
    <section class="glass-card p-md rounded-2xl mb-lg">
      <div class="flex flex-wrap gap-sm">
        <button v-for="cat in categories" :key="cat"
          class="px-md py-xs rounded-full font-bold text-label-sm transition-colors cursor-pointer"
          :class="activeCategory === cat ? 'bg-tertiary text-white' : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-variant'"
          @click="activeCategory = cat">{{ cat }}</button>
      </div>
    </section>

    <!-- Achievement Grid -->
    <section>
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md font-bold text-on-surface">All Achievements</h2>
        <span class="text-label-sm font-bold text-on-surface-variant">{{ filteredAchievements.length }}</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
        <article v-for="a in filteredAchievements" :key="a.id"
          class="glass-card p-lg rounded-2xl transition-all"
          :class="a.unlocked ? '' : 'opacity-60 grayscale'">
          <div class="flex items-start gap-md mb-md">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md" :class="categoryGradient[a.category]">
              <span class="material-symbols-outlined text-white text-[26px] filled" :class="a.unlocked ? '' : 'not-filled'">{{ a.icon }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-sm">
                <h3 class="font-bold text-on-surface text-sm truncate">{{ a.title }}</h3>
                <span v-if="a.unlocked" class="material-symbols-outlined text-[16px] text-tertiary shrink-0">check_circle</span>
                <span v-else class="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">lock</span>
              </div>
              <p class="text-xs text-on-surface-variant mt-[2px]">{{ a.description }}</p>
            </div>
          </div>
          <div class="flex items-center gap-sm">
            <div class="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all" :class="a.unlocked ? 'bg-tertiary' : 'bg-on-surface-variant/30'"
                :style="{ width: Math.min((a.current / a.target) * 100, 100) + '%' }" />
            </div>
            <span class="text-xs font-bold text-on-surface-variant shrink-0">{{ a.current }}/{{ a.target }}</span>
          </div>
          <p v-if="!a.unlocked" class="text-xs text-on-surface-variant mt-sm">Reward: {{ a.reward_description }}</p>
          <p v-else class="text-xs text-tertiary font-bold mt-sm">+{{ a.reward_description }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { api } from '../lib/api'
import { useAuth } from '../composables/useAuth'

interface Achievement {
  id: number
  title: string
  description: string
  category: string
  icon: string
  unlocked: boolean
  current: number
  target: number
  reward_description: string
}

const categoryGradient: Record<string, string> = {
  Learning: 'bg-gradient-to-br from-tertiary to-tertiary/70',
  Streak: 'bg-gradient-to-br from-secondary to-secondary/70',
  Accuracy: 'bg-gradient-to-br from-primary to-primary/70',
  XP: 'bg-gradient-to-br from-secondary to-secondary/70',
  Words: 'bg-gradient-to-br from-tertiary to-primary',
  Speed: 'bg-gradient-to-br from-secondary to-primary',
  'Check-in': 'bg-gradient-to-br from-primary to-tertiary',
}

useAuth()
const activeCategory = ref('All')
const categories = ['All', 'Learning', 'Streak', 'Accuracy', 'XP', 'Words', 'Check-in']
const streak = ref(0)
const totalXp = ref(0)

const achievements = ref<Achievement[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api<Achievement[]>('/api/achievements')
    achievements.value = data
  } catch {}
  try {
    const stats = await api<{ total_xp: number; streak_days: number }>('/api/stats')
    totalXp.value = stats.total_xp
    streak.value = stats.streak_days
  } catch {}
  loading.value = false
})

const latestUnlock = computed(() => {
  return achievements.value.filter(a => a.unlocked).slice(-1)[0] || null
})

const filteredAchievements = computed(() => {
  if (activeCategory.value === 'All') return achievements.value
  return achievements.value.filter(a => a.category === activeCategory.value)
})

const unlockedCount = computed(() => achievements.value.filter(a => a.unlocked).length)
const completionRate = computed(() => Math.round((unlockedCount.value / achievements.value.length) * 100))
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
.not-filled {
  font-variation-settings: 'FILL' 0;
}
</style>
