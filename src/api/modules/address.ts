import { ADDRESS } from '../const';
import { del, get, post, put } from '../method';
/**
 * @title 地址
 * @description 增删改查
 */
// 列表查询
export async function queryList(params: IQueryAddress.QueryParam) {
  const res = await get<IQueryAddress.Resp, IQueryAddress.QueryParam>(ADDRESS.LIST, params);
  return res;
}
// 详情
export async function show(params: IQueryAddress.DetailParam) {
  const res = await get<IQueryAddress.Resp, IQueryAddress.DetailParam>(ADDRESS.SHOW, params);
  return res;
}
// 删除
export async function destroy(params: IQueryAddress.DelParam) {
  const res = await del<string, IQueryAddress.DelParam>(ADDRESS.DEL, params);
  return res;
}
// 创建
export async function create(params: IQueryAddress.Param) {
  const res = await post<string, IQueryAddress.Param>(ADDRESS.CREATE, params);
  return res;
}
// 修改
export async function edit(params: IQueryAddress.EditParam) {
  const res = await put<string, IQueryAddress.EditParam>(ADDRESS.EDIT, params);
  return res;
}
