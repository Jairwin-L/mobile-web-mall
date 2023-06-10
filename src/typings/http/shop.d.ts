declare namespace IQueryShop {
  type List = ListItem[];
  interface ListItem {
    id?: number;
    title?: string;
    price?: number;
    buyCount?: number;
    goodsPicUrl?: string;
    nextImage?: string;
    isSelected?: boolean;
    amount?: number;
  }
  interface Param {
    id: number;
  }
  interface BuildOrderResp {
    buildOrderData: IBaseResp<IQueryShop.DetailResp>;
    addressData: IBaseResp<IQueryAddress.Resp>;
  }
  interface DetailResp {
    id: number;
    title?: string;
    price?: number;
    goodsPicUrl?: string;
    collection?: boolean;
    sku?: {
      imgUrl?: string;
      weight?: any;
      amount?: number;
      color?: any;
    };
    banners?: Array<{
      id: number;
      imgUrl: string;
    }>;
  }
  type Resp = List;
}
