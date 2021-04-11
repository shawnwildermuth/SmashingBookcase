<template>
  <div class="home">
    <div class="flex justify-between">
      <h1>Science Book Shelf</h1>
      <select v-model="state.currentTopic">
        <option v-for="[val, desc] in bookTopics" :value="val" :key="val">
          {{ desc }}
        </option>
      </select>
    </div>
    <div class="flex justify-end">
      <button class="btn" v-if="currentPage > 0" @click="decrementPage">
        Prev &nbsp;
      </button>
      <button class="btn" @click="incrementPage">Next</button>
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
import { computed, defineComponent, onMounted, watch } from "vue";
import BookInfo from "@/components/bookInfo.vue";
import bookTopics from "@/common/bookTopics";
import store from "@/store";

export default defineComponent({
  components: {
    BookInfo,
  },
  setup() {
    const books = computed(() => store.state.books);
    const currentPage = computed(() => store.state.currentPage);
    const currentTopic = computed(() => store.state.currentTopic);
    let topicChanging = false;

    watch(currentPage, () => {
      if (!topicChanging) {
        store.dispatch("loadBooks");
      }
    });

    watch(currentTopic, async () => {
      try {
        topicChanging = true;
        store.commit("setCurrentPage", 0);
        store.dispatch("loadBooks");
      } finally {
        topicChanging = false;
      }
    });

    onMounted(async () => store.dispatch("loadBooks"));

    const incrementPage = () =>
      store.commit("setPage", store.state.currentPage + 1);
    const decrementPage = () =>
      store.commit("setPage", store.state.currentPage - 1);

    return {
      currentPage,
      currentTopic,
      books,
      bookTopics,
      state: store.state,
      incrementPage,
      decrementPage,
    };
  },
});
</script>
