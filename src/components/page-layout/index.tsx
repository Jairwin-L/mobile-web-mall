import { useEffect, useState } from 'react';
import { Button, ErrorBlock, NavBar } from 'antd-mobile';
import { ElePlaceholder, Loading } from '@/components';
import { useRouter } from 'next/router';
import { SYSTEM_ERROR_MSG } from '@/constants/api';
import { LoopOutline } from 'antd-mobile-icons';

export default function PageLayout(props: IPageLayout) {
  const { reload, isReady, back } = useRouter();
  const [loading, setLoading] = useState(true);
  const { children, initData, extraInfo } = props || {};
  const { msg = '', success = false } = initData || {};
  const { navbarTitle, pageNormalShow = true } = extraInfo || {};
  const TopNavBar = () => {
    return (
      <>
        {navbarTitle ? (
          <ElePlaceholder fixType="TOP" placeholderClass="placeholder-class">
            <NavBar onBack={() => back()}>{navbarTitle}</NavBar>
          </ElePlaceholder>
        ) : null}
      </>
    );
  };
  useEffect(() => {
    if (isReady && pageNormalShow) {
      setLoading(false);
    }
  }, [isReady]);
  // TODO:好像还有点问题
  if (pageNormalShow) {
    if (loading) {
      return <Loading />;
    }
    if (!loading && !success) {
      return (
        <>
          <TopNavBar />
          <ErrorBlock fullPage description={<>{msg || SYSTEM_ERROR_MSG}</>}>
            <Button size="small" color="danger" onClick={() => reload()}>
              <LoopOutline />
              重试
            </Button>
          </ErrorBlock>
        </>
      );
    }
  }
  return (
    <>
      <TopNavBar />
      {children}
    </>
  );
}
