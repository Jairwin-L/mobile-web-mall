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
  }
  type Resp = List;
}
