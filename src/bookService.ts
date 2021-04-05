import axios, { AxiosResponse } from "axios";
import { Book } from "./models/Book";
import { Subject } from "./models/Subjects";

export default {
  async getScienceBooks(page = 0): Promise<AxiosResponse<Subject>> {
    const pageSize = 24;
    return axios.get<Subject>(`https://openlibrary.org/subjects/science.json?limit=${pageSize}&offset=${page * pageSize}`);
  },

  async getBook(id: string): Promise<AxiosResponse<Book>> {
    return axios.get<Book>(`https://openlibrary.org${id}.json`);
  }
}