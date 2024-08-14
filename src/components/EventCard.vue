<script setup lang="ts">
import type { IEventCard } from '@/types'
import { ref } from 'vue'

defineProps<{
  event: IEventCard
}>()
</script>

<template>
  <RouterLink class="event-card-link" :to="'/event/' + event.id">
    <div class="event-card">
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  transition: all 2.5s ease;
}
.event-card:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-card-link {
  padding: 0;
  color: inherit;
}
.event-card-link:hover {
  background: none;
}
</style>
