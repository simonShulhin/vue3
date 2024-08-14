<script setup lang="ts">
  import { ref } from 'vue'

  const isOpen = ref(false)
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="isOpen = true">Open modal</button>
    <transition name="fade">
      <div v-if="isOpen" class="modal">
        <button @click="isOpen = false">Close</button>
      </div>
    </transition>
  </div>
</template>

<style>
  .modal {
    display: flex;
    place-content: center;
    place-items: center;
    margin: 40px 0;
    height: 300px;
    width: 300px;
    background: lightgrey;
  }

  button {
    flex-grow: 0;
  }
</style>
