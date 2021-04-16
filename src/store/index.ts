import bookService from '@/bookService';
import bookTopics from '@/common/bookTopics';
import { Work } from '@/models/Subjects';
import { createStore } from 'vuex'

const state = {
  isBusy: false,
  error: "",
  books: new Array<Work>(),
  currentTopic: bookTopics[0][0], // First topic
  currentPage: 0,
  topics: bookTopics
};

export type State = typeof state;

export default createStore({
  state,
  mutations: {
    setBusy: (state) => state.isBusy = true,
    clearBusy: (state) => state.isBusy = false,
    setError: (state, value) => state.error = value,
    setBooks(state, books) {
      state.books.splice(0, state.books.length, ...books);
    },
    setTopic: (state, topic: string) => state.currentTopic = topic,
    setPage: (state, page: number) => state.currentPage = page
  },
  actions: {
    async loadBooks({ state, commit }) {
      try {
        commit("setBusy");
        const response = await bookService.getBooks(state.currentTopic, state.currentPage);
        if (response.status === 200) {
          commit("setBooks", response.data.works);
        }
      } catch {
        commit("setError", "Failed to load books");
      } finally {
        commit("clearBusy");
      }
    }
  },
  getters: {
    findBook: (state: State) => (key: string): Work | undefined => {
      return state.books.find(b => b.key === key);
    }
  }
});


