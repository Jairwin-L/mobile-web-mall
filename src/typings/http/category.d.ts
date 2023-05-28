declare namespace IQueryCategory {
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
  type Resp = List;
}
