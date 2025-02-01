import { ORDER } from '../const';
import request from '../index';
/**
 * @title 列表
 * @description 查
 */
// 查
export async function queryList(params: IQueryOrder.Param) {
  const res = await request.get<IQueryOrder.Resp, IQueryOrder.Param>(ORDER.LIST, params);
  return res;
}
export async function create(params: IQueryOrder.CreateParam) {
  const res = await request.post<IQueryOrder.Resp, IQueryOrder.CreateParam>(ORDER.CREATE, params);
  return res;
}
