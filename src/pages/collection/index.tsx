import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, SwipeAction, SwipeActionRef, Toast } from 'antd-mobile';
import { del, queryList } from '@/api/modules/collection';
import { LoadMore, PageData, PageLayout } from '@/components';
import { useFetchPageData } from '@/hooks';
import style from './index.module.less';

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

export default function Collection(props: IBaseResp<IQueryCollection.Resp>) {
  const { data, meta } = props;
  const { push, asPath } = useRouter();
  const [dataSource, setDataSource] = useState(data || []);
  const [hasMore, setHasMore] = useState(true);
  const swipeActionRef = useRef<SwipeActionRef>(null);
  // 单个购物车删除，TODO:需要服务端支持
  const onDelItem = (item: IQueryShop.ListItem) => {
    Dialog.confirm({
      content: `确定要删除“${item.title}”嘛？`,
      onConfirm: async () => {
        const { success } = await del({
          id: Number(item.id),
        });
        if (!success) return;
        setDataSource(dataSource.filter((delItem) => delItem.id !== item.id));
      },
    });
    swipeActionRef.current?.close();
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
        query: { pageIndex: meta!.pageIndex + 1 },
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
        navbarTitle: '收藏',
      }}
    >
      <PageData dataSource={data}>
        <section className={style['shop-list-container']}>
          <ul>
            {dataSource.map((item) => {
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
          loadMore={dataSource.length === meta!.totalCount}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
        />
      </PageData>
    </PageLayout>
  );
}
