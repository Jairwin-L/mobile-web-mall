import fly from 'flyio';
import { Toast } from 'antd-mobile';
import { SYSTEM_ERROR_MSG, SYSTEM_SUCCESS_MSG } from '@/constants/api';
import { BASE_API_URL } from './config';

fly.config.timeout = 3500;
fly.interceptors.request.use((request) => {
  request.headers['Content-Type'] = 'application/json';
  request.headers.Accept = 'application/json';
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

class UseFetch {
  private static instance: UseFetch;
  static getInstance(BASE_URL: string) {
    if (!this.instance) this.instance = new UseFetch(BASE_URL);
    return this.instance;
  }
  private BASE_URL = '';
  private constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL;
  }
  // RResp: response, Param: 入参
  async get<Resp, Param = never>(url: string, params?: Param): Promise<IBaseResp<Resp>> {
    const response = await fly.get(`${this.BASE_URL}${url}`, params);
    return new Promise((resolve) => {
      resolve(response);
    });
  }
  async show<Resp, Param>(url: string, params: Param): Promise<IBaseResp<Resp>> {
    const { id } = params as Param & { id: string };
    const response = await fly.get(`${this.BASE_URL}${url}/${id}`);
    return new Promise((resolve) => {
      resolve(response);
    });
  }
  async post<Resp, Param>(url: string, params: Param): Promise<IBaseResp<Resp>> {
    const response = await fly.post(`${this.BASE_URL}${url}`, params);
    return new Promise((resolve) => {
      resolve(response);
    });
  }
  async delete<Resp, Param>(url: string, params: Param): Promise<IBaseResp<Resp>> {
    const { id } = params as Param & {
      id: string;
    };
    const response = await fly.delete(`${this.BASE_URL}${url}`, {
      id,
    });
    return new Promise((resolve) => {
      resolve(response);
    });
  }
  async put<Resp, Param>(url: string, params: Param): Promise<IBaseResp<Resp>> {
    const response = await fly.put(`${this.BASE_URL}${url}`, params);
    return new Promise((resolve) => {
      resolve(response);
    });
  }
}

export default UseFetch.getInstance(BASE_API_URL);
