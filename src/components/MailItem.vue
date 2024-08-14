<script setup lang="ts">
import { useKeydown } from '@/composables'
import EmailService from '@/services/EmailService'
import type { IChangeEmail, IEmail } from '@/types'
import { format } from 'date-fns'
import { marked } from 'marked'
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  email: IEmail
  emailIndex: number
  emailsLength: number
}>()

const emit = defineEmits<{
  changeEmail: [IChangeEmail]
}>()

const toggleArchived = () =>
  emit('changeEmail', { toggleArchive: true, save: true, closeModal: true })
const toggleRead = () => emit('changeEmail', { toggleRead: true, save: true })
const goNewer = () => props.emailIndex && emit('changeEmail', { index: -1 })
const goOlder = () =>
  props.emailIndex + 1 !== props.emailsLength && emit('changeEmail', { index: 1 })

useKeydown([
  { key: 'r', fn: toggleRead },
  { key: 'e', fn: toggleArchived },
  { key: 'n', fn: goNewer },
  { key: 'p', fn: goOlder },
])
</script>

<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchived">
        {{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark unread (r)' : 'Mark read (r)' }}
      </button>
      <button :disabled="!emailIndex" @click="goNewer">Newer (n)</button>
      <button :disabled="emailIndex + 1 === emailsLength" @click="goOlder">Older (p)</button>
    </div>
    <h2>{{ email.subject }}</h2>
    <div>
      <em>From {{ email.from }} on {{ format(email.sentAt, 'MMM do yyyy') }}</em>
      <div v-html="marked.parse(email.body)" />
    </div>
  </div>
</template>
