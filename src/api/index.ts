import fly from 'flyio';
import { Toast } from 'antd-mobile';
import getConfig from 'next/config';
import { SYSTEM_ERROR_MSG, SYSTEM_SUCCESS_MSG } from '@/constants/api';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

fly.config.timeout = 5000;
fly.interceptors.request.use((request) => {
  request.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return request;
});

fly.interceptors.response.use(
  (response) => {
    const { data, request } = response;
    const result = data || {};
    const { method } = request || {};
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      if (!result?.success) {
        Toast.show({
          content: data.msg || SYSTEM_ERROR_MSG,
          icon: 'fail',
        });
      } else {
        Toast.show({
          content: data.msg || SYSTEM_SUCCESS_MSG,
          icon: 'success',
        });
      }
    }
    return result;
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
  // RResp: response, Param: 入参
  get<Resp, Param = never>(url: string, params?: Param): Promise<IBaseResp<Resp>> {
    return this.fetch(url, 'get', params);
  }
  delete<Resp, Param>(
    url: string,
    params: NonNullable<Param & { id: number }>,
  ): Promise<IBaseResp<Resp>> {
    return this.fetch(`${url}`, 'delete', params);
  }
  put<Resp, Param>(url: string, params: Param): Promise<IBaseResp<Resp>> {
    return this.fetch(url, 'put', params);
  }
  post<Resp, Param>(url: string, params: Param): Promise<IBaseResp<Resp>> {
    return this.fetch(url, 'post', params);
  }
  private async fetch<Resp, Param>(
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    params?: Param,
  ): Promise<IBaseResp<Resp>> {
    if (method === 'post' || method === 'put' || method === 'delete') {
      Toast.show({
        content: '加载中……',
        icon: 'loading',
      });
    }
    const response = await fly[method](`${this.BASE_URL}${url}`, params);
    return response;
  }
}

export default Request.getInstance(API_URL);
