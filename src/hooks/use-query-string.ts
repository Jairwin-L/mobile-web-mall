import { useRouter } from 'next/router';

/**
 * @module useQueryString
 * @description 获取路由参数
 */

function useQueryString<T extends string>(key: T) {
  const { query } = useRouter();
  return query[key];
}

export default useQueryString;
