<template>
  <div class="container mx-auto bg-gray-100 p-1">
    <router-link to="/"><h1>Bookcase</h1></router-link>
    <div class="alert" v-if="error">{{ error }}</div>
    <div class="alert bg-gray-200 text-gray-900" v-if="isBusy">Loading...</div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BookFactory from './factories/BookFactory'

export default defineComponent({
  setup() {
    const { error, isBusy } = BookFactory();
    return {
      error, 
      isBusy
    }
  },
})
</script>

