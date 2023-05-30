import { COLLECTION } from '../const';
import request from '../index';
/**
 * @title 地址
 * @description 增删改查
 */
// 列表查询
export async function queryList(
  params: IQueryAddress.QueryParam,
): Promise<IBaseResp<IQueryAddress.Resp>> {
  try {
    const res = await request.get<IQueryAddress.Resp, IQueryAddress.QueryParam>(
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
export async function del(params: IQueryAddress.DelParam): Promise<IBaseResp<string>> {
  try {
    const res = await request.delete<string, IQueryAddress.DelParam>(COLLECTION.DEL, params);
    return res;
  } catch (error) {
    console.error(`delete:${COLLECTION.DEL}----->：`, error);
    return {};
  }
}
// 创建
export async function create(params: IQueryAddress.Param): Promise<IBaseResp<string>> {
  try {
    const res = await request.post<string, IQueryAddress.Param>(COLLECTION.CREATE, params);
    return res;
  } catch (error) {
    console.error(`post:${COLLECTION.CREATE}----->：`, error);
    return {};
  }
}
