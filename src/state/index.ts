import bookService from "@/bookService";
import bookTopics from "@/common/bookTopics";
import { reactive } from "vue";
import { Work } from "@/models/Subjects";

export default reactive({
  books: new Array<Work>(),
  currentPage: 0,
  currentTopic: bookTopics[0][0], // First value
  isBusy: false,
  error: "",
  async loadBooks() {
    try {
      this.isBusy = true;
      const response = await bookService.getBooks(this.currentTopic, this.currentPage);
      if (response.status === 200) {
        if (response.data.works.length === 0) this.error = "No books returned";
        this.books.splice(0, this.books.length, ...response.data.works);
      }
    } catch {
      this.error = "Failed to load books";
    } finally {
      this.isBusy = false;
    }
  },
  findBook(key: string) {
    const book = this.books.find(b => b.key === key);
    return book ? book : null;
  }
});