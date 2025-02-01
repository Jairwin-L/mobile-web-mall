import fly from 'flyio';
import { Toast } from 'antd-mobile';
import { SYSTEM_ERROR_MSG, SYSTEM_SUCCESS_MSG } from '@/constants/api';
import { BASE_API_URL } from './config';

fly.config.timeout = 3500;
fly.interceptors.request.use((request) => {
  request.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // apifox mock token
    apifoxToken: '6H5JfNP0QJaBsYAhFCKUv',
  };
  return request;
});

fly.interceptors.response.use(
  (response) => {
    const { data, request } = response;
    const { method } = request || {};
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      const defaultContent = data.success ? SYSTEM_SUCCESS_MSG : SYSTEM_ERROR_MSG;
      const content = data.msg || defaultContent;
      Toast.show({
        content,
        icon: data.success ? 'success' : 'fail',
      });
    }
    return data;
  },
  (error: any) => {
    console.error('[EXCEPTION/interceptors] response error:%j', error);
    const data: any = error.response?.data;
    const statusCode = Number(data?.code);
    if (Number(error.status) === 401) {
      console.log(`----->：`, error);
    }
    if (statusCode === 404) return Promise.reject(error);
    // 发生网络错误后会走到这里
    return Promise.resolve(error.status);
  },
);

class Request {
  private static instance: Request;
  static getInstance(BASE_URL: string) {
    if (!this.instance) this.instance = new Request(BASE_URL);
    return this.instance;
  }
  private BASE_URL = '';
  private constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL;
  }
  // Resp: response, Param: 入参
  get<Resp, Param = never>(url: string, params?: Param) {
    return this.fetch<Resp, Param>(url, 'get', params);
  }
  delete<Resp, Param>(url: string, params: NonNullable<Param & { id: number }>) {
    return this.fetch<Resp, Param>(`${url}`, 'delete', params);
  }
  put<Resp, Param>(url: string, params: Param) {
    return this.fetch<Resp, Param>(url, 'put', params);
  }
  post<Resp, Param>(url: string, params: Param) {
    return this.fetch<Resp, Param>(url, 'post', params);
  }
  private async fetch<Resp, Param>(
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    params?: Param,
  ): Promise<IBaseResp<Resp>> {
    if (method !== 'get') {
      Toast.show({
        content: '加载中……',
        icon: 'loading',
      });
    }
    const response = await fly[method](`${this.BASE_URL}${url}`, params);
    // Type 'FlyResponse<any>' is missing the following properties from type 'IBaseResp<Resp>': msg, success
    // @ts-ignore
    return response;
  }
}

export default Request.getInstance(BASE_API_URL);
