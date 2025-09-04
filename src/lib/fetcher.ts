import { getJSON } from '@/utils/api';
export async function fetcher<T>(url: string): Promise<T> {
  return getJSON<T>(url);
}
