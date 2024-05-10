interface ICustomTabBar {
  children: React.ReactNode;
}
interface IPageLayout {
  children: React.ReactNode;
  // initData?: {
  //   success?: boolean;
  //   loading?: boolean;
  //   msg?: string;
  //   data?: any;
  // };
  loading?: boolean;
  isSuccess?: boolean;
  errorMsg?: string;
  extraInfo?: {
    navbarTitle?: string;
  };
}
interface ILoadMore {
  loading?: boolean;
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
