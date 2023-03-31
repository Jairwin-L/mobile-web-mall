import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Dialog, SwipeAction, Tag, Toast } from 'antd-mobile';
import { SwipeActionRef } from 'antd-mobile/es/components/swipe-action';
import { ElePlaceholder, Icon, LoadMore, PageLayout } from '@/components';
import { del, queryList } from '@/api/modules/address';
import { useFetchPageData } from '@/hooks';
import style from './index.module.less';

export default function Address(props: IServerSideProps<IQueryAddress.Resp>) {
  const { initData } = props;
  const { push, asPath } = useRouter();
  const [dataSource, setDataSource] = useState(initData.data);
  const [hasMore, setHasMore] = useState(true);
  const swipeActionRef = useRef<SwipeActionRef>(null);
  const onEditAddress = (item: IQueryAddress.ListItem) => {
    push(`./address/edit?id=${item.id}`);
  };
  const onDelete = async (item: IQueryAddress.ListItem) => {
    Dialog.confirm({
      content: '确认删除该地址？',
      onConfirm: async () => {
        await del({
          id: item.id,
        });
      },
    });
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
    // @ts-ignore TODO:
    setDataSource((val) => [...val, ...initData.data]);
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
        query: { pageIndex: initData!.meta!.pageIndex + 1 },
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
      initData={initData}
      extraInfo={{
        navbarTitle: '地址',
      }}
    >
      <div className={style['address-container']}>
        <ul>
          {dataSource?.map((item: IQueryAddress.ListItem) => {
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
      </div>
      <LoadMore
        loadMore={dataSource?.length === initData.meta?.totalCount}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />
      <ElePlaceholder placeholderClass="placeholder-class">
        <Button block color="primary" size="middle" onClick={() => push('./address/add')}>
          <Icon type="icon-create" className={style['icon-add']} />
          添加收货地址
        </Button>
      </ElePlaceholder>
    </PageLayout>
  );
}

export async function getServerSideProps(context: IServerSideContext) {
  const { query } = context;
  const { pageIndex = 1 } = query || {};
  const resp = await queryList({
    pageIndex,
    pageSize: 10,
  });
  return {
    props: {
      initData: resp,
    },
  };
}
