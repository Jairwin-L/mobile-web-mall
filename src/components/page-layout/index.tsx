import { Button, ErrorBlock, NavBar } from 'antd-mobile';
import { ElePlaceholder, Loading } from '@/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SYSTEM_ERROR_MSG } from '@/constants/api';
import { LoopOutline } from 'antd-mobile-icons';
import style from './index.module.less';

export default function PageLayout(props: IPageLayout) {
  const { reload } = useRouter();
  const [loading, setLoading] = useState(true);
  const { children, initData, extraInfo } = props || {};
  const { msg = '', success = false, data } = initData || {};
  const { navbarTitle } = extraInfo || {};
  const { back } = useRouter();
  const TopNavBar = () => {
    return (
      <>
        {navbarTitle ? (
          <ElePlaceholder fixType="TOP" placeholderClass={style['placeholder-class']}>
            <NavBar onBack={() => back()}>{navbarTitle}</NavBar>
          </ElePlaceholder>
        ) : null}
      </>
    );
  };
  useEffect(() => {
    if (JSON.stringify(data)) {
      setLoading(false);
    }
  }, []);
  // TODO:好像还有点问题
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
  return (
    <>
      <TopNavBar />
      {children}
    </>
  );
}
