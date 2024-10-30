'use client';
import { queryList, queryRecommend } from '@/api/modules/biz';
import { Icon, LoadMore, PageLayout } from '@/components';
import { Swiper } from 'antd-mobile';
import { useEffect, useState } from 'react';
import style from './page.module.scss';

export default function PageRender() {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [leftDataSource, setLeftDataSource] = useState<IQueryBiz.List>([]);
  const [rightDataSource, setRightDataSource] = useState<IQueryBiz.List>([]);
  const [bannerData, setBannerData] = useState<IQueryBiz.Banner>([]);
  const [categoryNavData, setCategoryNavData] = useState<IQueryBiz.CategoryNav>([]);
  const [pagination, setPagination] = useState<CommonPage>({
    pageIndex: 1,
  });
  const onCategoryNav = (item: { icon: string; label: string }) => {
    console.log(`onCategoryNav----->：`, item);
  };
  const onGotoDetail = (item: IQueryBiz.ListItem) => {
    // push(`/detail/${item.id}`, { scroll: true });
    console.log(`item----->：`, item);
  };
  const onLoadMore = () => {
    setPagination((preState: any) => {
      return {
        ...preState,
        pageIndex: pagination.pageIndex + 1,
      };
    });
  };
  const fetchList = async () => {
    setLoading(true);
    try {
      const resp: IBaseResp<IQueryBiz.Resp> = await queryList({
        pageIndex: pagination.pageIndex,
        pageSize: 10,
      });
      const { data, success } = resp;
      console.log(`resp----->：`, resp);
      if (!success) return setLoading(false);
      const { banners = [], categoryNav = [] } = data || {};
      setBannerData(banners);
      setCategoryNavData(categoryNav);
    } catch (error) {
      console.error(`123----->：`, error);
    }
    setLoading(false);
  };
  const fetchRecommendList = async () => {
    setLoading(true);
    try {
      const resp: IBaseResp<IQueryBiz.Resp> = await queryRecommend({
        pageIndex: pagination.pageIndex,
        pageSize: 10,
      });
      const { data, meta, success, msg } = resp;
      // @ts-ignore
      setIsSuccess(success);
      // @ts-ignore
      setErrorMsg(msg);
      if (!success) return setLoading(false);
      const dataSource = data?.list || [];
      const leftData: any = [];
      const rightData: any = [];
      dataSource.forEach((item, index) => {
        if (index % 2 === 0) {
          leftData.push(item);
        }
        if (index % 2 === 1) {
          rightData.push(item);
        }
      });
      // const half = Math.ceil(dataSource.length / 2);
      // const leftData = dataSource.splice(0, half);
      // const rightData = dataSource.splice(-half);
      setLeftDataSource(leftDataSource.concat(leftData));
      setRightDataSource(rightDataSource.concat(rightData));
      // @ts-ignore
      setPagination(meta);
    } catch (error) {
      console.error(`----->：`, error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchList();
  }, []);
  useEffect(() => {
    fetchRecommendList();
  }, [pagination.pageIndex]);
  const dataSource = [...leftDataSource, ...rightDataSource];

  return (
    <PageLayout isSuccess={isSuccess} errorMsg={errorMsg} loading={loading}>
      {bannerData.length > 0 ? (
        <Swiper className={style['swiper-wrap']}>
          {bannerData.map((item) => {
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
      {categoryNavData.length > 0 ? (
        <div className={style['category-nav']}>
          <ul>
            {categoryNavData.map((item) => {
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
      {dataSource.length > 0 ? (
        <LoadMore
          loadMore={dataSource.length === pagination.totalCount}
          loading={loading}
          onLoadMore={onLoadMore}
        />
      ) : null}
    </PageLayout>
  );
}
