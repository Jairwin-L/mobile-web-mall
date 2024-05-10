import { useRouter } from 'next/navigation';

/**
 * @module useQueryString
 * @description 获取路由参数
 */

export default function useQueryString<T extends string>(key: T) {
  // @ts-ignore
  const { query } = useRouter();
  return query?.[key];
}
