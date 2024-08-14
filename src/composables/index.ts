import { onMounted, onUnmounted } from 'vue'

interface Ikeys {
  key: KeyboardEvent['key']
  fn: Function
}

export function useKeydown(keys: Ikeys[]) {
  const escapeEvent = (event: KeyboardEvent) => {
    const key = keys.find((el) => el.key === event.key)
    if (key) {
      key.fn()
    }
  }

  onMounted(() => window.addEventListener('keydown', escapeEvent))
  onUnmounted(() => window.removeEventListener('keydown', escapeEvent))
}
