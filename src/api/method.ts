/**
 * @file flyio
 */
import request from './index';

export async function get<R, P = undefined>(url: string, params?: P) {
  const res = await request.get<R, P>(url, params);
  return res;
}
export async function post<R, P>(url: string, params: P) {
  const res = await request.post<R, P>(url, params);
  return res;
}
export async function put<R, P>(url: string, params: P) {
  const res = await request.put<R, P>(url, params);
  return res;
}
export async function del<R, P>(url: string, params: P) {
  const res = await request.delete<R, P>(url, params as P & { id: number });
  return res;
}
