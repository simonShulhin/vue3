<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMouse, useTitle, useCssVar, useInterval, useAsyncQueue } from '@vueuse/core'
import { ref } from 'vue'
import { options } from 'marked'
import axios from 'axios'

const { x, y } = useMouse()
const title = useTitle('Hello there')

const el = ref(null)
const color = useCssVar('--color', el)
const { counter, pause, reset, resume } = useInterval(1000, { controls: true })

// color.value = 'red'
const getFirstPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  })
}

const getSecondPromise = (num: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2 + num)
    }, 1000)
  })
}

const { result: state } = useAsyncQueue([getFirstPromise, getSecondPromise])
</script>

<template>
  <header>
    <div class="wrapper">
      <p>Async state : {{ state }}</p>
      <p ref="el" style="--color: #7fa998; color: var(--color)">
        Mouse position is at: {{ x }} {{ y }}
      </p>
      <button @click="pause()">Pause</button>
      <button @click="reset()">Reset</button>
      <button @click="resume()">Resume</button>
      <p>{{ counter }}</p>
      <button @click="color = 'red'">Change color</button>
      <input type="text" v-model="title" />
      <nav class="navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/list">List</RouterLink>
        <RouterLink to="/vmail">VMail</RouterLink>
      </nav>
    </div>
  </header>
  <!-- <Transition name="slide">
    <router-view> </router-view>
  </Transition> -->

  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.navigation {
  display: flex;
  place-content: center;
}

/* TRANSITIONS */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 6.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-enter-from {
  transform: translateX(50px);
}
.slide-leave-to {
  transform: translateX(-50px);
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-up-move {
  transition: all 0.5s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-leave-active {
  position: absolute;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

/* Global Styles */

button {
  font-size: 16px;
  padding: 8px;
  border-radius: 3px;
  margin: 5px 10px 5px 0px;
  cursor: pointer;
}

button:disabled {
  cursor: auto;
}

button.selected {
  cursor: auto;
  color: black;
  border-color: black;
  border-width: 2px;
}

.clickable {
  cursor: pointer;
}

input[type='checkbox'] {
  -webkit-appearance: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 2px;
  border: 1px solid #555;
  position: relative;
  vertical-align: middle;
  padding: 10px;
}

input[type='checkbox'].partial-check {
  background: #abc;
}

input[type='checkbox']:checked {
  background: rgb(102, 119, 153) !important;
}

.mb-0 {
  margin-bottom: 0;
}

/* Modal */

.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
}

.modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
  color: black;
}

/* Email Modal */

.email-display {
  text-align: left;
}

/* Mail Table */

.mail-table {
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
}
.mail-table tr.read {
  background-color: rgba(51, 51, 51, 0.8);
}
.mail-table tr {
  height: 40px;
}
.mail-table td {
  border-bottom: 1px solid black;
  padding: 5px;
  text-align: left;
}
.mail-table tr:first-of-type td {
  border-top: 1px solid black;
}
.mail-table td p {
  max-height: 1.9em;
  overflow-y: hidden;
  margin: 0;
}

.mail-table td.date {
  width: 120px;
}

/* Bulk Action Bar */

.bulk-action-bar {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  text-align: left;
  padding-bottom: 8px;
}

.bulk-action-bar input {
  margin: 5px;
}

.bulk-action-bar .checkbox {
  margin-right: 6px;
  margin-left: 3px;
}
</style>
