declare namespace IQueryOrder {
  type List = ListItem[];
  interface ListItem {
    id?: number;
    goodsPicUrl?: string;
    title?: string;
    price?: number;
  }
  interface DelParam {
    id: number;
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
