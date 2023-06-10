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
    pageNormalShow?: boolean;
  };
}
interface ILoadMore {
  hasMore?: boolean;
  loadMore?: boolean;
  onLoadMore?: () => void;
}
interface ILoading {
  text?: string;
}

interface IPageData {
  dataSource: any;
  children: React.ReactNode;
}

interface IElePlaceholder {
  fixType?: 'BOTTOM' | 'TOP';
  placeholderClass?: string;
  className?: string;
  children: React.ReactNode;
}
