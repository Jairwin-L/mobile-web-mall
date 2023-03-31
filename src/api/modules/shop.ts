import { SHOP } from '../const';
import request from '../index';
/**
 * @title 列表
 * @description 查
 */
// 查
export async function queryList(): Promise<IBaseResp<IQueryShop.Resp>> {
  try {
    const res = await request.get<IQueryShop.Resp>(SHOP.LIST);
    return res;
  } catch (error) {
    console.log(`get:${SHOP.LIST}----->：`, error);
    return {};
  }
}

// 删除
export async function del(params: IQueryShop.DelParam): Promise<IBaseResp<string>> {
  try {
    const res = await request.delete<string, IQueryShop.DelParam>(SHOP.DEL, params);
    return res;
  } catch (error) {
    console.error(`delete:${SHOP.DEL}----->：`, error);
    return {};
  }
}
