<template>
  <div class="p-gutter max-w-7xl mx-auto px-4 md:px-gutter pb-lg">
    <!-- Header -->
    <section class="mb-lg">
      <div class="flex items-center gap-xs text-primary font-bold font-label-md mb-xs">
        <span class="material-symbols-outlined text-[18px]">edit_calendar</span>
        <span>CHECK-INS</span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Check-ins</h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant">Daily learning activities from you and other learners.</p>
      <p class="text-xs text-on-surface-variant/60 mt-sm flex items-center gap-xs">
        <span class="material-symbols-outlined text-[12px]">expand_more</span>
        Scroll down to load more check-ins
      </p>
    </section>

    <!-- Leaderboard -->
    <section class="glass-card p-lg rounded-2xl mb-lg">
      <div class="flex items-center justify-between mb-md">
        <h2 class="font-headline-md font-bold text-on-surface">🏆 Check-in Leaders</h2>
        <span class="text-xs text-on-surface-variant">All time</span>
      </div>
      <div v-if="leaders.length === 0" class="text-center py-md text-sm text-on-surface-variant">
        No check-ins yet. Be the first!
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div v-for="(leader, i) in leaders" :key="leader.nickname"
          class="flex items-center gap-md p-sm rounded-xl"
          :class="i === 0 ? 'bg-primary/5' : i === 1 ? 'bg-secondary/5' : 'bg-surface-variant/30'">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
            :class="i === 0 ? 'bg-primary text-white' : i === 1 ? 'bg-secondary text-white' : 'bg-surface-variant text-on-surface-variant'">
            {{ i + 1 }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-on-surface truncate">{{ leader.nickname }}</p>
            <p class="text-xs text-on-surface-variant">{{ leader.count }} check-ins</p>
          </div>
          <span v-if="i === 0" class="text-lg">👑</span>
          <span v-else-if="i === 1" class="text-lg">🥈</span>
          <span v-else class="text-lg">🥉</span>
        </div>
      </div>
    </section>

    <!-- Filter -->
    <section class="flex items-center mb-md">
      <div class="flex bg-surface-variant/50 rounded-xl p-[3px]">
        <button class="flex items-center gap-xs px-md py-sm rounded-lg font-bold text-label-sm transition-all cursor-pointer"
          :class="!showMyOnly ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'"
          @click="showMyOnly = false; loadPage(1, true)">
          <span class="material-symbols-outlined text-[14px]">public</span>
          All
        </button>
        <button class="flex items-center gap-xs px-md py-sm rounded-lg font-bold text-label-sm transition-all cursor-pointer"
          :class="showMyOnly ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'"
          @click="showMyOnly = true; loadPage(1, true)">
          <span class="material-symbols-outlined text-[14px]">person</span>
          Mine
        </button>
      </div>
    </section>

    <!-- Feed Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-md">
      <article v-for="(post, i) in filteredFeed" :key="i" class="glass-card p-md rounded-2xl flex flex-col">
        <!-- User -->
        <div class="flex items-center gap-sm mb-sm">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary text-xs font-bold">{{ (post.user.nickname || '?').charAt(0).toUpperCase() }}</div>
          <div class="min-w-0">
            <p class="text-xs font-bold text-on-surface truncate">{{ post.user.nickname }}</p>
            <p class="text-[10px] text-on-surface-variant">{{ formatTime(post.created_at) }}</p>
          </div>
        </div>
        <!-- Lesson + Type -->
        <div class="flex items-start justify-between gap-sm mb-sm">
          <div class="min-w-0">
            <p class="text-sm font-bold text-on-surface leading-tight">{{ post.lesson }}</p>
            <p class="text-[10px] text-on-surface-variant truncate">{{ post.course }}</p>
          </div>
          <span class="inline-flex items-center gap-[2px] text-[10px] font-bold px-sm py-[1px] rounded-full shrink-0"
            :class="post.type === 'learned' ? 'bg-primary/10 text-primary' : post.type === 'reviewed' ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'">
            <span class="material-symbols-outlined text-[10px]">{{ post.type === 'learned' ? 'auto_stories' : post.type === 'reviewed' ? 'refresh' : 'tune' }}</span>
            {{ post.type === 'learned' ? 'Learned' : post.type === 'reviewed' ? 'Reviewed' : 'Retried' }}
          </span>
        </div>
        <!-- Stats -->
        <div class="flex items-center gap-sm mb-sm">
          <span class="text-[10px] text-on-surface-variant">{{ post.time }}s</span>
          <span class="text-[10px] font-bold"
            :class="post.accuracy >= 80 ? 'text-primary' : post.accuracy >= 50 ? 'text-secondary' : 'text-error'">{{ post.accuracy }}%</span>
          <span v-if="post.xp" class="text-[10px] font-bold text-primary">+{{ post.xp }}XP</span>
          <span v-if="post.coins" class="text-[10px] font-bold text-secondary">+{{ post.coins }}Coin</span>
        </div>
        <!-- Cheer -->
        <button class="flex items-center gap-[3px] text-[10px] font-bold mt-auto transition-colors cursor-pointer self-start"
          :class="post.cheered ? 'text-error' : 'text-on-surface-variant hover:text-error'"
          @click="toggleCheer(post, $event)">
          <span class="material-symbols-outlined text-[14px]" :class="post.cheered ? 'filled' : ''">local_fire_department</span>
          {{ post.cheer_count }}
        </button>
      </article>
    </section>

    <!-- Infinite Scroll -->
    <div v-if="loadingMore" class="text-center py-sm text-xs text-on-surface-variant flex items-center justify-center gap-xs">
      <span class="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      Loading...
    </div>
    <div v-if="!allLoaded && !loadingMore" ref="sentinelRef" class="text-center py-lg text-xs text-on-surface-variant flex items-center justify-center gap-xs">
      <span class="material-symbols-outlined text-[14px]">expand_more</span>
      Scroll for more
    </div>
    <div v-if="allLoaded" class="text-center text-xs text-on-surface-variant pb-lg">You've reached the end</div>

    <!-- Login Prompt Modal -->
    <Teleport to="body">
      <div v-if="showLoginPrompt" class="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4" @click.self="showLoginPrompt = false">
        <div class="w-full bg-white rounded-2xl shadow-xl p-xl text-center" style="max-width: 360px;">
          <div class="w-14 h-14 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[30px] text-primary filled">local_fire_department</span>
          </div>
          <h3 class="font-headline-md font-bold text-on-surface mb-xs">Sign in to cheer</h3>
          <p class="text-sm text-on-surface-variant mb-lg">Create an account or sign in to cheer on other learners and interact with the community.</p>
          <div class="flex flex-col gap-sm">
            <router-link to="/login" class="block w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-sm rounded-xl transition-all text-center" @click="showLoginPrompt = false">Sign In</router-link>
            <router-link to="/register" class="block w-full text-primary font-bold py-sm rounded-xl transition-all text-center hover:bg-primary/5" @click="showLoginPrompt = false">Create Account</router-link>
            <button class="text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" @click="showLoginPrompt = false">Cancel</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Empty State -->
    <section v-if="filteredFeed.length === 0" class="text-center py-xl">
      <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
        <span class="material-symbols-outlined text-[36px] text-primary">edit_calendar</span>
      </div>
      <h2 class="font-headline-md font-bold text-on-surface mb-xs">No check-ins yet</h2>
      <p class="text-sm text-on-surface-variant">Complete a lesson to share your learning activity.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { api } from '../lib/api'
import confetti from 'canvas-confetti'

interface CheckIn {
  id: string
  user: { nickname: string; avatar: string }
  lesson: string
  course: string
  type: 'learned' | 'reviewed' | 'retried'
  accuracy: number
  time: number
  xp: number
  coins: number
  cheer_count: number
  cheered: boolean
  created_at: string
}

const { user } = useAuth()
const showLoginPrompt = ref(false)
const showMyOnly = ref(false)
const sentinelRef = ref<HTMLDivElement | null>(null)
let observer: IntersectionObserver | null = null
const loadingMore = ref(false)

const feed = ref<CheckIn[]>([])
const leaders = ref<{ nickname: string; count: number }[]>([])
const currentPage = ref(1)
const totalItems = ref(0)
const allLoaded = computed(() => feed.value.length >= totalItems.value && totalItems.value > 0)

async function loadPage(page: number, reset = false) {
  if (loadingMore.value) return
  loadingMore.value = true
  if (reset) feed.value = []
  try {
    const params = `page=${page}&page_size=4${showMyOnly.value ? '&mine=true' : ''}`
    const res = await api<{ data: CheckIn[]; total: number; page: number; page_size: number }>(
      `/api/checkins?${params}`
    )
    if (page === 1) {
      feed.value = res.data
    } else {
      feed.value = [...feed.value, ...res.data]
    }
    totalItems.value = res.total
    currentPage.value = page
  } catch {
    // silently fail
  } finally {
    loadingMore.value = false
  }
}

const filteredFeed = computed(() => {
  if (!showMyOnly.value) return feed.value
  return feed.value.filter(p => p.user.nickname === (user.value?.nickname || ''))
})

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
  await loadPage(1)
  try {
    const data = await api<{ nickname: string; count: number }[]>('/api/checkins/leaders?mode=all')
    leaders.value = data
  } catch {}  // silently fail
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !allLoaded.value && !loadingMore.value) {
      loadPage(currentPage.value + 1)
    }
  }, { threshold: 0.1 })
  if (sentinelRef.value) observer.observe(sentinelRef.value)
})

onUnmounted(() => observer?.disconnect())

async function toggleCheer(post: CheckIn, event?: MouseEvent) {
  if (!post.id) return
  if (user.value && post.user.nickname === user.value.nickname) return
  // 在 await 前捕获按钮位置
  let rect: DOMRect | null = null
  if (event) {
    rect = (event.currentTarget as HTMLElement)?.getBoundingClientRect() || null
  }
  const prev = { cheered: post.cheered, count: post.cheer_count }
  post.cheered = !post.cheered
  post.cheer_count += post.cheered ? 1 : -1

  try {
    const res = await api<{ cheered: boolean; cheer_count: number }>(`/api/checkins/${post.id}/cheer`, { method: 'POST' })
    post.cheered = res.cheered
    post.cheer_count = res.cheer_count
    if (res.cheered && rect) {
      confetti({
        particleCount: 8,
        spread: 25,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
        colors: ['#f59e0b', '#ef4444', '#f97316'],
      })
    }
  } catch {
    post.cheered = prev.cheered
    post.cheer_count = prev.count
  }
}
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
</style>
