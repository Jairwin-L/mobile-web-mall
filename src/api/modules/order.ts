import { ORDER } from '../const';
import request from '../index';
/**
 * @title 列表
 * @description 查
 */
// 查
export async function queryList(params: IQueryOrder.Param): Promise<IBaseResp<IQueryOrder.Resp>> {
  try {
    const res = await request.get<IQueryOrder.Resp, IQueryOrder.Param>(ORDER.LIST, params);
    return res;
  } catch (error) {
    console.log(`get:${ORDER.LIST}----->：`, error);
    return {};
  }
}
