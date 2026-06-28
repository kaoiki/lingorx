<template>
  <div v-if="loading" class="flex items-center justify-center py-32">
    <div class="w-10 h-10 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>

  <div v-else class="p-gutter max-w-5xl mx-auto px-4 md:px-gutter pb-lg">
    <!-- Header -->
    <section class="mb-lg">
      <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
        <span class="material-symbols-outlined text-[18px]">timeline</span>
        <span>FEED</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Activity Feed</h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant">Your personal learning history — every lesson, check-in, and achievement.</p>
    </section>

    <!-- Last 30 Days -->
    <section class="glass-card p-lg rounded-2xl mb-lg">
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md font-bold text-on-surface">Last 30 Days</h2>
        <span class="text-xs text-on-surface-variant">{{ totalActivities }} activities · {{ dateRange }}</span>
      </div>
      <div class="flex items-center justify-end gap-xs mb-sm">
        <div class="w-3 h-3 rounded-sm bg-surface-variant/40" />
        <span class="text-[10px] text-on-surface-variant mr-xs">None</span>
        <div class="w-3 h-3 rounded-sm bg-primary/30" />
        <span class="text-[10px] text-on-surface-variant mr-xs">Low</span>
        <div class="w-3 h-3 rounded-sm bg-primary/60" />
        <span class="text-[10px] text-on-surface-variant mr-xs">Mid</span>
        <div class="w-3 h-3 rounded-sm bg-primary/90" />
        <span class="text-[10px] text-on-surface-variant">High</span>
        <span class="text-[10px] text-on-surface-variant">More</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <div v-for="(day, i) in last30Days" :key="i"
          style="width: calc(10% - 4px)"
          class="flex flex-col items-center gap-[2px] p-1 rounded-md cursor-pointer shadow-sm transition-shadow hover:ring-1 hover:ring-primary"
          :class="[day.count > 0 ? 'bg-primary/10' : '', selectedDate === day.label ? 'ring-2 ring-primary' : '']"
          @click="selectDay(day)">
          <div class="w-full aspect-square rounded-sm"
            :class="day.count === 0 ? 'bg-surface-variant/40' : day.count <= 1 ? 'bg-primary/30' : day.count <= 3 ? 'bg-primary/60' : 'bg-primary/90'" />
          <span class="text-[8px] text-on-surface-variant">{{ day.label }}</span>
        </div>
      </div>
    </section>

    <!-- Selected Day Indicator -->
    <p v-if="selectedDate" class="text-sm font-bold text-on-surface mb-md">
      Activities on <span class="text-primary">{{ selectedDate }}</span>
    </p>

    <!-- Activity Timeline -->
    <section class="space-y-sm">
      <article v-for="(activity, i) in filteredFeed" :key="i" class="glass-card p-md rounded-2xl flex items-center gap-md">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          :class="activity.type === 'lesson' ? 'bg-primary/10' : activity.type === 'checkin' ? 'bg-secondary/10' : 'bg-tertiary/10'">
          <span class="material-symbols-outlined text-[16px]"
            :class="activity.type === 'lesson' ? 'text-primary' : activity.type === 'checkin' ? 'text-secondary' : 'text-tertiary'">{{ activity.icon }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-on-surface">{{ activity.title }}</p>
          <p class="text-xs text-on-surface-variant">{{ activity.detail }} · {{ formatTime(activity.created_at) }}</p>
        </div>
        <div class="text-right shrink-0">
          <span v-if="activity.xp" class="text-xs font-bold text-primary block">+{{ activity.xp }} XP</span>
          <span v-if="activity.coins" class="text-xs font-bold text-secondary block">+{{ activity.coins }} Coin</span>
        </div>
      </article>
      <!-- Empty Day Modal -->
      <Teleport to="body">
        <div v-if="showEmptyModal" class="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4" @click.self="showEmptyModal = false">
          <div class="w-full bg-white rounded-2xl shadow-xl p-xl text-center" style="max-width: 300px;">
            <div class="w-12 h-12 mx-auto mb-md rounded-2xl bg-surface-variant/50 flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px] text-on-surface-variant">info</span>
            </div>
            <h3 class="font-bold text-on-surface mb-xs">No Activity</h3>
            <p class="text-sm text-on-surface-variant mb-lg">No learning activity recorded on this day.</p>
            <button class="text-sm text-primary font-bold cursor-pointer" @click="showEmptyModal = false">Got it</button>
          </div>
        </div>
      </Teleport>

      <div v-if="filteredFeed.length === 0 && !loading && !selectedDate" class="text-center py-lg text-sm text-on-surface-variant">
        Click a colored day above to view your activity.
      </div>
      <div v-else-if="filteredFeed.length === 0 && !loading && selectedDate" class="text-center py-lg text-sm text-on-surface-variant">
        No activity on this day.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '../lib/api'

const today = new Date()
const thirtyDaysAgo = new Date(today)
thirtyDaysAgo.setDate(today.getDate() - 29)
const dateRange = `${thirtyDaysAgo.getMonth() + 1}/${thirtyDaysAgo.getDate()} - ${today.getMonth() + 1}/${today.getDate()}`

const selectedDate = ref('')
const showEmptyModal = ref(false)
const feedData = ref<{ type: string; title: string; detail: string; xp: number; coins: number; icon: string; created_at: string }[]>([])
const loading = ref(true)
const totalItems = ref(0)
const currentPage = ref(1)

const filteredFeed = computed(() => {
  if (!selectedDate.value) return []
  return feedData.value.filter(item => {
    const d = new Date(item.created_at)
    return `${d.getMonth() + 1}/${d.getDate()}` === selectedDate.value
  })
})

// Last 30 days (从 API 获取)
const last30Days = ref<{ label: string; count: number }[]>([])
const totalActivities = ref(0)

async function loadFeed(page: number) {
  try {
    const res = await api<{ data: { type: string; title: string; detail: string; xp: number; coins: number; icon: string; created_at: string }[]; total: number }>(`/api/feed?page=${page}&page_size=10`)
    if (page === 1) feedData.value = res.data
    else feedData.value = [...feedData.value, ...res.data]
    totalItems.value = res.total
    currentPage.value = page
  } catch {}
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${d.getMonth() + 1}/${d.getDate()}`
}

onMounted(async () => {
  await loadFeed(1)
  // 从 feedData 计算每天的活动数
  const counts: Record<string, number> = {}
  feedData.value.forEach(item => {
    const d = new Date(item.created_at)
    const key = `${d.getMonth() + 1}/${d.getDate()}`
    counts[key] = (counts[key] || 0) + 1
  })
  const days: { label: string; count: number }[] = []
  let total = 0
  for (let i = 0; i < 30; i++) {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    const label = `${d.getMonth() + 1}/${d.getDate()}`
    const c = counts[label] || 0
    days.push({ label, count: c })
    total += c
  }
  last30Days.value = days
  totalActivities.value = total
  loading.value = false
})

const allActivities: { date: string; type: string; icon: string; title: string; detail: string; time: string; xp: number; coins: number }[] = [
  // 6/27 — 今天
  { date: '6/27', type: 'achievement', icon: 'workspace_premium', title: 'Unlocked: Quick Learner', detail: 'Complete a lesson in 30s', time: '9:01 AM', xp: 0, coins: 30 },
  { date: '6/27', type: 'achievement', icon: 'workspace_premium', title: 'Unlocked: Perfect Score', detail: '100% accuracy on a lesson', time: '9:00 AM', xp: 0, coins: 50 },
  { date: '6/27', type: 'lesson', icon: 'stadia_controller', title: 'Conjugation: Present Tense', detail: 'English Verb Conjugation · 100% · 25s', time: '9:00 AM', xp: 100, coins: 18 },
  { date: '6/27', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 1 streak', time: '8:59 AM', xp: 0, coins: 0 },
  // 6/26
  { date: '6/26', type: 'lesson', icon: 'stadia_controller', title: 'Completed Greetings', detail: 'English Beginner · 80% · 45s', time: '2:30 PM', xp: 100, coins: 16 },
  { date: '6/26', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 1 streak', time: '2:31 PM', xp: 0, coins: 0 },
  { date: '6/26', type: 'achievement', icon: 'workspace_premium', title: 'Unlocked: First Steps', detail: 'Complete your first lesson', time: '2:31 PM', xp: 0, coins: 20 },
  // 6/25
  { date: '6/25', type: 'lesson', icon: 'stadia_controller', title: 'Completed Numbers & Colors', detail: 'English Beginner · 70% · 91s', time: '3:15 PM', xp: 80, coins: 14 },
  { date: '6/25', type: 'lesson', icon: 'stadia_controller', title: 'Completed Food & Drinks', detail: 'English Beginner · 100% · 120s', time: '4:00 PM', xp: 120, coins: 20 },
  { date: '6/25', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 2 streak', time: '4:01 PM', xp: 0, coins: 0 },
  // 6/24
  { date: '6/24', type: 'lesson', icon: 'stadia_controller', title: 'Completed Present Tense', detail: 'English Grammar · 25% · 75s', time: '11:20 AM', xp: 20, coins: 4 },
  { date: '6/24', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 1 streak', time: '11:21 AM', xp: 0, coins: 0 },
  // 6/22
  { date: '6/22', type: 'lesson', icon: 'stadia_controller', title: 'Completed Hiragana', detail: 'Japanese N5 · 90% · 50s', time: '9:00 AM', xp: 100, coins: 18 },
  { date: '6/22', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 5 streak', time: '9:01 AM', xp: 0, coins: 0 },
  { date: '6/22', type: 'achievement', icon: 'workspace_premium', title: 'Unlocked: Word Novice', detail: 'Answer 100 questions', time: '9:02 AM', xp: 0, coins: 30 },
]

function selectDay(day: { label: string; count: number }) {
  if (day.count === 0) {
    showEmptyModal.value = true
    return
  }
  selectedDate.value = day.label
  // 为该日期生成 mock 活动数据
  const existing = allActivities.filter(a => a.date === day.label)
  if (existing.length === 0) {
    const courses = [
      { course: 'English Beginner', lesson: 'Daily Routine', type: 'Learned', time: 65, acc: 80 },
      { course: 'English Beginner', lesson: 'Travel', type: 'Reviewed', time: 45, acc: 60 },
      { course: 'English Grammar', lesson: 'Present Tense', type: 'Retried', time: 90, acc: 70 },
      { course: 'Spanish Vocabulary', lesson: 'Saludos', type: 'Learned', time: 50, acc: 90 },
      { course: 'Japanese N5', lesson: 'Katakana', type: 'Learned', time: 120, acc: 85 },
      { course: 'English Conjugation', lesson: 'Past Tense', type: 'Retried', time: 70, acc: 50 },
    ]
    const pick = courses[Math.floor(Math.random() * courses.length)]
    allActivities.push({
      date: day.label,
      type: 'lesson',
      icon: 'stadia_controller',
      title: `Completed ${pick.lesson}`,
      detail: `${pick.course} · ${pick.acc}% · ${pick.time}s`,
      time: `${Math.floor(Math.random() * 8 + 8)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      xp: Math.floor(pick.acc * 1.2),
      coins: Math.floor(pick.acc * 0.2),
    })
  }
}
</script>
