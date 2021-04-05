<template>
  <div class="home">
    <h1>Science Book Shelf</h1>
    <div class="flex justify-end">
      <router-link
        class="btn"
        v-if="currentPage > 0"
        :to="{ name: 'Home', params: { page: currentPage - 1 } }"
      >
        Prev</router-link
      >&nbsp;
      <router-link
        class="btn"
        :to="{ name: 'Home', params: { page: currentPage + 1  } }"
        >Next</router-link
      >
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
import { defineComponent, onActivated, onMounted, reactive, ref } from "vue";
import BookInfo from "@/components/bookInfo.vue";
import router from "@/router";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    BookInfo
  },
  setup() {
    let books: Work[] = reactive([]);
    const route = useRoute();
    const currentPage = route.params.page ? parseInt(route.params.page.toString()) : 0;

    onMounted(async () => {
      var response = await bookService.getScienceBooks(currentPage);
      if (response.status === 200) {
        books.splice(0, books.length, ...response.data.works);
      }
    });

    return {
      currentPage,
      books,
      router
    };
  },
});
</script>
