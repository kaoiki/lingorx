<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
    <h1 class="font-headline-md text-headline-md text-on-surface mb-lg">Achievements</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
      <div
        v-for="ach in achievements"
        :key="ach.id"
        class="glass-card p-md rounded-2xl text-center transition-all"
        :class="ach.unlocked ? 'opacity-100' : 'opacity-50 grayscale'"
      >
        <div
          class="w-16 h-16 mx-auto mb-md flex items-center justify-center rounded-2xl"
          :class="ach.unlocked ? ach.bgClass : 'bg-surface-variant'"
        >
          <span
            class="material-symbols-outlined text-[32px]"
            :class="ach.unlocked ? 'text-white' : 'text-on-surface-variant'"
          >{{ ach.icon }}</span>
        </div>
        <h4 class="font-headline-md text-sm font-bold text-on-surface mb-xs">{{ ach.name }}</h4>
        <p class="text-on-surface-variant text-xs">{{ ach.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const achievements = [
  { id: 1, name: 'First Victory', desc: 'Complete your first battle.', icon: 'workspace_premium', unlocked: true, bgClass: 'bg-gradient-to-br from-tertiary to-tertiary/70' },
  { id: 2, name: 'Word Warrior', desc: 'Type 500 words total.', icon: 'keyboard', unlocked: true, bgClass: 'bg-gradient-to-br from-secondary to-secondary/70' },
  { id: 3, name: 'Streak Master', desc: 'Maintain a 7-day streak.', icon: 'local_fire_department', unlocked: true, bgClass: 'bg-gradient-to-br from-primary to-primary/70' },
  { id: 4, name: 'Polyglot', desc: 'Start 3 different courses.', icon: 'language', unlocked: false, bgClass: '' },
  { id: 5, name: 'Flawless Round', desc: 'Complete a battle with 100% accuracy.', icon: 'stars', unlocked: false, bgClass: '' },
  { id: 6, name: 'Dedicated Learner', desc: 'Complete 50 lessons.', icon: 'school', unlocked: false, bgClass: '' },
  { id: 7, name: 'Monster Slayer', desc: 'Defeat 500 enemies total.', icon: 'skull', unlocked: false, bgClass: '' },
  { id: 8, name: 'Social Butterfly', desc: 'Like 20 community posts.', icon: 'groups', unlocked: false, bgClass: '' },
]
</script>
