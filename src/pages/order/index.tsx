import { useState } from 'react';
import { Tabs, Toast } from 'antd-mobile';
import { useRouter } from 'next/router';
import { OrderItem, OrderEnum, OrderValue } from '@/typings/const';
import { getQueryParams } from '@/utils';
import { LoadMore, PageData, PageLayout } from '@/components';
import { useFetchPageData } from '@/hooks';
import { queryList } from '@/api/modules/order';
import style from './index.module.less';

export const ORDER_OPTION: OrderItem[] = [
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

export async function getServerSideProps(context: IServerSideContext) {
  const { query } = context;
  const { pageIndex = 1 } = query || {};
  const resp = await queryList({
    pageIndex,
    pageSize: 10,
  });
  return {
    props: resp,
  };
}

export default function Order(props: IBaseResp<IQueryOrder.Resp>) {
  const { data, meta } = props;
  const { push, asPath } = useRouter();
  const [dataSource, setDataSource] = useState(data || []);
  const [hasMore, setHasMore] = useState(true);
  const query = getQueryParams(location.search);
  const [orderStatus, setOrderStatus] = useState<OrderValue>(query.status || OrderEnum.ALL);
  const onTabsChange = (key: OrderValue) => {
    if (key === orderStatus) return;
    setOrderStatus(key);
    push(
      {
        query: { pageIndex: 1, orderStatus: key },
      },
      asPath,
      {
        scroll: false,
      },
    );
    setDataSource([]);
  };
  const onFetchStart = (url: string) => {
    if (asPath !== url) return;
    setHasMore(false);
    Toast.show({
      icon: 'loading',
      content: '加载中……',
    });
  };
  const onFetchComplete = () => {
    setDataSource((val) => [...(val || []), ...(data || [])]);
    setHasMore(true);
    Toast.clear();
  };
  const onFetchError = (error: any) => {
    if (error) {
      setHasMore(true);
      Toast.clear();
    }
  };
  const onLoadMore = () => {
    if (!hasMore) return;
    push(
      {
        query: { pageIndex: meta!.pageIndex + 1, orderStatus },
      },
      asPath,
      {
        scroll: false,
      },
    );
  };
  useFetchPageData(onFetchStart, onFetchComplete, onFetchError);

  return (
    <PageLayout
      initData={props}
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
      <PageData dataSource={data}>
        <section className={style['shop-list-container']}>
          <ul>
            {dataSource.map((item) => {
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
          loadMore={dataSource.length === meta!.totalCount}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
        />
      </PageData>
    </PageLayout>
  );
}
