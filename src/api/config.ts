import { ApiUrl } from '@/constants/api';

const env = process.env.NEXT_PUBLIC_API_ENV;
let apiUrl = ApiUrl.PROD;

if (env === 'DEV') {
  apiUrl = ApiUrl.DEV;
} else {
  apiUrl = ApiUrl.PROD;
}

export const BASE_API_URL = apiUrl;
