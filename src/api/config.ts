import { ApiUrl } from '@/constants';

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_DEV || ApiUrl.DEV;
