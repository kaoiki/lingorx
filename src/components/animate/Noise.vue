<template>
  <canvas
    ref="canvasRef"
    :class="[contained ? 'absolute inset-0 w-full h-full' : 'fixed inset-0 w-full h-full', 'pointer-events-none']"
    :style="{ opacity, zIndex }"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  opacity?: number
  zIndex?: number
  grainSize?: number
  fps?: number
  contained?: boolean
}>(), {
  opacity: 0.15,
  zIndex: 100,
  grainSize: 2,
  fps: 6,
  contained: false,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let lastTime = 0

function generateNoise(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const imageData = ctx.createImageData(w, h)
  const data = imageData.data
  const grain = props.grainSize

  for (let y = 0; y < h; y += grain) {
    for (let x = 0; x < w; x += grain) {
      const brightness = Math.random() * 255
      const alpha = Math.random() * 80 + 40  // semi-transparent
      for (let dy = 0; dy < grain && y + dy < h; dy++) {
        for (let dx = 0; dx < grain && x + dx < w; dx++) {
          const idx = ((y + dy) * w + (x + dx)) * 4
          data[idx] = brightness     // R
          data[idx + 1] = brightness // G
          data[idx + 2] = brightness // B
          data[idx + 3] = alpha      // A
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

function animate(time: number) {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const elapsed = time - lastTime
  const interval = 1000 / props.fps

  if (elapsed >= interval) {
    generateNoise(ctx, canvas.width, canvas.height)
    lastTime = time - (elapsed % interval)
  }

  animationId = requestAnimationFrame(animate)
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  lastTime = performance.now()
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
})
</script>
