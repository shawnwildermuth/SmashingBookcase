import bookService from '@/bookService';
import bookTopics from '@/common/bookTopics';
import { Work } from '@/models/Subjects';
import { createStore } from 'vuex'

export default createStore({
  key: 'bookStore',
  state: () => ({
    isBusy: false,
    error: "",
    books: new Array<Work>(),
    currentTopic: bookTopics[0][0], // First topic
    currentPage: 0,
    topics: bookTopics
  }),
  actions: {
    async loadBooks({ state, commit }) {
      try {
        this.isBusy = true;
        const response = await bookService.getBooks(state.currentTopic, state.currentPage);
        if (response.status === 200) {
          this.books = response.data.works;
        }
      } catch {
        this.error = commit("setError", "Failed to load books");
      } finally {
        this.isBusy = false;
      }
    }
  },
  getters: {
    findBook(key: string): Work | undefined {
      return this.books.find(b => b.key === key);
    }
  }
});


