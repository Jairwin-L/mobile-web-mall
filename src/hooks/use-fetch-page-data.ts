import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * @module useDataChange
 * @description 监听分页数据变化
 */
export default function useFetchPageData(
  startCallback: (url: string) => void,
  completeCallback: () => void,
  errorCallback: (error: any) => void,
) {
  const { events } = useRouter();
  useEffect(() => {
    events.on('routeChangeStart', startCallback);
    events.on('routeChangeComplete', completeCallback);
    events.on('routeChangeError', errorCallback);
    return () => {
      events.off('routeChangeStart', startCallback);
      events.off('routeChangeComplete', completeCallback);
      events.off('routeChangeError', errorCallback);
    };
  }, [events]);
}
