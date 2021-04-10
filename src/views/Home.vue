<template>
  <div class="home">
    <div class="flex justify-between">
      <h1>Science Book Shelf</h1>
      <select v-model="currentTopic">
        <option v-for="[val, desc] in bookTopics" :value="val" :key="val">{{ desc }}</option>
      </select>
    </div>
    <div>
      {{ currentTopic}} - {{ currentPage }}
    </div>
    <div class="flex justify-end">
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
import bookService from "@/bookService";
import { Work } from "@/models/Subjects";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import BookInfo from "@/components/bookInfo.vue";
import bookTopics from "@/common/bookTopics";

export default defineComponent({
  components: {
    BookInfo
  },
  setup() {
    const books: Work[] = reactive([]);
    const currentPage = ref(0);
    const currentTopic = ref(bookTopics[0][0]); // First value
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

    onMounted(async () => loadBooks(currentTopic.value));

    async function loadBooks(val: string) {
      var response = await bookService.getBooks(val, currentPage.value);
      if (response.status === 200) {
        books.splice(0, books.length, ...response.data.works);
      }
    } 

    return {
      currentPage,
      currentTopic,
      books,
      bookTopics
    };
  },
});
</script>
