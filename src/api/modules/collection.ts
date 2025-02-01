import { COLLECTION } from '../const';
import request from '../index';
import { del, post } from '../method';
/**
 * @title 收藏
 * @description 增删改查
 */
// 列表查询
export async function queryList(params: IQueryCollection.Param) {
  const res = await request.get<IQueryCollection.Resp, IQueryCollection.Param>(
    COLLECTION.LIST,
    params,
  );
  return res;
}
// 删除
export async function destroy(params: IQueryCollection.DelParam) {
  const res = await del<string, IQueryCollection.DelParam>(COLLECTION.DEL, params);
  return res;
}
// 创建
export async function create(params: IQueryCollection.Param) {
  const res = await post<string, IQueryCollection.Param>(COLLECTION.CREATE, params);
  return res;
}
