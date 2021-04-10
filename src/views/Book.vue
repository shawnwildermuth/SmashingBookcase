<template>
  <div class="about">
    <button class="btn" @click="router.back()">Back</button>
    <div v-if="book">
      <div class="flex">
        <img :src="`http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`"
          class="w-72 shadow"
        />
        <div class="p-2">
          <div>
            <strong>{{ book.title }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import router from "@/router";
import bookService from "@/bookService";
import { Book } from "@/models/Book";

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
      const response = await bookService.getBook(props.id);
      if (response.status === 200) {
        book.value =  response.data;
      }
    });

    return {
      book,
      router
    };
  },
});
</script>