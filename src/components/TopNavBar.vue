<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-gutter py-xs shadow-sm">
    <div class="flex items-center gap-xl">
      <div class="flex flex-col items-start">
        <router-link to="/" class="flex items-center gap-sm font-headline-lg font-extrabold text-primary cursor-pointer text-[24px]">
          <span class="material-symbols-outlined text-primary translate-y-[1px]" style="font-size: 28px; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 28;">auto_stories</span>
          LingoRx
        </router-link>
        <TextType :text="['Remember, Don\'t Just Learn.', 'Remember, Don\'t Just Learn.']" :typing-speed="40" :deleting-speed="20" :pause-duration="4000" :show-cursor="false" :loop="true" class="hidden sm:inline text-[10px] text-primary font-bold leading-none ml-1" :as="'span'" />
      </div>
      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-lg">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-all duration-200 pb-1 px-0 flex items-center gap-xs"
          :exact-active-class="item.to === '/' ? 'text-primary font-bold border-b-2 border-primary' : ''"
          :active-class="item.to !== '/' ? 'text-primary font-bold border-b-2 border-primary' : ''"
        >
          <span class="material-symbols-outlined text-[12px]">{{ item.icon }}</span>
          {{ item.label }}
          <span
            v-if="item.badge"
            class="text-[10px] font-bold text-on-primary bg-secondary px-1.5 py-0.5 rounded-full ml-0.5"
          >{{ item.badge }}</span>
        </router-link>
      </nav>
    </div>
    <div class="flex items-center gap-sm">
      <!-- Mobile hamburger -->
      <button class="md:hidden flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-primary transition-colors" @click="mobileMenuOpen = !mobileMenuOpen">
        <span class="material-symbols-outlined text-[24px]">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
      </button>
      <div class="relative">
        <button
          id="avatarBtn"
          class="w-10 h-10 rounded-full border-2 border-primary overflow-hidden flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
          aria-label="User menu"
          @click="toggleDropdown"
        >
          <span class="material-symbols-outlined text-[24px]" :class="isLoggedIn ? 'text-primary' : 'text-on-surface-variant'">{{ isLoggedIn ? 'account_circle' : 'person' }}</span>
        </button>
        <!-- Dropdown -->
        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-outline-variant py-2 z-50"
        >
          <!-- Logged in -->
          <template v-if="isLoggedIn">
            <div class="px-4 py-3 border-b border-outline-variant">
              <p class="font-headline-md text-sm font-bold text-on-surface">{{ user?.nickname || 'User' }}</p>
              <p class="text-on-surface-variant text-xs">{{ user?.email || '' }}</p>
            </div>
            <div class="py-1">
              <router-link
                to="/my-courses"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-on-surface-variant">menu_book</span>
                <span>My Courses</span>
              </router-link>

              <router-link
                to="/reports"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-on-surface-variant">assignment</span>
                <span>Assessment Report</span>
                <span class="text-[9px] font-bold bg-secondary/10 text-secondary px-1.5 py-0.5 rounded ml-auto shrink-0">Soon</span>
              </router-link>
              <router-link
                to="/settings"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-on-surface-variant">settings</span>
                <span>Settings</span>
              </router-link>
              <router-link
                to="/stats"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-on-surface-variant">bar_chart</span>
                <span>Statistics</span>
              </router-link>
            </div>
            <div class="border-t border-outline-variant py-1">
              <button
                class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-error text-sm"
                @click="logout(); dropdownOpen = false; showToast('Signed out')"
              >
                <span class="material-symbols-outlined text-[20px]">logout</span>
                <span>Log Out</span>
              </button>
            </div>
          </template>
          <!-- Logged out -->
          <template v-else>
            <div class="py-1">
              <router-link
                to="/login"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-on-surface-variant">login</span>
                <span>Sign In</span>
              </router-link>
              <router-link
                to="/register"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-variant transition-colors text-on-surface text-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-on-surface-variant">person_add</span>
                <span>Create Account</span>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- Mobile nav panel -->
    <Transition name="mobile-nav">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-sm py-md px-gutter flex flex-col gap-xs"
      >
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-md px-md py-sm rounded-xl text-on-surface-variant font-medium text-sm hover:bg-surface-variant transition-all duration-200"
        :exact-active-class="item.to === '/' ? 'text-primary font-bold bg-primary/5' : ''"
        :active-class="item.to !== '/' ? 'text-primary font-bold bg-primary/5' : ''"
        @click="mobileMenuOpen = false"
      >
        <span class="material-symbols-outlined text-[18px]">{{ item.icon }}</span>
        {{ item.label }}
        <span
          v-if="item.badge"
          class="text-[10px] font-bold text-on-primary bg-secondary px-1.5 py-0.5 rounded-full ml-auto"
        >{{ item.badge }}</span>
      </router-link>
    </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TextType from '../components/animate/TextType.vue'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'

const { isLoggedIn, user, logout } = useAuth()
const { show: showToast } = useToast()
const mobileMenuOpen = ref(false)

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/courses', label: 'Courses', icon: 'menu_book' },
  { to: '/achievements', label: 'Achievements', icon: 'workspace_premium' },
  { to: '/checkins', label: 'Check-ins', icon: 'edit_calendar' },
  { to: '/community', label: 'Community', icon: 'groups', badge: 'Soon' },
  { to: '/groups', label: 'Groups', icon: 'diversity_3', badge: 'Soon' },
  { to: '/playground', label: 'Playground', icon: 'psychology', badge: 'Soon' },
]



onMounted(() => {
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

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.25s ease-in-out;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
