<template>
  <div class="home">
    <h1>Science Book Shelf</h1>
    <div class="flex justify-end">
      <button
        class="btn"
        v-if="currentPage > 0"
        @click="loadPage(currentPage - 1)"
      >
        Prev</button
      >&nbsp;
      <button class="btn" @click="loadPage(currentPage + 1)">Next</button>
    </div>
    <div class="grid grid-cols-4">
      <div
        v-for="book in books"
        :key="book.key"
        class="border bg-white border-grey-500 m-1 p-1"
      >
        <router-link :to="{ name: 'book', params: { id: book.key }}" >
          <BookInfo :book="book" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import bookService from "@/bookService";
import { Work } from "@/models/Subjects";
import { defineComponent, onMounted, reactive, ref } from "vue";
import BookInfo from "../components/bookInfo.vue";

export default defineComponent({
  components: {
    BookInfo
  },  
  setup() {
    let books: Work[] = reactive([]);
    let currentPage = ref(0);

    async function loadPage(page: number) {
      currentPage.value = page;
      var response = await bookService.getScienceBooks(currentPage.value);
      if (response.status === 200) {
        books.splice(0, books.length, ...response.data.works);
      }
    }

    onMounted(async () => {
      await loadPage(currentPage.value);
    });

    return {
      currentPage,
      books,
      loadPage,
    };
  },
});
</script>
