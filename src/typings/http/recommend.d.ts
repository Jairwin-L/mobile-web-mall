declare namespace IQueryRecommend {
  type List = ListItem[];
  interface ListItem {
    id: number;
    title: string;
    price: number;
    goodsPicUrl: string;
  }
  type Banner = Array<{
    id: number;
    imgUrl: string;
  }>;
  type CategoryNav = Array<{
    icon: string;
    label: string;
  }>;
  type Param = Partial<{
    id?: number;
    title?: string;
    price?: number;
  }> & {
    pageIndex: number;
    pageSize: number;
  };

  interface DelParam {
    id: number;
  }
  interface Resp {
    list: List;
    meta: CommonPage;
  }
}
