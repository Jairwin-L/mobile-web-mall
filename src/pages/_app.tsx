import type { AppProps } from 'next/app';
import { CustomTabBar } from '@/components';
import style from './global.less';

type IAppProps = AppProps & {
  router: any;
};

export default function App(props: IAppProps) {
  const { Component, pageProps } = props || {};
  return (
    <CustomTabBar>
      <Component style={style} {...pageProps} />
    </CustomTabBar>
  );
}
