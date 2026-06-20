<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[300] flex items-center justify-center bg-black/30"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-xl p-xl mx-4 w-full" style="max-width: 480px;">
        <div class="flex items-center justify-between mb-lg">
          <h3 class="font-headline-md font-bold text-on-surface">📮 Submit Feedback</h3>
          <button
            class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors rounded-xl hover:bg-surface-variant"
            @click="$emit('close')"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-md">
          <div>
            <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Category</label>
            <select
              v-model="category"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            >
              <option value="suggestion">💡 Suggestion</option>
              <option value="bug">🐛 Bug Report</option>
              <option value="question">❓ Question</option>
              <option value="other">📝 Other</option>
            </select>
          </div>

          <div>
            <label class="text-label-sm font-bold text-on-surface-variant mb-xs block">Message</label>
            <textarea
              v-model="content"
              rows="5"
              placeholder="Tell us what you think…"
              class="w-full px-md py-sm rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              required
            />
          </div>

          <div class="flex justify-end gap-md">
            <button
              type="button"
              class="px-lg py-sm rounded-xl border border-outline-variant text-on-surface font-bold text-sm hover:bg-surface-variant transition-all cursor-pointer"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!content || submitting"
              class="px-lg py-sm rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-on-primary font-bold text-sm transition-all active:scale-95 shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Sending…' : 'Send' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../lib/api'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { isLoggedIn } = useAuth()
const { show: showToast } = useToast()

const category = ref('suggestion')
const content = ref('')
const submitting = ref(false)

async function submit() {
  if (!isLoggedIn.value) {
    showToast('Please sign in to submit feedback', 'error')
    emit('close')
    return
  }

  submitting.value = true
  try {
    await api('/api/feedback', {
      method: 'POST',
      body: { category: category.value, content: content.value },
    })
    showToast('Thanks for your feedback!')
    emit('close')
  } catch (e: any) {
    showToast(e.message || 'Failed to submit', 'error')
  } finally {
    submitting.value = false
  }
}
</script>
