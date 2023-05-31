import { COLLECTION } from '../const';
import request from '../index';
/**
 * @title 收藏
 * @description 增删改查
 */
// 列表查询
export async function queryList(
  params: IQueryCollection.Param,
): Promise<IBaseResp<IQueryCollection.Resp>> {
  try {
    const res = await request.get<IQueryCollection.Resp, IQueryCollection.Param>(
      COLLECTION.LIST,
      params,
    );
    return res;
  } catch (error) {
    console.error(`get:${COLLECTION.LIST}----->：`, error);
    return {};
  }
}
// 删除
export async function del(params: IQueryCollection.DelParam): Promise<IBaseResp<string>> {
  try {
    const res = await request.delete<string, IQueryCollection.DelParam>(COLLECTION.DEL, params);
    return res;
  } catch (error) {
    console.error(`delete:${COLLECTION.DEL}----->：`, error);
    return {};
  }
}
// 创建
export async function create(params: IQueryCollection.Param): Promise<IBaseResp<string>> {
  try {
    const res = await request.post<string, IQueryCollection.Param>(COLLECTION.CREATE, params);
    return res;
  } catch (error) {
    console.error(`post:${COLLECTION.CREATE}----->：`, error);
    return {};
  }
}
