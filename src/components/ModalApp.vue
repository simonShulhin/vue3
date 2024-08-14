<script setup lang="ts">
import { useKeydown } from '@/composables'

const emit = defineEmits(['clickOutside'])

useKeydown([{ key: 'Escape', fn: () => emit('clickOutside') }])
</script>

<template>
  <div class="modal" @click.self="$emit('clickOutside')">
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>
