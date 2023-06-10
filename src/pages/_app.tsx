import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CustomTabBar } from '@/components';
import { APP_NAME } from '@/constants';
import style from './global.less';

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
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="Author" content="Jairwin" />
        <meta name="Keywords" content="mobile-web-mall" />
        <meta name="Description" content="mobile-web-mall" />
        <title>{APP_NAME}</title>
      </Head>
      <CustomTabBar>
        <Component style={style} {...pageProps} />
      </CustomTabBar>
    </>
  );
}
