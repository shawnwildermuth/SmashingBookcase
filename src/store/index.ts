import bookService from '@/bookService';
import { Work } from '@/models/Subjects';
import { createStore } from 'vuex'

const store = createStore({
  state: {
    isBusy: false,
    error: "",
    books: new Array<Work>(),
    currentTopic: "",
    currentPage: 0
  },
  mutations: {
    setBusy: (state, value) => state.isBusy = value,
    setError: (state, value) => state.error = value,
    setBooks(state, books) {
      state.books.splice(0, state.books.length, ...books); 
    },
    setTopic: (state, topic: string) => state.currentTopic = topic,
    setPage: (state, page: number) => state.currentPage = page  
  },
  actions: {
    async loadBooks({ state, commit }, topic) {
      commit("setTopic", topic);
      const response = await bookService.getBooks(state.currentTopic, state.currentPage);
      if (response.status === 200) {
        commit("setBooks", response.data.works);
      }
    },
    findBook({state}, key: string): Work | undefined {
      return state.books.find(b => b.key === key);
    }
  },
  getters: {

  }
})

export default store;
