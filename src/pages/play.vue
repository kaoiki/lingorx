<template>
  <div class="flex flex-col bg-surface overflow-hidden" style="height: calc(100vh - 64px); margin-top: -4rem; padding-top: 4rem;">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-gutter py-sm bg-white border-b border-outline-variant shrink-0">
      <button class="flex items-center gap-xs text-on-surface-variant hover:text-error text-sm transition-colors cursor-pointer" @click="showQuit = true">
        <span class="material-symbols-outlined text-[18px]">close</span>
        Exit
      </button>
      <div class="text-center">
        <p class="font-bold text-on-surface text-sm">{{ lessonTitle }}</p>
        <p class="text-label-sm text-on-surface-variant">{{ currentIndex + 1 }} / {{ units.length }}</p>
      </div>
      <div class="flex items-center gap-sm">
        <button
          class="flex items-center justify-center w-8 h-8 rounded-xl text-sm transition-colors cursor-pointer"
          :class="showHints ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant'"
          @click="toggleHints"
          :title="showHints ? 'Hide hints' : 'Show hints'"
        >
          <span class="material-symbols-outlined text-[18px]">lightbulb</span>
        </button>
      </div>
    </div>

    <!-- Game area -->
    <div class="flex-1 flex flex-col items-center justify-center px-gutter gap-8 overflow-hidden" v-show="started && !finished">
      <!-- Monster -->
      <div class="text-center">
        <div class="text-5xl" :class="{ 'animate-shake': shaking }">👾</div>
        <div class="w-48 h-3 bg-surface-variant rounded-full overflow-hidden">
          <div class="h-full bg-error rounded-full transition-all duration-300" :style="{ width: hp + '%' }" />
        </div>
        <p class="text-label-sm font-bold text-error mt-xs">HP {{ Math.round(hp) }}%</p>
      </div>

      <!-- Question -->
      <div v-if="currentUnit" class="w-full glass-card p-lg rounded-2xl text-center" style="max-width: 640px;">
        <p class="text-label-sm font-bold text-on-surface-variant mb-xs uppercase tracking-widest">
          {{ currentUnit.type === 'vocabulary' ? 'Type the word' : currentUnit.type === 'translation' ? 'Translate the sentence' : 'Fill in the blank' }}
        </p>
        <p class="font-headline-md text-headline-md text-on-surface font-bold">{{ currentUnit.prompt }}</p>
        <!-- Hint: show candidate words -->
        <div v-if="currentUnit.options && showHints" class="mt-sm flex flex-wrap justify-center gap-sm">
          <span v-for="opt in currentUnit.options" :key="opt"
            class="px-md py-xs rounded-lg bg-surface-variant text-on-surface-variant text-sm font-bold">
            {{ opt }}
          </span>
        </div>
        <!-- No hint: prompt to enable -->
        <p v-if="currentUnit.options && !showHints" class="mt-sm text-xs text-primary flex items-center justify-center gap-xs">
          Tap the <span class="material-symbols-outlined text-[12px] align-middle">lightbulb</span> in the top-right to show word hints
        </p>
        <p v-if="currentUnit.type === 'grammar' && currentUnit.options" class="flex flex-wrap justify-center gap-sm mt-md">
          <button v-for="opt in currentUnit.options" :key="opt"
            class="px-md py-xs rounded-xl border border-outline-variant text-on-surface font-bold text-sm hover:bg-surface-variant transition-colors cursor-pointer"
            :class="selectedOption === opt ? 'border-primary bg-primary/10' : ''"
            @click="selectedOption = opt">
            {{ opt }}
          </button>
        </p>
        <div v-if="showResult" class="mt-md" :class="lastCorrect ? 'text-primary' : 'text-error'">
          <p class="font-bold text-sm">{{ lastCorrect ? '✅ Correct!' : '❌ ' + currentUnit.answer }}</p>
        </div>
      </div>

      <!-- Input -->
      <div v-if="currentUnit && currentUnit.type !== 'grammar'" class="w-full" style="max-width: 640px;">
        <input
          ref="inputRef"
          v-model="userInput"
          type="text"
          placeholder="Type your answer…"
          class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          :disabled="waiting"
          @keydown.enter.prevent="submitAnswer"
        />
      </div>
      <div v-else class="w-full max-w-xl">
        <button
          class="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold py-sm rounded-xl transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          :disabled="!selectedOption || waiting"
          @click="submitAnswer">
          {{ waiting ? '…' : 'Confirm' }}
        </button>
      </div>

      <!-- Stats -->
      <div class="flex items-center gap-lg text-label-sm font-bold">
        <span class="text-primary flex items-center gap-[3px]"><span class="material-symbols-outlined text-[14px]">check_circle</span> {{ correctCount }}</span>
        <span class="text-error flex items-center gap-[3px]"><span class="material-symbols-outlined text-[14px]">cancel</span> {{ wrongCount }}</span>
        <span class="text-secondary flex items-center gap-[3px]"><span class="material-symbols-outlined text-[14px]">stars</span> {{ accuracy }}%</span>
      </div>
    </div>

    <!-- Lesson Start Modal -->
    <Teleport to="body">
      <div v-if="showStartPrompt" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4" @click.self="showStartPrompt = false">
        <div class="w-full bg-white rounded-2xl shadow-xl p-xl text-center" style="max-width: 440px;">
          <div class="w-20 h-20 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[48px] text-primary">stadia_controller</span>
          </div>
          <h3 class="font-headline-md font-bold text-on-surface mb-xs">{{ lessonTitle }}</h3>
          <p class="text-on-surface-variant text-sm mb-md">{{ units.length }} questions · {{ lessonType }}</p>
          <p class="text-on-surface-variant text-sm mb-lg">Type the correct answer for each word. Defeat the monster by answering correctly!</p>
          <button class="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-sm rounded-xl transition-all shadow-sm cursor-pointer" @click="startBattle">Start Battle</button>
        </div>
      </div>
    </Teleport>

    <!-- Result Modal -->
    <Teleport to="body">
      <div v-if="finished" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
        <div class="w-full bg-white rounded-2xl shadow-xl p-xl text-center" style="max-width: 440px;">
          <div class="w-20 h-20 mx-auto mb-md rounded-2xl bg-primary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[48px] text-primary">stadia_controller</span>
          </div>
          <h3 class="font-headline-md font-bold text-on-surface mb-xs">Battle Complete!</h3>
          <div class="flex justify-center gap-lg mb-lg text-sm">
            <div><p class="font-headline-md text-headline-md text-primary">{{ correctCount }}</p><p class="text-label-sm font-bold text-on-surface-variant flex items-center justify-center gap-xs"><span class="material-symbols-outlined text-[14px]">check_circle</span> Correct</p></div>
            <div><p class="font-headline-md text-headline-md text-error">{{ wrongCount }}</p><p class="text-label-sm font-bold text-on-surface-variant flex items-center justify-center gap-xs"><span class="material-symbols-outlined text-[14px]">cancel</span> Wrong</p></div>
            <div><p class="font-headline-md text-headline-md text-secondary">{{ accuracy }}%</p><p class="text-label-sm font-bold text-on-surface-variant flex items-center justify-center gap-xs"><span class="material-symbols-outlined text-[14px]">stars</span> Accuracy</p></div>
          </div>
          <p class="text-label-sm font-bold text-on-surface-variant mb-lg">Accuracy: {{ accuracy }}%</p>
          <router-link to="/courses" class="block w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-sm rounded-xl transition-all text-center">Back to Courses</router-link>
        </div>
      </div>
    </Teleport>

    <!-- Quit Confirm -->
    <Teleport to="body">
      <div v-if="showQuit" class="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4" @click.self="showQuit = false">
        <div class="w-full bg-white rounded-2xl shadow-xl p-xl text-center" style="max-width: 400px;">
          <div class="w-16 h-16 mx-auto mb-md rounded-2xl bg-error/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[36px] text-error">logout</span>
          </div>
          <h3 class="font-headline-md font-bold text-on-surface mb-xs">Quit battle?</h3>
          <p class="text-on-surface-variant text-sm mb-lg">Your progress will not be saved.</p>
          <div class="flex flex-col gap-sm">
            <button class="w-full bg-error hover:bg-error/90 text-on-error font-bold py-sm rounded-xl transition-all cursor-pointer" @click="quitBattle">Yes, quit</button>
            <button class="w-full text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" @click="showQuit = false">Continue playing</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const lessonId = route.params.lessonId as string
const lessonTitle = ref('')
const units = ref<Unit[]>([])

interface Unit {
  type: 'vocabulary' | 'grammar' | 'translation'
  prompt: string
  answer: string
  options?: string[]
  hint?: string
}

const currentIndex = ref(0)
const correctCount = ref(0)
const wrongCount = ref(0)
const score = ref(0)
const hp = ref(100)
const shaking = ref(false)
const userInput = ref('')
const selectedOption = ref('')
const showResult = ref(false)
const lastCorrect = ref(false)
const waiting = ref(false)
const finished = ref(false)
const showQuit = ref(false)
const showStartPrompt = ref(true)
const started = ref(false)
const showHints = ref(localStorage.getItem('lingorx_show_hints') !== 'false')
const inputRef = ref<HTMLInputElement | null>(null)

const currentUnit = computed(() => units.value[currentIndex.value])

const lessonType = computed(() => {
  const types = [...new Set(units.value.map(u => u.type))]
  return types.join(', ')
})

const accuracy = computed(() => {
  const total = correctCount.value + wrongCount.value
  if (total === 0) return 0
  return Math.round((correctCount.value / total) * 100)
})

function submitAnswer() {
  if (waiting.value) return
  const answer = currentUnit.value.type === 'grammar' ? selectedOption.value : userInput.value.trim()
  if (!answer) return

  const correct = answer.toLowerCase() === currentUnit.value.answer.toLowerCase()
  lastCorrect.value = correct

  if (correct) {
    correctCount.value++
    score.value += 10
    hp.value = Math.max(0, hp.value - 100 / units.value.length)
    shaking.value = true
    import('canvas-confetti').then(m => {
      m.default({ particleCount: 20, spread: 60, origin: { y: 0.5 } })
    })
    setTimeout(() => { shaking.value = false }, 400)
  } else {
    wrongCount.value++
  }

  showResult.value = true
  waiting.value = true

  setTimeout(() => {
    showResult.value = false
    waiting.value = false
    userInput.value = ''
    selectedOption.value = ''

    if (hp.value <= 0 || currentIndex.value >= units.value.length - 1) {
      finishBattle()
    } else {
      currentIndex.value++
      nextTick(() => inputRef.value?.focus())
    }
  }, 1500)
}

function toggleHints() {
  showHints.value = !showHints.value
  localStorage.setItem('lingorx_show_hints', String(showHints.value))
}

function startBattle() {
  showStartPrompt.value = false
  started.value = true
}

function finishBattle() {
  finished.value = true
  showQuit.value = false
  import('canvas-confetti').then(m => {
    m.default({ particleCount: 100, spread: 80, origin: { y: 0.6 } })
  })
}

function quitBattle() {
  showQuit.value = false
  // navigate back to the course detail page
  window.history.back()
}

onMounted(async () => {
  try {
    const resp = await fetch(`/lessons/${lessonId}.json`)
    const data = await resp.json()

    lessonTitle.value = data.title
    units.value = data.shuffle
      ? [...data.units].sort(() => Math.random() - 0.5)
      : data.units
  } catch (e) {
    console.warn('Failed to load lesson data:', e)
    // Fallback mock
    lessonTitle.value = 'Daily Objects'
    units.value = [
      { type: 'vocabulary' as const, prompt: 'apple', answer: '苹果' },
      { type: 'vocabulary' as const, prompt: 'book', answer: '书' },
    ]
  }
  nextTick(() => inputRef.value?.focus())
})
</script>

<style scoped>
.animate-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
</style>
