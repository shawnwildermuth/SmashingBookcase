<template>
  <div class="home">
    <div class="flex justify-between">
      <h1>Science Book Shelf</h1>
      <select v-model="store.currentTopic">
        <option v-for="[val, desc] in bookTopics" :value="val" :key="val">
          {{ desc }}
        </option>
      </select>
    </div>
    <div class="flex justify-end">
      <button class="btn" v-if="store.currentPage > 0" @click="store.decrementPage">
        Prev &nbsp;
      </button>
      <button class="btn" @click="store.incrementPage">Next</button>
    </div>
    <div class="grid grid-cols-4">
      <div
        v-for="book in store.books"
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
import { computed, defineComponent, onMounted, watch } from "vue";
import BookInfo from "@/components/bookInfo.vue";
import bookTopics from "@/common/bookTopics";
import bookStore from "@/store";

export default defineComponent({
  components: {
    BookInfo,
  },
  setup() {
    const store = bookStore(); // Generate the wrapper
    let topicChanging = false;

    watch(store.currentPage, async () => {
      if (!topicChanging) {
        await store.loadBooks();
      }
    });

    watch(store.currentTopic, async () => {
      try {
        topicChanging = true;
        store.setCurrentPage = 0;
        await store.loadBooks();
      } finally {
        topicChanging = false;
      }
    });

    onMounted(async () => await store.loadBooks());

    const incrementPage = () =>
      store.currentPage++;
    const decrementPage = () =>
      store.currentPage--;

    return {
      bookTopics,
      store,
      incrementPage,
      decrementPage,
    };
  },
});
</script>
