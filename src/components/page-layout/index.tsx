import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, ErrorBlock, NavBar, Popover, TabBar } from 'antd-mobile';
import { Action } from 'antd-mobile/es/components/popover';
import { LoopOutline } from 'antd-mobile-icons';
import { SYSTEM_ERROR_MSG, TABS, TAB_BARS } from '@/constants';
import Loading from '../loading';
import Icon from '../icon';
import ElePlaceholder from '../ele-placeholder';
import style from './index.module.less';

const actions: Action[] = [
  { key: '/', text: '首页' },
  { key: '/category', text: '类目' },
  { key: '/shop', text: '购物车' },
  { key: '/mine', text: '我的' },
];

export default function PageLayout(props: IPageLayout) {
  const { children, initData, extraInfo } = props || {};
  const { msg = '', success = false } = initData || {};
  const { navbarTitle } = extraInfo || {};
  const { reload, isReady, back, push, asPath } = useRouter();
  const [loading, setLoading] = useState(true);
  const tabbarFlag = TAB_BARS.includes(asPath);
  // TODO:need to want to think about it
  // const currentPath = `/${asPath.split('/').filter(Boolean)[0]}`;
  const minePath = asPath === '/mine';

  const TopNavBar = () => {
    return (
      <>
        {navbarTitle ? (
          <ElePlaceholder fixType="TOP" placeholderClass="placeholder-class">
            <NavBar
              right={
                <Popover.Menu
                  actions={actions.map((action) => action)}
                  onAction={(node) => push(node.key as string)}
                  placement="bottom-start"
                  trigger="click"
                >
                  <Icon className={style['icon-more']} type="more" />
                </Popover.Menu>
              }
              onBack={() => back()}
            >
              {navbarTitle}
            </NavBar>
          </ElePlaceholder>
        ) : null}
      </>
    );
  };
  const CustomTabbar = () => {
    return (
      <>
        {tabbarFlag ? (
          <ElePlaceholder placeholderClass="placeholder-class" className={style['custom-tab-bar']}>
            <TabBar activeKey={asPath} onChange={(value) => push(value)}>
              {TABS.map((item) => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
              ))}
            </TabBar>
          </ElePlaceholder>
        ) : null}
      </>
    );
  };
  useEffect(() => {
    if (isReady) {
      setLoading(false);
    }
  }, [isReady]);
  return (
    <>
      <TopNavBar />
      {loading ? <Loading /> : null}
      {!loading && !success && !minePath ? (
        <ErrorBlock fullPage description={<>{msg || SYSTEM_ERROR_MSG}</>}>
          <Button color="danger" onClick={() => reload()}>
            <LoopOutline />
            重试
          </Button>
        </ErrorBlock>
      ) : null}
      {(success && !loading) || minePath ? children : null}
      <CustomTabbar />
    </>
  );
}
