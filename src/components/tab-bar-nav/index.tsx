import { TabBar } from 'antd-mobile';
import { AppOutline, ShopbagOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import { useRouter } from 'next/router';
import style from './index.module.less';

const tabs = [
  {
    key: '/',
    title: '首页',
    icon: <AppOutline />,
  },
  {
    key: '/category',
    title: '分类',
    icon: <UnorderedListOutline />,
  },
  {
    key: '/shop',
    title: '购物车',
    icon: <ShopbagOutline />,
  },
  {
    key: '/mine',
    title: '我的',
    icon: <UserOutline />,
  },
];
function TabBarNav() {
  const { push, asPath } = useRouter();
  return (
    <div className={style['tab-bar-container']}>
      <TabBar activeKey={asPath} onChange={(value) => push(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

export default TabBarNav;
