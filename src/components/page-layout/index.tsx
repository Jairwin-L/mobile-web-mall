import { usePathname, useRouter } from 'next/navigation';
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
  const { children, errorMsg, extraInfo, loading, isSuccess = true } = props || {};
  const { navbarTitle } = extraInfo || {};
  const pathname = usePathname();
  const { back, push, refresh } = useRouter();
  const tabbarFlag = TAB_BARS.includes(pathname);
  // TODO:need to want to think about it
  // const currentPath = `/${pathname.split('/').filter(Boolean)[0]}`;
  const minePath = pathname === '/mine';
  const onRefresh = () => {
    refresh();
  };

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
            <TabBar activeKey={pathname} onChange={(value) => push(value)}>
              {TABS.map((item) => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
              ))}
            </TabBar>
          </ElePlaceholder>
        ) : null}
      </>
    );
  };
  return (
    <>
      <TopNavBar />
      {loading ? <Loading /> : null}
      {!loading && !isSuccess && !minePath ? (
        <ErrorBlock fullPage description={<>{errorMsg || SYSTEM_ERROR_MSG}</>}>
          <Button color="danger" onClick={onRefresh}>
            <LoopOutline />
            重试
          </Button>
        </ErrorBlock>
      ) : null}
      {(isSuccess && !loading) || minePath ? children : null}
      <CustomTabbar />
    </>
  );
}
