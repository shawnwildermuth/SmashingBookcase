<template>
  <div class="about">
    <button class="btn" @click="router.back()">Back</button>
    <div v-if="book">
      <div class="flex">
        <img :src="`http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`"
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
import store from "@/store";
import { Work } from "@/models/Subjects";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const book: Ref<Work | null> = ref(null);

    onMounted(async () => {
      book.value = store.getters.findBook(props.id);
    });

    return {
      book,
      router
    };
  },
});
</script>