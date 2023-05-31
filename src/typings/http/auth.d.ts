declare namespace IQueryAuth {
  type List = ListItem[];
  interface ListItem {
    id: string;
    superCategoryId?: string;
    name: string;
    frontDesc: string;
    bannerUrl: string;
    iconUrl?: string;
    wapBannerUrl?: string;
    categoryList?: ListItem[];
  }
  type Param = Partial<{
    id?: number;
    title?: string;
    price?: number;
  }> & {
    pageIndex: number;
    pageSize: number;
  };
  type Resp = List;
}
