import { ADDRESS } from '../const';
import request from '../index';
/**
 * @title 地址
 * @description 增删改查
 */
// 列表查询
export async function query(
  params: IQueryAddress.QueryParam,
): Promise<IBaseResp<IQueryAddress.Resp>> {
  try {
    const res = await request.get<IQueryAddress.Resp, IQueryAddress.QueryParam>(
      ADDRESS.LIST,
      params,
    );
    return res;
  } catch (error) {
    console.error(`get:${ADDRESS.LIST}----->：`, error);
    return {};
  }
}
// 详情
export async function show(
  params: IQueryAddress.DetailParam,
): Promise<IBaseResp<IQueryAddress.Resp>> {
  try {
    const res = await request.get<IQueryAddress.Resp, IQueryAddress.DetailParam>(
      ADDRESS.SHOW,
      params,
    );
    return res;
  } catch (error) {
    console.error(`get:${ADDRESS.SHOW}----->：`, error);
    return {};
  }
}
// 删除
export async function del(params: IQueryAddress.DelParam): Promise<IBaseResp<string>> {
  try {
    const res = await request.delete<string, IQueryAddress.DelParam>(ADDRESS.DEL, params);
    return res;
  } catch (error) {
    console.error(`delete:${ADDRESS.DEL}----->：`, error);
    return {};
  }
}
// 创建
export async function create(params: IQueryAddress.Param): Promise<IBaseResp<string>> {
  try {
    const res = await request.post<string, IQueryAddress.Param>(ADDRESS.CREATE, params);
    return res;
  } catch (error) {
    console.error(`post:${ADDRESS.CREATE}----->：`, error);
    return {};
  }
}
// 修改
export async function edit(params: IQueryAddress.EditParam): Promise<IBaseResp<string>> {
  try {
    const res = await request.put<string, IQueryAddress.EditParam>(ADDRESS.EDIT, params);
    return res;
  } catch (error) {
    console.error(`put:${ADDRESS.EDIT}----->：`, error);
    return {};
  }
}
