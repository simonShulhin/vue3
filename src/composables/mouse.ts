import { onMounted, onUnmounted, ref } from 'vue'

export function useMouse(text: string) {
  const x = ref(0)
  const y = ref(0)
  const title = text

  const update = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y, title }
}
