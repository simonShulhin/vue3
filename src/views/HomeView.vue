<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'
import type { IEventCard } from '@/types'
import { onMounted, ref } from 'vue'

const events = ref([] as IEventCard[])
onMounted(() => {
  EventService.getEvents().then(({ data }) => (events.value = data))
})
</script>

<template>
  <div class="home">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
  </div>
</template>
