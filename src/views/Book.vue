<template>
  <div class="about">
    <h1>Info on a single book</h1>
    <button class="btn" @click="router.back()">Back</button>
    <div v-if="book">
      <div class="flex">
        <img
          v-if="book.covers.length > 0"
          :src="`http://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`"
          class="w-32 shadow"
        />
        <div class="p-2">
          <div>
            <strong>{{ book.title }}</strong>
          </div>
          <div>{{ book.description?.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

script:<script lang="ts">
import bookService from "@/bookService";
import { defineComponent, onMounted, Ref, ref } from "vue";
import { Book } from "@/models/Book";
import router from "@/router";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const book: Ref<Book | null> = ref(null);

    onMounted(async () => {
      const result = await bookService.getBook(props.id);
      if (result.status === 200) {
        book.value = result.data;
      }
    });

    return {
      book,
      router
    };
  },
});
</script>