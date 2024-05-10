import { MAIN } from '../const';
import request from '../index';
/**
 * @title 列表
 * @description 查
 */
// 查
export async function queryList(params: IQueryBiz.Param): Promise<IBaseResp<IQueryBiz.Resp>> {
  try {
    const res = await request.get<IQueryBiz.Resp, IQueryBiz.Param>(MAIN.HOME, params);
    return res;
  } catch (error) {
    console.log(`get:${MAIN.HOME}----->：`, error);
    return {};
  }
}
// 查
export async function queryRecommend(params: IQueryBiz.Param): Promise<IBaseResp<IQueryBiz.Resp>> {
  try {
    const res = await request.get<IQueryBiz.Resp, IQueryBiz.Param>(MAIN.RECOMMEND, params);
    return res;
  } catch (error) {
    console.log(`get:${MAIN.RECOMMEND}----->：`, error);
    return {};
  }
}
