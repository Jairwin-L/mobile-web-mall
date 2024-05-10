import { type ReactNode } from 'react';
import { Metadata } from 'next';
import Wrapper from '@/components/wrapper';
import '../styles/globals.scss';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'mobile-web-mall',
    // applicationName: SITE_NAME,
    // description: DESCRIPTION,
    // keywords: KEYWORDS,
    // authors: [{ name: 'Jairwin', url: URL }],
    // creator: 'Jairwin',
    // publisher: 'Jairwin',
    // openGraph: {
    //   title: SITE_NAME,
    //   description: DESCRIPTION,
    //   url: URL,
    //   siteName: SITE_NAME,
    //   images: [
    //     {
    //       url: IMAGE_URL,
    //       alt: SITE_NAME,
    //     },
    //   ],
    //   type: 'website',
    // },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
      <meta name="renderer" content="webkit" />
      <link rel="apple-touch-icon" sizes="57x57" href="/icon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/icon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/icon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/icon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/icon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/icon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/icon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/icon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
      <link rel="manifest" href="/icon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/icon/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
