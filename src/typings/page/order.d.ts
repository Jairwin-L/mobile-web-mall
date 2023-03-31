interface OrderItem {
  icon:
    | 'all'
    | 'sale'
    | 'pedding-pay'
    | 'pedding-delivery'
    | 'pedding-comment'
    | 'pedding-received';
  label: OrderLabel;
  value: OrderValue;
}

type OrderLabel = '全部' | '待付款' | '待发货' | '待收货' | '待评价' | '售后';
type OrderValue =
  | 'ALL'
  | 'PEDDING_PAY'
  | 'PEDDING_DELIVERED'
  | 'PEDDING_RECEIVED'
  | 'PEDDING_COMMENT'
  | 'AFTER_SERVICES';
