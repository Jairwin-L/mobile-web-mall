import { CATEGORY } from '../const';
import request from '../index';
/**
 * @title 类目
 * @description 查
 */
// 列表查询
export async function queryList() {
  const res = await request.get<IQueryCategory.Resp>(CATEGORY.LIST);
  return res;
}
