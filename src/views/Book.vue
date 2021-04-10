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
          <div><em>Authors:</em></div>
          <div v-for="author in book.authors" :key="author.key">
            <ul class="list-disc ml-6">
              <li>{{ author.name }}</li>
            </ul>
          </div>
          <div><em>Availability</em></div>
          <ul v-if="book.availability" class="list-disc ml-6">
            <li>Lendable: {{ book.availability.is_lendable }}</li>
            <li>Readable: {{ book.availability.is_readable }}</li>
            <li>Browseable: {{ book.availability.is_browseable }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

script:<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import router from "@/router";
import state from "@/state";
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

    onMounted(() => {
      book.value =  state.findBook(props.id);
    });

    return {
      book,
      router
    };
  },
});
</script>