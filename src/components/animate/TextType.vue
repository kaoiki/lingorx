<template>
  <component
    :is="as"
    ref="containerRef"
    :class="`inline-block whitespace-pre-wrap tracking-tight ${className}`"
  >
    <span class="inline" :style="{ color: currentTextColor }">{{ displayedText }}</span>
    <span
      v-if="showCursor"
      ref="cursorRef"
      :class="`ml-1 inline-block ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName} cursor-blink`"
    >{{ cursorCharacter }}</span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  text: string | string[]
  as?: string
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: string
  cursorClassName?: string
  cursorBlinkDuration?: number
  textColors?: string[]
  variableSpeed?: { min: number; max: number }
  startOnVisible?: boolean
  reverseMode?: boolean
}>(), {
  as: 'div',
  typingSpeed: 50,
  initialDelay: 0,
  pauseDuration: 2000,
  deletingSpeed: 30,
  loop: true,
  className: '',
  showCursor: true,
  hideCursorWhileTyping: false,
  cursorCharacter: '|',
  cursorClassName: '',
  cursorBlinkDuration: 0.5,
  textColors: () => [],
  startOnVisible: false,
  reverseMode: false,
})

const emit = defineEmits<{
  sentenceComplete: [sentence: string, index: number]
}>()

const displayedText = ref('')
const currentCharIndex = ref(0)
const isDeleting = ref(false)
const currentTextIndex = ref(0)
const isVisible = ref(!props.startOnVisible)

const containerRef = ref<HTMLElement | null>(null)
const cursorRef = ref<HTMLElement | null>(null)

const textArray = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))

const currentTextColor = computed(() => {
  if (props.textColors.length === 0) return 'inherit'
  return props.textColors[currentTextIndex.value % props.textColors.length]
})

const shouldHideCursor = computed(() => {
  if (!props.hideCursorWhileTyping) return false
  return currentCharIndex.value < textArray.value[currentTextIndex.value].length || isDeleting.value
})

function getRandomSpeed() {
  if (!props.variableSpeed) return props.typingSpeed
  const { min, max } = props.variableSpeed
  return Math.random() * (max - min) + min
}

// IntersectionObserver for startOnVisible
onMounted(() => {
  // Reference cursorRef so TypeScript recognizes it as used
  if (cursorRef.value) { /* cursor element available */ }
  if (props.startOnVisible && containerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.value)
    onUnmounted(() => observer.disconnect())
  }
})

// Typing animation loop
let typingTimer: ReturnType<typeof setTimeout> | null = null

function clearTypingTimer() {
  if (typingTimer !== null) {
    clearTimeout(typingTimer)
    typingTimer = null
  }
}

function scheduleTyping(fn: () => void, delay: number) {
  clearTypingTimer()
  typingTimer = setTimeout(fn, delay)
}

watch(
  [isVisible, currentCharIndex, displayedText, isDeleting, currentTextIndex],
  () => {
    if (!isVisible.value) return

    const currentText = textArray.value[currentTextIndex.value]
    const processedText = props.reverseMode
      ? currentText.split('').reverse().join('')
      : currentText

    if (isDeleting.value) {
      if (displayedText.value === '') {
        isDeleting.value = false

        if (currentTextIndex.value === textArray.value.length - 1 && !props.loop) {
          return
        }

        emit('sentenceComplete', textArray.value[currentTextIndex.value], currentTextIndex.value)

        currentTextIndex.value = (currentTextIndex.value + 1) % textArray.value.length
        currentCharIndex.value = 0
      } else {
        scheduleTyping(() => {
          displayedText.value = displayedText.value.slice(0, -1)
        }, props.deletingSpeed)
      }
    } else {
      // Initial delay before first character
      if (currentCharIndex.value === 0 && displayedText.value === '' && props.initialDelay > 0) {
        scheduleTyping(() => {
          // dummy tick to re-trigger watch after delay
          currentCharIndex.value = 0
        }, props.initialDelay)
        return
      }

      if (currentCharIndex.value < processedText.length) {
        const speed = props.variableSpeed ? getRandomSpeed() : props.typingSpeed
        scheduleTyping(() => {
          displayedText.value = displayedText.value + processedText[currentCharIndex.value]
          currentCharIndex.value++
        }, speed)
      } else if (textArray.value.length >= 1) {
        if (!props.loop && currentTextIndex.value === textArray.value.length - 1) return
        scheduleTyping(() => {
          isDeleting.value = true
        }, props.pauseDuration)
      }
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  clearTypingTimer()
})
</script>

<style scoped>
.cursor-blink {
  animation: blink v-bind('props.cursorBlinkDuration + "s"') infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
