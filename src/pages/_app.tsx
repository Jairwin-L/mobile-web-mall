import type { AppProps } from 'next/app';
require('./global.less');

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
