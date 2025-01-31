import { AppOutline, ShopbagOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

export const TABS = [
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
    key: '/account',
    title: '我的',
    icon: <UserOutline />,
  },
];
