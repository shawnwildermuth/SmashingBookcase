<template>
  <div class="flex">
    <img
      :src="`http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`"
      class="w-32 shadow"
    />
    <div class="p-2">
      <strong>{{ book.title }}</strong>
      <div>
        <ul>
          <li v-for="author in book.authors" :key="author.key">
            {{ author.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    book: Object
  }
})
</script>