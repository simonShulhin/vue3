<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { format } from 'date-fns'
import EmailService from '@/services/EmailService'
import type { IChangeEmail, IEmail } from '@/types'
import MailItem from '@/components/MailItem.vue'
import ModalApp from '@/components/ModalApp.vue'
import MailsTable from '@/components/MailsTable.vue'

const emails = ref<IEmail[] | null>(null)
const openedEmail = ref<null | IEmail>(null)

const sortedEmails = computed(() => {
  if (emails.value !== null) {
    return [...emails.value].sort((a, b) => (a.sentAt < b.sentAt ? 1 : -1))
  } else return null
})

const unarchivedEmails = computed(() => sortedEmails.value?.filter((e) => !e.archived))

const archivedEmails = computed(() => sortedEmails.value?.filter((e) => e.archived))

const openedEmailIndex = computed(() =>
  unarchivedEmails.value
    ? unarchivedEmails.value.findIndex((email) => email.id === openedEmail.value?.id)
    : -1,
)

const updateEmailData = (email: IEmail) => {
  EmailService.updateEmail(email)
}

const onOpenEmail = (email: IEmail) => {
  email.read = true
  openedEmail.value = email
  updateEmailData(email)
}

const onOpenNextEmail = (num: number) => {
  console.log('here')

  if (
    openedEmailIndex.value !== undefined &&
    openedEmailIndex.value > -1 &&
    unarchivedEmails.value
  ) {
    openedEmail.value = unarchivedEmails.value[openedEmailIndex.value + num]
  }
}

const onChangeEmail = ({ toggleRead, toggleArchive, save, closeModal, index }: IChangeEmail) => {
  console.log('here', index)

  if (openedEmail.value) {
    if (toggleRead) openedEmail.value.read = !openedEmail.value?.read
    if (toggleArchive) openedEmail.value.archived = !openedEmail.value?.archived
    if (index && openedEmailIndex.value > -1 && unarchivedEmails.value) {
      openedEmail.value = unarchivedEmails.value[openedEmailIndex.value + index]
    }
    if (save) updateEmailData(openedEmail.value)
    if (closeModal) openedEmail.value = null
  }
}

onMounted(() => {
  EmailService.getEmails().then(({ data }) => (emails.value = data))
})
</script>

<template>
  <div>
    <MailsTable
      v-if="unarchivedEmails"
      header="VMail Inbox"
      :emails="unarchivedEmails"
      @open-email="onOpenEmail"
    />
    <MailsTable
      v-if="archivedEmails"
      header="VMail Archived"
      :emails="archivedEmails"
      @open-email="onOpenEmail"
    />

    <ModalApp v-if="openedEmail && unarchivedEmails" @clickOutside="openedEmail = null">
      <MailItem
        :email="openedEmail"
        :emailsLength="unarchivedEmails.length"
        :emailIndex="openedEmailIndex"
        @changeEmail="onChangeEmail"
      />
    </ModalApp>
  </div>
</template>
