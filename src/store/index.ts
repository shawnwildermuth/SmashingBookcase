import bookService from '@/bookService';
import bookTopics from '@/common/bookTopics';
import { Work } from '@/models/Subjects';
import { defineStore } from 'vuex'

export default defineStore("another", () => {

  // State
  const isBusy = ref(false);
  const books = reactive(new Array<Work>());

  // Actions
  async function loadBooks() {
    try {
      this.isBusy = true;
      const response = await bookService.getBooks(this.currentTopic, this.currentPage);
      if (response.status === 200) {
        this.books = response.data.works;
      }
    } finally {
      this.isBusy = false;
    }
  }

  findBook(key: string): Work | undefined {
    return this.books.find(b => b.key === key);
  }

  // Getters
  const bookCount = computed(() => this.books.length);

  return {
    isBusy,
    books,
    loadBooks,
    findBook,
    bookCount
  }
});


