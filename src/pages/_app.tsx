import type { AppProps } from 'next/app';
import style from './global.less';

export default function App({ Component, pageProps }: AppProps) {
  return <Component style={style} {...pageProps} />;
}
