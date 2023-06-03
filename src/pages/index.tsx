import { useState } from 'react';
import { useRouter } from 'next/router';
import { Swiper, Toast } from 'antd-mobile';
import { queryList } from '@/api/modules/biz';
import { Icon, LoadMore } from '@/components';
import { useFetchPageData } from '@/hooks';
import style from './index.module.less';

export async function getServerSideProps(context: IServerSideContext) {
  const { query } = context;
  const { pageIndex = 1 } = query || {};
  const { data, meta, success } = await queryList({
    pageIndex,
    pageSize: 10,
  });
  const dataSource = data?.list || [];
  const half = Math.ceil(dataSource.length / 2);
  const leftData = dataSource.splice(0, half);
  const rightData = dataSource.splice(-half);
  return {
    props: {
      data: {
        banners: data?.banners,
        leftData,
        rightData,
        categoryNav: data?.categoryNav,
      },
      meta,
      success,
    },
  };
}

export default function Main(props: IBaseResp<IQueryBiz.Resp>) {
  const { push, asPath } = useRouter();
  const { data, meta } = props;
  const { banners = [], leftData = [], rightData = [], categoryNav = [] } = data || {};
  const [hasMore, setHasMore] = useState(true);
  const [leftDataSource, setLeftDataSource] = useState(leftData || []);
  const [rightDataSource, setRightDataSource] = useState(rightData || []);
  const onCategoryNav = (item: { icon: string; label: string }) => {
    console.log(`onCategoryNav----->：`, item);
  };
  const onGotoDetail = (item: IQueryBiz.ListItem) => {
    push(`/detail/${item.id}`, undefined, { shallow: true });
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
    setLeftDataSource((val) => [...(val || []), ...(leftData || [])]);
    setRightDataSource((val) => [...(val || []), ...(rightData || [])]);
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
  const dataSource = [...leftDataSource, ...rightDataSource] || [];

  return (
    <>
      {banners.length > 0 ? (
        <Swiper className={style['swiper-wrap']}>
          {banners.map((item) => {
            return (
              <Swiper.Item key={item.id}>
                <div
                  className={style['swiper-image']}
                  style={{
                    backgroundImage: `url(${item.imgUrl})`,
                  }}
                />
              </Swiper.Item>
            );
          })}
        </Swiper>
      ) : null}
      {categoryNav.length > 0 ? (
        <div className={style['category-nav']}>
          <ul>
            {categoryNav.map((item) => {
              return (
                <li key={item.icon} onClick={() => onCategoryNav(item)}>
                  <Icon className={style['category-icon']} type={item.icon} />
                  <span className={style['category-label']}>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {dataSource.length > 0 ? (
        <div className={style['goods-list']}>
          <ul>
            {leftDataSource?.map((item) => {
              return (
                <li key={item.id} onClick={() => onGotoDetail(item)}>
                  <div
                    className={style['goods-pic-url']}
                    style={{
                      backgroundImage: `url(${item.goodsPicUrl})`,
                    }}
                  />
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </li>
              );
            })}
          </ul>
          <ul>
            {rightDataSource?.map((item) => {
              return (
                <li key={item.id} onClick={() => onGotoDetail(item)}>
                  <div
                    className={style['goods-pic-url']}
                    style={{
                      backgroundImage: `url(${item.goodsPicUrl})`,
                    }}
                  />
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <LoadMore
        loadMore={dataSource.length === meta!.totalCount}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />
    </>
  );
}
