<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter pb-lg">
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
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" :class="latestUnlock.iconClass">
          <span class="material-symbols-outlined text-white text-[30px] filled">{{ latestUnlock.icon }}</span>
        </div>
        <div class="flex-1">
          <p class="text-label-sm font-bold text-tertiary uppercase tracking-widest mb-xs">Latest Unlock</p>
          <h2 class="font-headline-md font-bold text-on-surface mb-xs">{{ latestUnlock.title }}</h2>
          <p class="text-sm text-on-surface-variant">{{ latestUnlock.description }}</p>
        </div>
        <span class="bg-tertiary/10 text-tertiary px-sm py-xs rounded-full font-bold text-label-sm shrink-0">+{{ latestUnlock.reward }}</span>
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
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md" :class="a.iconClass">
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
          <p v-if="!a.unlocked" class="text-xs text-on-surface-variant mt-sm">Reward: {{ a.reward }}</p>
          <p v-else class="text-xs text-tertiary font-bold mt-sm">+{{ a.reward }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Achievement {
  id: number
  title: string
  description: string
  category: string
  reward: string
  icon: string
  iconClass: string
  unlocked: boolean
  current: number
  target: number
}

const activeCategory = ref('All')

const categories = ['All', 'Learning', 'Streak', 'Accuracy', 'XP', 'Words', 'Check-in']

// Mock data — 后续从 API 获取
const streak = ref(7)
const totalXp = ref(660)

const achievements: Achievement[] = [
  // ── Learning ──
  {
    id: 1, title: 'First Steps',
    description: 'Complete your first lesson.',
    category: 'Learning', reward: '20 Coins',
    icon: 'stadia_controller', iconClass: 'bg-gradient-to-br from-tertiary to-tertiary/70',
    unlocked: true, current: 1, target: 1,
  },
  {
    id: 2, title: 'Dedicated Learner',
    description: 'Complete 10 lessons.',
    category: 'Learning', reward: '50 Coins',
    icon: 'school', iconClass: 'bg-gradient-to-br from-primary to-secondary',
    unlocked: false, current: 8, target: 10,
  },
  {
    id: 3, title: 'Scholar',
    description: 'Complete 25 lessons.',
    category: 'Learning', reward: '100 Coins',
    icon: 'menu_book', iconClass: 'bg-gradient-to-br from-primary to-tertiary',
    unlocked: false, current: 8, target: 25,
  },
  {
    id: 4, title: 'Course Complete',
    description: 'Finish all lessons in any course.',
    category: 'Learning', reward: '150 Coins',
    icon: 'flag', iconClass: 'bg-gradient-to-br from-secondary to-primary',
    unlocked: false, current: 0, target: 1,
  },
  {
    id: 5, title: 'Comeback Kid',
    description: 'Improve a lesson from Retry (<50%) to Great (≥80%).',
    category: 'Learning', reward: '60 Coins',
    icon: 'trending_up', iconClass: 'bg-gradient-to-br from-error to-primary',
    unlocked: false, current: 0, target: 1,
  },

  // ── Streak ──
  {
    id: 6, title: 'On Fire',
    description: 'Maintain a 7-day learning streak.',
    category: 'Streak', reward: '50 Coins',
    icon: 'local_fire_department', iconClass: 'bg-gradient-to-br from-secondary to-secondary/70',
    unlocked: true, current: 7, target: 7,
  },
  {
    id: 7, title: 'Unstoppable',
    description: 'Maintain a 30-day learning streak.',
    category: 'Streak', reward: '200 Coins',
    icon: 'whatshot', iconClass: 'bg-gradient-to-br from-error to-error/70',
    unlocked: false, current: 7, target: 30,
  },

  // ── Accuracy ──
  {
    id: 8, title: 'Perfect Score',
    description: 'Complete a lesson with 100% accuracy.',
    category: 'Accuracy', reward: '30 Coins',
    icon: 'target', iconClass: 'bg-gradient-to-br from-primary to-primary/70',
    unlocked: true, current: 1, target: 1,
  },
  {
    id: 9, title: 'Sharp Mind',
    description: 'Score 80%+ accuracy on 10 lessons.',
    category: 'Accuracy', reward: '80 Coins',
    icon: 'psychology', iconClass: 'bg-gradient-to-br from-secondary to-tertiary',
    unlocked: false, current: 3, target: 10,
  },

  // ── XP ──
  {
    id: 10, title: 'XP Starter',
    description: 'Earn 500 total XP.',
    category: 'XP', reward: '40 Coins',
    icon: 'bolt', iconClass: 'bg-gradient-to-br from-secondary to-secondary/70',
    unlocked: true, current: 660, target: 500,
  },
  {
    id: 11, title: 'XP Hunter',
    description: 'Earn 2,000 total XP.',
    category: 'XP', reward: '100 Coins',
    icon: 'electric_bolt', iconClass: 'bg-gradient-to-br from-error to-primary',
    unlocked: false, current: 660, target: 2000,
  },

  // ── Words ──
  {
    id: 12, title: 'Word Novice',
    description: 'Type 100 words across all lessons.',
    category: 'Words', reward: '30 Coins',
    icon: 'keyboard', iconClass: 'bg-gradient-to-br from-tertiary to-primary',
    unlocked: true, current: 120, target: 100,
  },
  {
    id: 13, title: 'Word Master',
    description: 'Type 1,000 words across all lessons.',
    category: 'Words', reward: '150 Coins',
    icon: 'keyboard_double_arrow', iconClass: 'bg-gradient-to-br from-error to-tertiary',
    unlocked: false, current: 120, target: 1000,
  },

  // ── Speed ──
  {
    id: 14, title: 'Quick Learner',
    description: 'Complete a lesson in under 30 seconds.',
    category: 'Speed', reward: '50 Coins',
    icon: 'timer', iconClass: 'bg-gradient-to-br from-secondary to-primary',
    unlocked: false, current: 0, target: 1,
  },

  // ── Check-in（功能尚未发布）──
  {
    id: 15, title: 'First Check-in',
    description: 'Complete your first daily check-in.',
    category: 'Check-in', reward: '20 Coins',
    icon: 'edit_calendar', iconClass: 'bg-gradient-to-br from-primary to-tertiary',
    unlocked: false, current: 0, target: 1,
  },
  {
    id: 16, title: 'Dedicated Checker',
    description: 'Check in 30 times.',
    category: 'Check-in', reward: '100 Coins',
    icon: 'calendar_month', iconClass: 'bg-gradient-to-br from-secondary to-primary',
    unlocked: false, current: 0, target: 30,
  },
]

const latestUnlock = computed(() => {
  return achievements.filter(a => a.unlocked).slice(-1)[0] || null
})

const filteredAchievements = computed(() => {
  if (activeCategory.value === 'All') return achievements
  return achievements.filter(a => a.category === activeCategory.value)
})

const unlockedCount = computed(() => achievements.filter(a => a.unlocked).length)
const completionRate = computed(() => Math.round((unlockedCount.value / achievements.length) * 100))
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
.not-filled {
  font-variation-settings: 'FILL' 0;
}
</style>
