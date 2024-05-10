'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Tabs } from 'antd-mobile';
import { getQueryParams } from '@/utils';
import { LoadMore, PageData, PageLayout } from '@/components';
import { queryList } from '@/api/modules/order';
import { OrderItem, OrderEnum, OrderValue } from '@/typings/const';
import style from './index.module.less';

const ORDER_OPTION: OrderItem[] = [
  {
    icon: 'all',
    label: '全部',
    value: OrderEnum.ALL,
  },
  {
    icon: 'pedding-pay',
    label: '待付款',
    value: OrderEnum.PEDDING_PAY,
  },
  {
    icon: 'pedding-received',
    label: '待发货',
    value: OrderEnum.PEDDING_DELIVERED,
  },
  {
    icon: 'pedding-delivered',
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

export default function Order() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [dataSource, setDataSource] = useState([]);
  const [hasMore] = useState(true);
  const query = getQueryParams(location.search);
  const [orderStatus, setOrderStatus] = useState<OrderValue>(query.status || OrderEnum.ALL);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  const onTabsChange = (key: OrderValue) => {
    if (key === orderStatus) return;
    setOrderStatus(key);
    push(`${pathname}?pageIndex=1&orderStatus=${key}`, {
      scroll: false,
    });
    setDataSource([]);
  };
  const onLoadMore = () => {
    if (!hasMore) return;
    console.log(`213----->：`, 213);
  };
  const fetchList = async () => {
    setLoading(true);
    try {
      const resp = await queryList({
        pageIndex: 1,
        pageSize: 10,
      });
      const { data, success } = resp;
      setSuccess(success as boolean);
      if (!success) return setLoading(false);
      // @ts-ignore
      setDataSource(data);
    } catch (error) {
      console.error(`123----->：`, error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <PageLayout
      isSuccess={isSuccess}
      errorMsg={''}
      loading={loading}
      extraInfo={{
        navbarTitle: '订单',
      }}
    >
      <Tabs
        activeKey={orderStatus}
        className={style['order-tabs-wrap']}
        onChange={(key) => onTabsChange(key as OrderValue)}
      >
        {ORDER_OPTION.map((item) => {
          return <Tabs.Tab title={item.label} key={item.value} />;
        })}
      </Tabs>
      <PageData dataSource={dataSource}>
        <section className={style['shop-list-container']}>
          <ul>
            {dataSource.map((item: any) => {
              return (
                <li key={item.id}>
                  <div
                    className={style['goods-pic-url']}
                    style={{
                      backgroundImage: `url(${item.goodsPicUrl})`,
                    }}
                  />
                  <div className={style['shop-desc']}>
                    <p className={style['shop-title']}>{item.title}</p>
                    <div className={style['shop-money']}>
                      <span>¥{item.price ?? 0}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <LoadMore
          // loadMore={dataSource.length === meta!.totalCount}
          // hasMore={hasMore}
          onLoadMore={onLoadMore}
        />
      </PageData>
    </PageLayout>
  );
}
