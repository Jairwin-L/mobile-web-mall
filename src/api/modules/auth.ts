import { AUTH } from '../const';
import request from '../index';
/**
 * @title 权限
 * @description 查
 */
// 查
export async function change(params: IQueryAuth.Param) {
  const res = await request.put<IQueryAuth.Resp, IQueryAuth.Param>(AUTH.CHANGE_PASSWORD, params);
  return res;
}

export async function login(params: IQueryAuth.Param) {
  const res = await request.post<IQueryAuth.Resp, IQueryAuth.Param>(AUTH.LOGIN, params);
  return res;
}

export async function register(params: IQueryAuth.Param): Promise<IBaseResp<IQueryAuth.Resp>> {
  const res = await request.post<IQueryAuth.Resp, IQueryAuth.Param>(AUTH.REGISTER, params);
  return res;
}
