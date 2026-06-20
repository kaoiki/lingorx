<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter">
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
              <span>{{ streak }} day streak</span>
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
              <div class="font-headline-md text-headline-md text-on-surface">{{ defeated }}</div>
              <div class="text-label-sm font-bold text-on-surface-variant">Defeated</div>
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
              +20 Coins
            </span>
          </div>
          <div class="flex items-center gap-lg mb-lg">
            <div class="relative w-20 h-20">
              <svg class="w-full h-full transform -rotate-90">
                <circle class="text-surface-variant" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-width="6" />
                <circle class="text-secondary" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" stroke-dasharray="226" stroke-dashoffset="158" stroke-width="6" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="font-bold text-on-surface leading-none">3/10</span>
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
            <div class="flex items-center gap-md p-sm rounded-xl bg-primary/5 border border-primary/10">
              <div class="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-white">
                <span class="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span class="text-on-surface-variant font-medium">Complete one battle</span>
              <span class="ml-auto text-primary font-bold text-label-sm">DONE</span>
            </div>
            <div class="flex items-center gap-md p-sm rounded-xl hover:bg-surface-variant transition-colors">
              <div class="w-6 h-6 border-2 border-outline-variant rounded-md" />
              <span class="text-on-surface">Practice 20 words</span>
              <span class="ml-auto text-on-surface-variant font-bold text-label-sm">8/20</span>
            </div>
            <div class="flex items-center gap-md p-sm rounded-xl hover:bg-surface-variant transition-colors">
              <div class="w-6 h-6 border-2 border-outline-variant rounded-md" />
              <span class="text-on-surface">Keep your streak</span>
              <span class="ml-auto text-on-surface-variant font-bold text-label-sm">PENDING</span>
            </div>
          </div>
        </section>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-md">
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-primary/40">
            <div class="text-primary mb-xs">
              <span class="material-symbols-outlined text-[28px]">local_fire_department</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">7 Days</div>
            <div class="text-label-sm font-bold text-on-surface-variant">Streak</div>
          </div>
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-secondary/40">
            <div class="text-secondary mb-xs">
              <span class="material-symbols-outlined text-[28px]">keyboard</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">128</div>
            <div class="text-label-sm font-bold text-on-surface-variant">Words Typed</div>
          </div>
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-error/40">
            <div class="text-error mb-xs">
              <span class="material-symbols-outlined text-[28px]">skull</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">36</div>
            <div class="text-label-sm font-bold text-on-surface-variant">Defeated</div>
          </div>
          <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-tertiary/40">
            <div class="text-tertiary mb-xs">
              <span class="material-symbols-outlined text-[28px]">bolt</span>
            </div>
            <div class="font-headline-md text-headline-md text-on-surface">420</div>
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
        <section class="glass-card p-lg rounded-2xl">
          <div class="flex justify-between items-center mb-lg">
            <h3 class="font-headline-md text-on-surface">Community</h3>
            <a class="text-primary text-label-sm font-bold uppercase hover:underline" href="#">View Feed</a>
          </div>
          <div class="space-y-lg">
            <div class="flex gap-md">
              <div class="w-10 h-10 rounded-full bg-surface-variant overflow-hidden shrink-0 border border-outline-variant flex items-center justify-center text-on-surface-variant">
                <span class="material-symbols-outlined text-[20px]">face</span>
              </div>
              <div class="flex-1">
                <p class="text-on-surface font-body-md text-body-md leading-snug">
                  <span class="font-bold">Mika</span> defeated 24 enemies in Japanese N5
                </p>
                <div class="flex items-center gap-md mt-xs text-on-surface-variant">
                  <button class="flex items-center gap-xs hover:text-error transition-colors cursor-pointer">
                    <span class="material-symbols-outlined text-[16px]">favorite</span>
                    <span class="text-label-sm font-bold">12</span>
                  </button>
                  <span class="text-label-sm">2m ago</span>
                </div>
              </div>
            </div>
            <div class="flex gap-md">
              <div class="w-10 h-10 rounded-full bg-surface-variant overflow-hidden shrink-0 border border-outline-variant flex items-center justify-center text-on-surface-variant">
                <span class="material-symbols-outlined text-[20px]">face</span>
              </div>
              <div class="flex-1">
                <p class="text-on-surface font-body-md text-body-md leading-snug">
                  <span class="font-bold">Alex</span> completed English Beginner Lesson 02
                </p>
                <div class="flex items-center gap-md mt-xs text-on-surface-variant">
                  <button class="flex items-center gap-xs hover:text-error transition-colors cursor-pointer">
                    <span class="material-symbols-outlined text-[16px]">favorite</span>
                    <span class="text-label-sm font-bold">5</span>
                  </button>
                  <span class="text-label-sm">15m ago</span>
                </div>
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

const { user } = useAuth()

// TODO: 从 BFF 获取实时数据
const nickname = ref(user.value?.nickname || 'Learner')
const streak = ref(7)
const todayPracticeMin = ref(3)
const todayWords = ref(8)
const xp = ref(420)
const lessons = ref(12)
const defeated = ref(36)

const practicePct = ref(Math.min((todayPracticeMin.value / 10) * 100, 100))
const wordsPct = ref(Math.min((todayWords.value / 20) * 100, 100))

onMounted(() => {
  document.querySelectorAll('.glass-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      (card as HTMLElement).style.transform = 'translateY(-2px)'
    })
    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = 'translateY(0)'
    })
  })
})
</script>
