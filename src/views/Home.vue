<template>
  <div class="home">
    <div class="flex justify-between">
      <select v-model="state.currentTopic">
        <option v-for="[val, desc] in bookTopics" :value="val" :key="val">
          {{ desc }}
        </option>
      </select>
      <div>
        <button
          class="btn"
          v-if="state.currentPage > 0"
          @click="state.currentPage--"
        >
          Prev &nbsp;
        </button>
        <button class="btn" @click="state.currentPage++">Next</button>
      </div>
    </div>
    <div class="grid grid-cols-4">
      <div
        v-for="book in state.books"
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
import state from "@/state";

export default defineComponent({
  components: {
    BookInfo,
  },
  setup() {
    let topicChanging = false;

    watch(
      () => state.currentPage,
      async () => {
        if (!topicChanging) {
          await state.loadBooks();
        }
      }
    );

    watch(
      () => state.currentTopic,
      async () => {
        try {
          topicChanging = true;
          state.currentPage = 0;
          await state.loadBooks();
        } finally {
          topicChanging = false;
        }
      }
    );

    onMounted(async () => {
      if (state.books.length === 0) state.loadBooks();
    });

    return {
      state,
      bookTopics,
    };
  },
});
</script>
