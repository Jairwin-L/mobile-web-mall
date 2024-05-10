'use client';
import { type ReactNode } from 'react';
import ClientSideOnly from '../client-side-only';

interface IWrapper {
  children: ReactNode;
}

export default function Wrapper(props: IWrapper) {
  const { children } = props;
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  return (
    <ClientSideOnly>
      {children}
      {/* <Layout className={className}>
        <Header transparent={transparent} />
        <Container className={css['wrap-container']}>
          {!pathFlag ? <>{children}</> : <>{accessFlag ? <>{children}</> : <Auth />}</>}
        </Container>
        <Footer />
      </Layout> */}
    </ClientSideOnly>
  );
}
