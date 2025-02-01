'use client';
import { Button, Dialog, SwipeAction, Tag } from 'antd-mobile';
import { SwipeActionRef } from 'antd-mobile/es/components/swipe-action';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { destroy, queryList } from '@/api/modules/address';
import { ElePlaceholder, Icon, LoadMore, PageData, PageLayout } from '@/components';
import style from './page.module.scss';

export default function PageRender() {
  const { push } = useRouter();
  const [dataSource, setDataSource] = useState([]);
  const [hasMore] = useState(true);
  const swipeActionRef = useRef<SwipeActionRef>(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  const onEditAddress = (item: IQueryAddress.ListItem) => {
    push(`./address/edit?id=${item.id}`);
  };
  const onDelete = async (item: IQueryAddress.ListItem) => {
    Dialog.confirm({
      content: '确认删除该地址？',
      onConfirm: async () => {
        await destroy({
          id: item.id,
        });
      },
    });
  };
  const onLoadMore = () => {
    if (!hasMore) return;
    console.log(`123----->：`, 123);
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
        navbarTitle: '地址',
      }}
    >
      <PageData dataSource={[dataSource]}>
        <div className={style['address-container']}>
          <ul>
            {dataSource.map((item: IQueryAddress.ListItem) => {
              return (
                <SwipeAction
                  key={item.id}
                  ref={swipeActionRef}
                  rightActions={[
                    {
                      key: 'delete',
                      text: '删除',
                      color: 'danger',
                      onClick: () => onDelete(item),
                    },
                  ]}
                >
                  <li key={item.id} onClick={() => onEditAddress(item)}>
                    <div className={style['address-user']}>
                      {item.username}
                      <span>{item.phone}</span>
                      <Tag color="primary" fill="outline">
                        默认
                      </Tag>
                    </div>
                    <div className={style['address-info']}>
                      {item.address}
                      <Icon
                        type="edit"
                        className={style['address-edit']}
                        onClick={() => onEditAddress(item)}
                      />
                    </div>
                  </li>
                </SwipeAction>
              );
            })}
          </ul>
          <LoadMore
            // loadMore={dataSource?.length === meta?.totalCount}
            // hasMore={hasMore}
            onLoadMore={onLoadMore}
          />
        </div>
      </PageData>
      <ElePlaceholder placeholderClass="placeholder-class" className={style['add-address-btn']}>
        <Button block color="primary" size="middle" onClick={() => push('./address/add')}>
          <Icon type="icon-create" className={style['icon-add']} />
          添加收货地址
        </Button>
      </ElePlaceholder>
    </PageLayout>
  );
}
