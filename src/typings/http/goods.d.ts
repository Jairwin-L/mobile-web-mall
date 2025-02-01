declare namespace IQueryGoods {
  interface Param {
    id?: number;
  }

  interface DelParam {
    id: number;
  }
  interface Resp {
    id: number;
    name: string;
    price: number;
    sku: any;
    collection: boolean;
    banners: Array<{
      id: string;
      sku: any;
      imgUrl: string;
    }>;
    title: string;
  }
}
