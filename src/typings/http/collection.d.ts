declare namespace IQueryCollection {
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
  interface Param {
    id?: number;
    pageIndex?: number;
    pageSize?: number;
  }
  type Resp = List;
}
