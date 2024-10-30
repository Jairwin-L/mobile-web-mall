'use client';
import { del, queryList } from '@/api/modules/collection';
import { LoadMore, PageData, PageLayout } from '@/components';
import { Dialog, SwipeAction, SwipeActionRef } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import style from './page.module.scss';

export default function Collection() {
  const [dataSource, setDataSource] = useState([]);
  const [hasMore] = useState(true);
  const swipeActionRef = useRef<SwipeActionRef>(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  // 单个购物车删除，TODO:需要服务端支持
  const onDelItem = (item: IQueryShop.ListItem) => {
    Dialog.confirm({
      content: `确定要删除“${item.title}”嘛？`,
      onConfirm: async () => {
        const { success } = await del({
          id: Number(item.id),
        });
        if (!success) return;
        setDataSource(dataSource.filter((delItem: any) => delItem.id !== item.id));
      },
    });
    swipeActionRef.current?.close();
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
        navbarTitle: '收藏',
      }}
    >
      <PageData dataSource={dataSource}>
        <section className={style['shop-list-container']}>
          <ul>
            {dataSource.map((item: any) => {
              return (
                <SwipeAction
                  key={item.id}
                  ref={swipeActionRef}
                  rightActions={[
                    {
                      key: 'delete',
                      text: '删除',
                      color: 'danger',
                      onClick: () => onDelItem(item),
                    },
                  ]}
                >
                  <li>
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
                </SwipeAction>
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
