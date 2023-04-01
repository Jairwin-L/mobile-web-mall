declare namespace IQueryShop {
  type List = ListItem[];
  interface ListItem {
    id?: number;
    title?: string;
    price?: number;
    buyCount?: number;
    url?: string;
    nextImage?: string;
    isSelected?: boolean;
    count?: number;
  }
  interface DelParam {
    id: number;
  }
  type Resp = List;
}
