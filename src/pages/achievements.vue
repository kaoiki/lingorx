<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <!-- Header -->
    <section class="mb-lg">
      <div>
        <div class="flex items-center gap-xs text-tertiary font-bold font-label-md mb-xs">
          <span class="material-symbols-outlined text-[18px]">workspace_premium</span>
          <span>ACHIEVEMENTS</span>
        </div>

        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">
          Your Achievements
        </h1>

        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Track your milestones, unlock badges, and celebrate your learning progress.
        </p>
      </div>
    </section>

    <!-- Achievement Summary -->
    <section class="mb-lg">
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md text-headline-md text-on-surface">
          Achievement Summary
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div class="relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm p-lg">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />

          <div class="relative">
            <div class="text-primary mb-xs">
              <span class="material-symbols-outlined text-[32px]">emoji_events</span>
            </div>

            <div class="font-headline-lg text-headline-lg text-on-surface">
              {{ unlockedCount }}
            </div>

            <div class="text-label-sm font-bold text-on-surface-variant">
              Unlocked
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm p-lg">
          <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 pointer-events-none" />

          <div class="relative">
            <div class="text-secondary mb-xs">
              <span class="material-symbols-outlined text-[32px]">local_fire_department</span>
            </div>

            <div class="font-headline-lg text-headline-lg text-on-surface">
              7 Days
            </div>

            <div class="text-label-sm font-bold text-on-surface-variant">
              Current Streak
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-sm p-lg">
          <div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-primary/5 pointer-events-none" />

          <div class="relative">
            <div class="text-tertiary mb-xs">
              <span class="material-symbols-outlined text-[32px]">bolt</span>
            </div>

            <div class="font-headline-lg text-headline-lg text-on-surface">
              {{ completionRate }}%
            </div>

            <div class="text-label-sm font-bold text-on-surface-variant">
              Completion
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Unlocked -->
    <section class="mb-lg relative overflow-hidden rounded-2xl bg-white border border-tertiary/20 shadow-sm">
      <div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-primary/5 pointer-events-none" />

      <div class="relative p-lg flex flex-col md:flex-row md:items-center gap-lg">
        <div class="w-20 h-20 hex-frame bg-gradient-to-br from-tertiary to-tertiary/70 flex items-center justify-center shadow-lg shadow-tertiary/20 shrink-0">
          <span
            class="material-symbols-outlined text-white text-[40px]"
            style="font-variation-settings: 'FILL' 1;"
          >
            workspace_premium
          </span>
        </div>

        <div class="flex-1">
          <div class="text-label-sm font-bold text-tertiary tracking-widest uppercase mb-xs">
            Recently Unlocked
          </div>

          <h2 class="font-headline-md text-headline-md text-on-surface mb-xs">
            First Victory
          </h2>

          <p class="font-body-md text-body-md text-on-surface-variant">
            Completed your first learning battle with 100% accuracy.
          </p>
        </div>

        <span class="bg-tertiary/10 text-tertiary px-sm py-xs rounded-full font-bold text-label-sm shrink-0">
          Unlocked
        </span>
      </div>
    </section>

    <!-- Category Tabs -->
    <section class="glass-card p-md rounded-2xl mb-lg">
      <div class="flex flex-wrap gap-sm">
        <button
          v-for="category in categories"
          :key="category"
          class="px-md py-xs rounded-full font-bold text-label-sm transition-colors cursor-pointer"
          :class="
            activeCategory === category
              ? 'bg-tertiary text-white shadow-sm shadow-tertiary/20'
              : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-variant'
          "
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <!-- All Achievements -->
    <section>
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md text-headline-md text-on-surface">
          All Achievements
        </h2>

        <span class="text-label-sm font-bold text-on-surface-variant">
          {{ filteredAchievements.length }} achievements
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
        <article
          v-for="achievement in filteredAchievements"
          :key="achievement.id"
          class="glass-card p-lg rounded-2xl transition-transform"
          :class="achievement.unlocked ? '' : 'opacity-70'"
        >
          <div class="flex items-start justify-between gap-md mb-md">
            <div
              class="w-16 h-16 hex-frame flex items-center justify-center shadow-lg"
              :class="
                achievement.unlocked
                  ? achievement.iconClass
                  : 'bg-surface-variant text-on-surface-variant shadow-none'
              "
            >
              <span
                class="material-symbols-outlined text-[34px]"
                :class="achievement.unlocked ? 'text-white' : 'text-on-surface-variant'"
                :style="achievement.unlocked ? `font-variation-settings: 'FILL' 1;` : ''"
              >
                {{ achievement.icon }}
              </span>
            </div>

            <span
              class="px-sm py-xs rounded-full font-bold text-label-sm shrink-0"
              :class="
                achievement.unlocked
                  ? 'bg-tertiary/10 text-tertiary'
                  : 'bg-surface-variant text-on-surface-variant'
              "
            >
              {{ achievement.unlocked ? 'Unlocked' : 'Locked' }}
            </span>
          </div>

          <h3 class="font-headline-md text-headline-md text-on-surface mb-xs">
            {{ achievement.title }}
          </h3>

          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-md">
            {{ achievement.description }}
          </p>

          <div class="flex flex-wrap gap-sm mb-md">
            <span class="px-sm py-xs rounded-full bg-primary/10 text-primary text-label-sm font-bold">
              {{ achievement.category }}
            </span>

            <span class="px-sm py-xs rounded-full bg-secondary/10 text-secondary text-label-sm font-bold">
              {{ achievement.reward }}
            </span>
          </div>

          <div>
            <div class="flex justify-between text-label-sm font-bold text-on-surface-variant mb-xs">
              <span>Progress</span>
              <span>{{ achievement.current }} / {{ achievement.target }}</span>
            </div>

            <div class="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-tertiary to-primary"
                :style="{ width: `${Math.min((achievement.current / achievement.target) * 100, 100)}%` }"
              />
            </div>
          </div>
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

const categories = ['All', 'Learning', 'Streak', 'Accuracy', 'Words', 'Creator']

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'First Victory',
    description: 'Complete your first learning battle.',
    category: 'Learning',
    reward: '+20 Coins',
    icon: 'workspace_premium',
    iconClass: 'bg-gradient-to-br from-tertiary to-tertiary/70 shadow-tertiary/20',
    unlocked: true,
    current: 1,
    target: 1
  },
  {
    id: 2,
    title: '7-Day Streak',
    description: 'Learn for 7 days in a row.',
    category: 'Streak',
    reward: '+50 Coins',
    icon: 'local_fire_department',
    iconClass: 'bg-gradient-to-br from-secondary to-secondary/70 shadow-secondary/20',
    unlocked: true,
    current: 7,
    target: 7
  },
  {
    id: 3,
    title: 'Perfect Accuracy',
    description: 'Complete one lesson with 100% accuracy.',
    category: 'Accuracy',
    reward: '+30 Coins',
    icon: 'target',
    iconClass: 'bg-gradient-to-br from-primary to-primary/70 shadow-primary/20',
    unlocked: true,
    current: 1,
    target: 1
  },
  {
    id: 4,
    title: 'Word Collector',
    description: 'Practice 500 words across all courses.',
    category: 'Words',
    reward: '+100 Coins',
    icon: 'dictionary',
    iconClass: 'bg-gradient-to-br from-tertiary to-primary shadow-tertiary/20',
    unlocked: false,
    current: 320,
    target: 500
  },
  {
    id: 5,
    title: 'Course Finisher',
    description: 'Complete your first full course package.',
    category: 'Learning',
    reward: '+150 Coins',
    icon: 'school',
    iconClass: 'bg-gradient-to-br from-primary to-secondary shadow-primary/20',
    unlocked: false,
    current: 4,
    target: 20
  },
  {
    id: 6,
    title: 'Future Creator',
    description: 'Create your first course package when Creator Program opens.',
    category: 'Creator',
    reward: 'Creator Badge',
    icon: 'auto_awesome',
    iconClass: 'bg-gradient-to-br from-secondary to-tertiary shadow-secondary/20',
    unlocked: false,
    current: 0,
    target: 1
  }
]

const filteredAchievements = computed(() => {
  if (activeCategory.value === 'All') {
    return achievements
  }

  return achievements.filter((achievement) => achievement.category === activeCategory.value)
})

const unlockedCount = computed(() => {
  return achievements.filter((achievement) => achievement.unlocked).length
})

const completionRate = computed(() => {
  return Math.round((unlockedCount.value / achievements.length) * 100)
})
</script>