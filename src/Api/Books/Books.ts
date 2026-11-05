import type { BooksState } from "../../Types/BooksState";

const API_URL = '/api';

export async function getBooksStats(): Promise<BooksState[]> {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки данных');
  }
  return response.json();
};