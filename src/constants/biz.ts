import { OrderLabel, OrderValue } from '@/typings/const';

export const ORDER_MAP = (value: OrderValue) => {
  const map: { [key: string]: OrderLabel } = {
    ALL: '全部',
    PEDDING_PAY: '待付款',
    PEDDING_DELIVERED: '待发货',
    PEDDING_RECEIVED: '待收货',
    PEDDING_COMMENT: '待评价',
    AFTER_SERVICES: '售后',
  };
  return map[value];
};
