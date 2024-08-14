<script setup lang="ts">
import EmailService from '@/services/EmailService'
import type { IEmail } from '@/types'
import { format } from 'date-fns'
import { computed, ref, toRef, watch } from 'vue'

const props = defineProps<{
  emails: IEmail[]
  header: string
}>()

defineEmits<{
  openEmail: [IEmail]
}>()

const checkedEmails = ref([] as IEmail[])
const toggle = ref(false)

const updateEmailData = (email: IEmail) => {
  EmailService.updateEmail(email)
  resetCheckbox()
}

const resetCheckbox = () => {
  toggle.value = false
  checkedEmails.value = []
}

const forSelected = (fn: (e: IEmail) => void) => {
  checkedEmails.value.forEach((email) => {
    fn(email)
    updateEmailData(email)
  })
}

const moveToArchive = () => forSelected((e) => (e.archived = !e.archived))

const markUnread = () => forSelected((e) => (e.read = false))

const markRead = () => forSelected((e) => (e.read = true))

const updateCheckedEmails = () => {
  console.log(toggle.value)
  if (toggle.value) {
    checkedEmails.value = props.emails
  } else {
    checkedEmails.value = []
  }
}
</script>

<template>
  <div v-if="emails.length">
    <h1>{{ header }}</h1>

    <div style="text-align: left">
      <input
        type="checkbox"
        style="margin: 5px"
        :style="{ background: checkedEmails.length ? '#979a9b' : '' }"
        v-model="toggle"
        :checked="checkedEmails.length === emails.length"
        @change="updateCheckedEmails"
      />
      <button @click="markRead" :disabled="checkedEmails.every((email) => email.read)">
        Mark Read
      </button>
      <button @click="markUnread" :disabled="checkedEmails.every((email) => !email.read)">
        Mark Unread
      </button>
      <button @click="moveToArchive" :disabled="!checkedEmails.length">
        {{ emails[0].archived ? 'Unarchive' : 'Archive' }}
      </button>
    </div>
    <table class="mail-table">
      <tbody>
        <tr
          v-for="email in emails"
          :key="email.id"
          :class="email.read ? 'read' : ''"
          class="clickable"
          @click="$emit('openEmail', email)"
        >
          <td>
            <input v-model="checkedEmails" :value="email" @click.stop type="checkbox" />
          </td>
          <td>{{ email.from }}</td>
          <td>
            <p>
              <strong>{{ email.subject }} - {{ email.body }}</strong>
            </p>
          </td>
          <td class="date">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
          <td>
            <button @click.stop="(email.archived = !email.archived), updateEmailData(email)">
              {{ email.archived ? 'Unarchive' : 'Archive' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
