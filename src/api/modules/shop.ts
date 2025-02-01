import { SHOP } from '../const';
import request from '../index';
import { get } from '../method';
/**
 * @title 列表
 * @description 查
 */
// 查
export async function queryList() {
  const res = await get<IQueryShop.Resp>(SHOP.LIST);
  return res;
}
// 详情
export async function show(params: IQueryShop.Param) {
  const res = await get<string, IQueryShop.Param>(SHOP.SHOW, params);
  return res;
}
// 删除
export async function del(params: IQueryShop.Param) {
  const res = await request.delete<string, IQueryShop.Param>(SHOP.DEL, params);
  return res;
}
