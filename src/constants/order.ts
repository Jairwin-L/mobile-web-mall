import { OrderEnum } from '@/enum';

export const ORDER_OPTION: OrderItem[] = [
  {
    icon: 'pedding-pay',
    label: '待付款',
    value: OrderEnum.PEDDING_PAY,
  },
  {
    icon: 'pedding-delivery',
    label: '待发货',
    value: OrderEnum.PEDDING_DELIVERED,
  },
  {
    icon: 'pedding-received',
    label: '待收货',
    value: OrderEnum.PEDDING_RECEIVED,
  },
  {
    icon: 'pedding-comment',
    label: '待评价',
    value: OrderEnum.PEDDING_COMMENT,
  },
  {
    icon: 'sale',
    label: '售后',
    value: OrderEnum.AFTER_SERVICES,
  },
];
