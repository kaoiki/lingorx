<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-gutter py-xs shadow-sm">
    <div class="flex items-center gap-xl">
      <router-link to="/" class="flex items-center gap-sm font-headline-lg font-extrabold text-primary cursor-pointer text-[24px]">
        <span class="material-symbols-outlined text-primary translate-y-[1px]" style="font-size: 28px; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 28;">auto_stories</span>
        LingoRx
      </router-link>
      <nav ref="navRef" class="relative hidden md:flex items-center gap-lg">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :ref="(el) => setLinkRef(item.to, el)"
          :to="item.to"
          class="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-200 pb-1 px-0"
          @click="updateIndicator"
        >{{ item.label }}</router-link>
        <span
          class="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ease-in-out"
          :style="indicatorStyle"
        />
      </nav>
    </div>
    <div class="flex items-center gap-md">
      <div class="relative">
        <button
          id="avatarBtn"
          class="w-10 h-10 rounded-full border-2 border-primary overflow-hidden flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
          aria-label="User menu"
          @click="toggleDropdown"
        >
          <span class="material-symbols-outlined text-[24px] text-primary">account_circle</span>
        </button>
        <!-- Dropdown -->
        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-outline-variant py-2 z-50"
        >
          <div class="px-4 py-3 border-b border-outline-variant">
            <p class="font-headline-md text-sm font-bold text-on-surface">Alex Chen</p>
            <p class="text-on-surface-variant text-xs">alex@example.com</p>
          </div>
          <div class="py-1">
            <a
              class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              href="#"
            >
              <span class="material-symbols-outlined text-[20px] text-on-surface-variant">person</span>
              <span>Profile</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              href="#"
            >
              <span class="material-symbols-outlined text-[20px] text-on-surface-variant">settings</span>
              <span>Settings</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              href="#"
            >
              <span class="material-symbols-outlined text-[20px] text-on-surface-variant">bar_chart</span>
              <span>Statistics</span>
            </a>
          </div>
          <div class="border-t border-outline-variant py-1">
            <button
              class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-error text-sm"
            >
              <span class="material-symbols-outlined text-[20px]">logout</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/courses', label: 'Courses' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/community', label: 'Community' },
]

const navRef = ref<HTMLElement | null>(null)
const linkRefs = ref<Record<string, HTMLElement | null>>({})
const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

function setLinkRef(to: string, el: any) {
  if (el) {
    linkRefs.value[to] = el.$el || el
  }
}

function updateIndicator() {
  nextTick(() => {
    const activeItem = navItems.find((item) => {
      if (item.to === '/') return route.path === '/'
      return route.path.startsWith(item.to)
    })
    if (!activeItem || !navRef.value) return

    const linkEl = linkRefs.value[activeItem.to]
    if (!linkEl) return

    const navRect = navRef.value.getBoundingClientRect()
    const linkRect = linkEl.getBoundingClientRect()

    indicatorLeft.value = linkRect.left - navRect.left
    indicatorWidth.value = linkRect.width
  })
}

const indicatorStyle = computed(() => ({
  transform: `translateX(${indicatorLeft.value}px)`,
  width: `${indicatorWidth.value}px`,
}))

watch(() => route.path, updateIndicator)

onMounted(() => {
  updateIndicator()
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdown(e: MouseEvent) {
  const btn = document.getElementById('avatarBtn')
  if (btn && !btn.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}
</script>
