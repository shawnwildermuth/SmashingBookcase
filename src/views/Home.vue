<template>
  <div class="home">
    <div class="flex justify-between">
      <select v-model="currentTopic">
        <option v-for="[val, desc] in bookTopics" :value="val" :key="val">{{ desc }}</option>
      </select>
      <div>
      <button
        class="btn"
        v-if="currentPage > 0"
        @click="currentPage--"
      >
        Prev &nbsp;</button>
      <button
        class="btn"
        @click="currentPage++"
        >Next</button>
        </div>
    </div>
    <div class="grid grid-cols-4">
      <div
        v-for="book in books"
        :key="book.key"
        class="border bg-white border-grey-500 m-1 p-1"
      >
        <router-link :to="{ name: 'book', params: { id: book.key } }">
          <BookInfo :book="book" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import BookInfo from "@/components/bookInfo.vue";
import bookTopics from "@/common/bookTopics";
import BookFactory from "@/factories/BookFactory";

export default defineComponent({
  components: {
    BookInfo
  },
  setup() {

    const { books, currentPage, currentTopic, loadBooks } = BookFactory();

    let topicChanging = false;

    watch(currentPage,
      async () => {
        if (!topicChanging) {
          await loadBooks(currentTopic.value);
        }
      });

    watch(currentTopic,
      async () => {
        try {
          topicChanging = true;
          currentPage.value = 0;
          await loadBooks(currentTopic.value);
        } finally {
          topicChanging = false;
        }
      }); 

    onMounted(async () => {
      if (books.length === 0) loadBooks(currentTopic.value)
    });

    return {
      currentPage,
      currentTopic,
      books,
      bookTopics
    };
  },
});
</script>
