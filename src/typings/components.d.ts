interface ICustomTabBar {
  children: React.ReactNode;
}
interface IPageLayout {
  children: React.ReactNode;
  initData?: {
    success?: boolean;
    msg?: string;
    data?: any;
  };
  extraInfo?: {
    navbarTitle?: string;
  };
}
interface ILoadMore {
  hasMore?: boolean;
  loadMore?: boolean;
  onLoadMore?: () => void;
}
