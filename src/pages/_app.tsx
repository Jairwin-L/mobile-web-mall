import type { AppProps } from 'next/app';
import { CustomTabBar } from '@/components';
import style from './global.less';
import { useEffect, useState } from 'react';

type IAppProps = AppProps & {
  router: any;
};

export default function App(props: IAppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const { Component, pageProps } = props || {};
  return (
    <CustomTabBar>
      <Component style={style} {...pageProps} />
    </CustomTabBar>
  );
}
