import { ref } from 'vue'

interface Toast {
  message: string
  type: 'success' | 'error'
}

const toast = ref<Toast | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

export function useToast() {
  function show(msg: string, type: Toast['type'] = 'success') {
    toast.value = { message: msg, type }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      toast.value = null
    }, 3000)
  }

  return { toast, show }
}
