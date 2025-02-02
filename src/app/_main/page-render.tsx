'use client';
import { Swiper } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { queryList, queryRecommend } from '@/api/modules/biz';
import { Icon, LoadMore, PageLayout } from '@/components';
import style from './page.module.scss';

export default function PageRender() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
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
    push(`/detail/${item.id}`, { scroll: true });
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
    try {
      const resp = await queryList();
      const { data, success } = resp;
      if (!success) return setLoading(false);
      const { banners = [], categoryNav = [] } = data || {};
      setBannerData(banners);
      setCategoryNavData(categoryNav);
    } catch (error) {
      console.error(`123----->：`, error);
    }
  };
  const fetchRecommendList = async (firstLoad = false) => {
    if (firstLoad) {
      setLoading(true);
    } else {
      setListLoading(true);
    }
    try {
      const resp = await queryRecommend({
        pageIndex: pagination.pageIndex,
        pageSize: 10,
      });
      const { data, success = false, msg } = resp;
      setIsSuccess(success);
      setErrorMsg(msg);
      setLoading(false);
      setListLoading(false);
      if (!success) return;
      const dataSource = data.list || [];
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
      const page = data.meta;
      setLeftDataSource(leftDataSource.concat(leftData));
      setRightDataSource(rightDataSource.concat(rightData));
      setPagination(page);
      setLoadMore([...dataSource, ...data.list].length === page.totalCount);
    } catch (error) {
      console.error(`----->：`, error);
    }
    setLoading(false);
    setListLoading(false);
  };
  useEffect(() => {
    fetchList();
  }, []);
  useEffect(() => {
    if (pagination.pageIndex !== 1) {
      fetchRecommendList();
    }
  }, [pagination.pageIndex]);
  useEffect(() => {
    fetchRecommendList(pagination.pageIndex === 1);
  }, []);
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
        <>
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
          <LoadMore loadMore={loadMore} loading={listLoading} onLoadMore={onLoadMore} />
        </>
      ) : null}
    </PageLayout>
  );
}
