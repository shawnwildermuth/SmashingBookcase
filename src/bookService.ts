import axios, { AxiosResponse } from "axios";
import { Book } from "./models/Book";
import { Subject } from "./models/Subjects";

const pageSize = 24;

export default {
  async getBooks(topic: string, page = 0): Promise<AxiosResponse<Subject>> {
    return axios.get<Subject>(`https://openlibrary.org/subjects/${topic}.json?limit=${pageSize}&offset=${page * pageSize}`);
  },

  async getBook(id: string): Promise<AxiosResponse<Book>> {
    return axios.get<Book>(`https://openlibrary.org${id}.json`);
  }
}