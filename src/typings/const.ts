export type OrderLabel =
  | "全部"
  | "待付款"
  | "待发货"
  | "待收货"
  | "待评价"
  | "售后";
export type OrderValue =
  | "ALL"
  | "PEDDING_PAY"
  | "PEDDING_DELIVERED"
  | "PEDDING_RECEIVED"
  | "PEDDING_COMMENT"
  | "AFTER_SERVICES";
export enum OrderEnum {
  ALL = "ALL",
  PEDDING_PAY = "PEDDING_PAY",
  PEDDING_DELIVERED = "PEDDING_DELIVERED",
  PEDDING_RECEIVED = "PEDDING_RECEIVED",
  PEDDING_COMMENT = "PEDDING_COMMENT",
  AFTER_SERVICES = "AFTER_SERVICES",
}

export interface OrderItem {
  icon:
    | "all"
    | "sale"
    | "pedding-pay"
    | "pedding-delivered"
    | "pedding-comment"
    | "pedding-received";
  label: OrderLabel;
  value: OrderValue;
}

export interface Operate {
  icon: "\ue606" | "\ue683" | "\ue600" | "\ue681";
  label: "修改密码" | "帮助中心" | "收藏" | "地址";
  url: "change-password" | "help" | "collect" | "address";
}

export interface TopCateGory {
  label:
    | "推荐"
    | "居家生活"
    | "服饰鞋包"
    | "美食酒水"
    | "个护清洁"
    | "母婴亲子"
    | "运动旅行"
    | "数码家电"
    | "严选全球";
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}
