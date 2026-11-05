import type { GlobalStats } from "../../Types";

const API_URL = '/api';

export async function getGlobalStats(): Promise<GlobalStats> {
  const response = await fetch(`${API_URL}/stats`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки данных');
  }
  return response.json();
};