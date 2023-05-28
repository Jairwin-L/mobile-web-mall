import { CATEGORY } from '../const';
import request from '../index';
/**
 * @title 类目
 * @description 查
 */
// 列表查询
export async function queryList(): Promise<IBaseResp<IQueryCategory.Resp>> {
  try {
    const res = await request.get<IQueryCategory.Resp>(CATEGORY.LIST);
    return res;
  } catch (error) {
    console.error(`get:${CATEGORY.LIST}----->：`, error);
    return {};
  }
}
