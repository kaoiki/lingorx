<template>
  <div class="p-gutter max-w-6xl mx-auto px-4 md:px-gutter">
    <!-- Header -->
    <section class="mb-lg">
      <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
        <span class="material-symbols-outlined text-[18px]">bar_chart</span>
        <span>STATISTICS</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Learning Statistics</h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant">Track your progress and learning activity.</p>
    </section>

    <!-- Summary Cards -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-md mb-lg">
      <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-primary/40">
        <div class="w-10 h-10 mx-auto mb-sm rounded-xl bg-primary/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px] text-primary">bolt</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ stats.total_xp }}</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Total XP</div>
      </div>
      <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-secondary/40">
        <div class="w-10 h-10 mx-auto mb-sm rounded-xl bg-secondary/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px] text-secondary">monetization_on</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ stats.total_coins }}</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Coins</div>
      </div>
      <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-tertiary/40">
        <div class="w-10 h-10 mx-auto mb-sm rounded-xl bg-tertiary/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px] text-tertiary">schedule</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ formatTime(stats.total_time_seconds) }}</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Total Time</div>
      </div>
      <div class="glass-card p-md rounded-2xl text-center border-b-4 border-b-error/40">
        <div class="w-10 h-10 mx-auto mb-sm rounded-xl bg-error/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px] text-error">local_fire_department</span>
        </div>
        <div class="font-headline-md text-headline-md text-on-surface">{{ stats.streak_days }}</div>
        <div class="text-label-sm font-bold text-on-surface-variant">Day Streak</div>
      </div>
    </section>

    <!-- XP Progress -->
    <section class="glass-card p-lg rounded-2xl mb-lg">
      <div class="flex items-center justify-between mb-sm">
        <div class="flex items-center gap-sm">
          <span class="material-symbols-outlined text-[18px] text-primary">bolt</span>
          <span class="font-bold text-sm text-on-surface">Level {{ level }}</span>
        </div>
        <span class="text-label-sm font-bold text-on-surface-variant">{{ stats.total_xp }} / {{ nextLevelXp }} XP</span>
      </div>
      <div class="w-full h-3 bg-surface-variant rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
          :style="{ width: xpProgress + '%' }" />
      </div>
    </section>

    <!-- Chart Section -->
    <section class="glass-card p-lg rounded-2xl mb-lg">
      <h2 class="font-headline-md font-bold text-on-surface mb-md">7-Day Trend</h2>
      <div ref="activityChartRef" class="w-full h-56" />
    </section>

    <!-- Recent Lessons List -->
    <section class="glass-card p-lg rounded-2xl mb-lg">
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md font-bold text-on-surface">Recent Lessons</h2>
        <div class="flex items-center gap-sm text-[10px] text-on-surface-variant font-bold">
          <span class="flex items-center gap-[3px]"><span class="w-2 h-2 rounded-full bg-primary/60" /> Excellent</span>
          <span class="flex items-center gap-[3px]"><span class="w-2 h-2 rounded-full bg-secondary/60" /> Good</span>
          <span class="flex items-center gap-[3px]"><span class="w-2 h-2 rounded-full bg-error/60" /> Review</span>
        </div>
      </div>
      <div v-if="stats.recent_lessons.length === 0" class="text-center py-md text-on-surface-variant text-sm">
        No lessons completed yet. Start learning to see your history!
      </div>
      <div v-else class="space-y-sm">
        <div v-for="(lesson, i) in stats.recent_lessons" :key="i"
          class="flex items-start gap-md p-sm rounded-xl hover:bg-surface-variant transition-colors">
          <div class="flex flex-col items-center shrink-0">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              :class="lesson.accuracy >= 80 ? 'bg-primary/10 text-primary' : lesson.accuracy >= 50 ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'">
              {{ lesson.accuracy }}%
            </div>
            <span class="text-[9px] font-bold mt-[2px]"
              :class="lesson.accuracy >= 80 ? 'text-primary' : lesson.accuracy >= 50 ? 'text-secondary' : 'text-error'">Acc</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-on-surface truncate">{{ lesson.title }}</p>
            <p class="text-xs text-on-surface-variant">{{ lesson.course_name }}</p>
          </div>
          <div class="text-right shrink-0 min-w-[100px]">
            <p class="text-sm font-bold text-primary">+{{ lesson.xp_earned }} XP</p>
            <p class="text-xs text-on-surface-variant flex items-center justify-end gap-xs whitespace-nowrap">
              <span v-if="lesson.coins_earned" class="flex items-center gap-[2px]"><span class="material-symbols-outlined text-[10px]">monetization_on</span>{{ lesson.coins_earned }}</span>
              {{ lesson.time_seconds }}s · {{ formatDate(lesson.completed_at) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// Mock data — 后续切换为 API 调用
const XP_PER_LEVEL = 500
const level = computed(() => Math.floor(stats.value.total_xp / XP_PER_LEVEL))
const nextLevelXp = computed(() => (level.value + 1) * XP_PER_LEVEL)
const xpProgress = computed(() => ((stats.value.total_xp - level.value * XP_PER_LEVEL) / XP_PER_LEVEL) * 100)

const stats = ref({
  total_xp: 320,
  total_coins: 54,
  total_lessons: 4,
  total_defeated: 4,
  total_words_typed: 40,
  total_time_seconds: 386,
  today_time_seconds: 341,
  today_words: 30,
  streak_days: 2,
  today_missions: [
    { id: 1, label: 'Complete one battle', done: true, progress: '' },
    { id: 2, label: 'Practice 10 minutes', done: false, progress: '5/10 min' },
    { id: 3, label: 'Learn 20 words', done: true, progress: '20/20' },
    { id: 4, label: 'Earn 50 XP', done: true, progress: '50/50' },
    { id: 5, label: '80%+ accuracy', done: false, progress: '63%' },
    { id: 6, label: 'Login streak +1', done: true, progress: '' },
  ],
  daily_activity: [
    { date: '06/19', xp: 0, coins: 0, missions: 0 },
    { date: '06/20', xp: 0, coins: 0, missions: 0 },
    { date: '06/21', xp: 0, coins: 0, missions: 0 },
    { date: '06/22', xp: 0, coins: 0, missions: 0 },
    { date: '06/23', xp: 0, coins: 0, missions: 0 },
    { date: '06/24', xp: 100, coins: 16, missions: 2 },
    { date: '06/25', xp: 220, coins: 38, missions: 4 },
  ],
  recent_lessons: [
    { title: 'Daily Routine', course_name: 'English Beginner', accuracy: 20, xp_earned: 20, coins_earned: 4, time_seconds: 130, completed_at: '2026-06-25T01:15:40Z' },
    { title: 'Food & Drinks', course_name: 'English Beginner', accuracy: 100, xp_earned: 120, coins_earned: 20, time_seconds: 120, completed_at: '2026-06-25T01:04:37Z' },
    { title: 'Numbers & Colors', course_name: 'English Beginner', accuracy: 70, xp_earned: 80, coins_earned: 14, time_seconds: 91, completed_at: '2026-06-25T00:24:16Z' },
    { title: 'Greetings', course_name: 'English Beginner', accuracy: 80, xp_earned: 100, coins_earned: 16, time_seconds: 45, completed_at: '2026-06-24T23:28:48Z' },
  ],
})

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 86400000) return 'Today'
  if (diff < 172800000) return 'Yesterday'
  return `${d.getMonth() + 1}/${d.getDate()}`
}

// ECharts instances
const activityChartRef = ref<HTMLDivElement | null>(null)
let activityChart: echarts.ECharts | null = null

function initCharts() {
  // Activity line chart
  if (activityChartRef.value) {
    const days = stats.value.daily_activity
    activityChart = echarts.init(activityChartRef.value)
    activityChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { bottom: 0, icon: 'circle', itemWidth: 8, itemHeight: 8 },
      grid: { left: 40, right: 20, top: 20, bottom: 40 },
      xAxis: {
        type: 'category',
        data: days.map(d => d.date),
        axisLabel: { fontSize: 11, fontWeight: 'bold' as const },
      },
      yAxis: { type: 'value', name: 'XP / Coins' },
      series: [
        {
          name: 'XP',
          type: 'line',
          smooth: true,
          data: days.map(d => d.xp),
          lineStyle: { color: '#2563eb', width: 2 },
          itemStyle: { color: '#2563eb' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(37,99,235,0.3)' },
              { offset: 1, color: 'rgba(37,99,235,0.02)' },
            ]),
          },
        },
        {
          name: 'Coins',
          type: 'line',
          smooth: true,
          data: days.map(d => d.coins),
          lineStyle: { color: '#f59e0b', width: 2 },
          itemStyle: { color: '#f59e0b' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(245,158,11,0.3)' },
              { offset: 1, color: 'rgba(245,158,11,0.02)' },
            ]),
          },
        },
        {
          name: 'Missions',
          type: 'line',
          smooth: true,
          data: days.map(d => d.missions),
          lineStyle: { color: '#10b981', width: 2 },
          itemStyle: { color: '#10b981' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16,185,129,0.3)' },
              { offset: 1, color: 'rgba(16,185,129,0.02)' },
            ]),
          },
        },
      ],
    })
  }
}

function handleResize() {
  activityChart?.resize()
}

onMounted(() => {
  nextTick(() => {
    initCharts()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  activityChart?.dispose()
})
</script>
