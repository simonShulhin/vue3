<script setup lang="ts">
import { group } from 'console'
import { computed, reactive, ref, watch } from 'vue'

interface Iitem {
  id: number
  text: string
}

const items = ref<Iitem[]>([
  { id: 1, text: 'Simon' },
  { id: 2, text: 'Enoch' },
  { id: 3, text: 'Nastya' },
])
const inputText = ref('')
const searchInput = ref('')
const currentId = ref(items.value.length)

const filteredList = computed(() => {
  return items.value.filter((el) => el.text.toLowerCase().includes(searchInput.value.toLowerCase()))
})

const deleteItem = (item: Iitem) => {
  items.value = items.value.filter((i) => i.id !== item.id)
}

const addItem = () => {
  items.value.push({ id: ++currentId.value, text: inputText.value })
}

const sortItems = () => {
  items.value.sort((a, b) => (a.text > b.text ? 1 : -1))
}
</script>

<template>
  <div>
    <form @submit.prevent="addItem">
      <input v-model="inputText" />
      <button type="submit">Add item</button>
    </form>
    <button @click="sortItems">Sort</button>
    <br />
    <input v-model="searchInput" placeholder="Search" />

    <transition-group name="slide-up" tag="ul">
      <li v-for="item in filteredList" :key="item.id">
        {{ item.text }}
        <button @click="deleteItem(item)">Delete</button>
      </li>
    </transition-group>
  </div>
</template>
