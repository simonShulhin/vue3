<script setup lang="ts">
import EventService from '@/services/EventService'
import type { IEventCard } from '@/types'
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    id?: string
  }>(),
  {
    id: '123',
  },
)

const event = ref<null | IEventCard>(null)

onMounted(() => {
  EventService.getEvent(props.id).then(({ data }) => {
    event.value = data
  })
})
</script>

<template>
  <div v-if="event" class="event-card">
    <h1>{{ event.title }}</h1>
    <p>{{ event.description }}</p>
    <p>@{{ event.time }}</p>
  </div>
</template>
