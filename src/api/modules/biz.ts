import { MAIN } from '../const';
import { get } from '../method';
/**
 * @title 列表
 * @description 查
 */
// 查
export async function queryList() {
  const res = await get<IQueryData.Resp>(MAIN.HOME);
  return res;
}
// 查
export async function queryRecommend(params: IQueryBiz.Param) {
  const res = await get<IQueryRecommend.Resp, IQueryBiz.Param>(MAIN.RECOMMEND, params);
  return res;
}
export async function show(params: IQueryGoods.Param) {
  const res = await get<IQueryGoods.Resp, IQueryGoods.Param>(MAIN.GOODS, params);
  return res;
}
