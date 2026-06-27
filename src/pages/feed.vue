<template>
  <div class="p-gutter max-w-5xl mx-auto px-4 md:px-gutter pb-lg">
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
        <span class="text-xs text-on-surface-variant">{{ totalActivities }} activities</span>
      </div>
      <div class="flex items-center justify-end gap-xs mb-sm">
        <span class="text-[10px] text-on-surface-variant">Less</span>
        <div class="w-3 h-3 rounded-sm bg-surface-variant/40" />
        <div class="w-3 h-3 rounded-sm bg-primary/40" />
        <div class="w-3 h-3 rounded-sm bg-primary/60" />
        <div class="w-3 h-3 rounded-sm bg-primary/80" />
        <span class="text-[10px] text-on-surface-variant">More</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <div v-for="(day, i) in last30Days" :key="i"
          class="flex flex-col items-center gap-[2px] p-1 rounded-md"
          style="width: calc(10% - 4px)"
          :class="[day.count > 0 ? 'bg-primary/10 hover:bg-primary/20' : 'hover:bg-surface-variant/50', selectedDate === day.label ? 'ring-2 ring-primary' : '']"
          @click="selectDay(day)">
          <div class="w-full aspect-square rounded-sm"
            :class="day.count === 0 ? 'bg-surface-variant/40' : day.count <= 2 ? 'bg-primary/40' : day.count <= 5 ? 'bg-primary/60' : 'bg-primary/80'" />
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
      <article v-for="(activity, i) in filteredActivities" :key="i" class="glass-card p-md rounded-2xl flex items-center gap-md">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          :class="activity.type === 'lesson' ? 'bg-primary/10' : activity.type === 'checkin' ? 'bg-secondary/10' : 'bg-tertiary/10'">
          <span class="material-symbols-outlined text-[16px]"
            :class="activity.type === 'lesson' ? 'text-primary' : activity.type === 'checkin' ? 'text-secondary' : 'text-tertiary'">{{ activity.icon }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-on-surface">{{ activity.title }}</p>
          <p class="text-xs text-on-surface-variant">{{ activity.detail }} · {{ activity.time }}</p>
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

      <div v-if="filteredActivities.length === 0 && !selectedDate" class="text-center py-lg text-sm text-on-surface-variant">
        Click a day on the chart above to see your activity.
      </div>
      <div v-else-if="filteredActivities.length === 0" class="text-center py-lg text-sm text-on-surface-variant">
        No activity on this day.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedDate = ref('')
const showEmptyModal = ref(false)

// Last 30 days mock data
const last30Days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (29 - i))
  return {
    label: `${d.getMonth() + 1}/${d.getDate()}`,
    count: Math.random() > 0.4 ? Math.floor(Math.random() * 10) : 0,
  }
})
const totalActivities = computed(() => last30Days.reduce((s, d) => s + d.count, 0))

const allActivities: { date: string; type: string; icon: string; title: string; detail: string; time: string; xp: number; coins: number }[] = [
  { date: '6/25', type: 'lesson', icon: 'stadia_controller', title: 'Completed Greetings', detail: 'English Beginner · 80% · 45s', time: '10:30 AM', xp: 100, coins: 16 },
  { date: '6/25', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 7 streak', time: '10:31 AM', xp: 0, coins: 0 },
  { date: '6/25', type: 'achievement', icon: 'workspace_premium', title: 'Unlocked: First Steps', detail: 'Complete your first lesson', time: '10:31 AM', xp: 0, coins: 0 },
  { date: '6/24', type: 'lesson', icon: 'stadia_controller', title: 'Completed Numbers & Colors', detail: 'English Beginner · 70% · 91s', time: '3:15 PM', xp: 80, coins: 14 },
  { date: '6/24', type: 'lesson', icon: 'stadia_controller', title: 'Completed Food & Drinks', detail: 'English Beginner · 100% · 120s', time: '4:00 PM', xp: 120, coins: 20 },
  { date: '6/23', type: 'lesson', icon: 'stadia_controller', title: 'Completed Present Tense', detail: 'English Grammar · 25% · 75s', time: '11:20 AM', xp: 20, coins: 4 },
  { date: '6/23', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 4 streak', time: '11:21 AM', xp: 0, coins: 0 },
  { date: '6/22', type: 'lesson', icon: 'stadia_controller', title: 'Completed Present Tense', detail: 'English Grammar · 60% · 60s', time: '2:00 PM', xp: 0, coins: 0 },
  { date: '6/21', type: 'lesson', icon: 'stadia_controller', title: 'Completed Hiragana', detail: 'Japanese N5 · 90% · 50s', time: '9:00 AM', xp: 100, coins: 18 },
  { date: '6/21', type: 'checkin', icon: 'edit_calendar', title: 'Daily check-in', detail: 'Day 2 streak', time: '9:01 AM', xp: 0, coins: 0 },
]

const filteredActivities = computed(() =>
  allActivities.filter(a => a.date === selectedDate.value)
)

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
