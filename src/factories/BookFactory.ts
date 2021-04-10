import bookService from "@/bookService";
import { Work } from "@/models/Subjects";
import bookTopics from "@/common/bookTopics";
import { reactive, ref } from "vue";

const books: Work[] = reactive([]);
const currentPage = ref(0);
const currentTopic = ref(bookTopics[0][0]); // First value
const isBusy = ref(false);
const error = ref("");

async function loadBooks(val: string) {
  try {
    isBusy.value = true;
    error.value = "";
    const response = await bookService.getBooks(val, currentPage.value);
    if (response.status === 200) {
      if (response.data.works.length === 0) error.value = "None Books Found";
      books.splice(0, books.length, ...response.data.works);
    }
  } catch {
    error.value = "Failed to load books";
  } finally {
    isBusy.value = false;
  }
}

export default function () {

  return {
    loadBooks,
    books,
    currentPage,
    currentTopic,
    error,
    isBusy
  };
}