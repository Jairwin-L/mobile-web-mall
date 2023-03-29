import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Dialog, SwipeAction } from 'antd-mobile';
import { SwipeActionRef } from 'antd-mobile/es/components/swipe-action';
import { ElePlaceholder, Icon } from '@/components';
import { del, query } from '@/api/modules/address';
import style from './index.module.less';

export async function getServerSideProps() {
  const resp = await query({
    pageIndex: 1,
    pageSize: 10,
  });
  return {
    props: {
      model: resp,
    },
  };
}

export default function Address(props: IServerSideProps<IQueryAddress.Resp>) {
  const swipeActionRef = useRef<SwipeActionRef>(null);
  const { model } = props;
  const { push } = useRouter();
  console.log(`model----->：`, model);
  const [list] = useState<any>(model.data);
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
  return (
    <>
      <div className={style['address-container']}>
        <ul>
          {list.map((item: any) => {
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
                    <span className={style['address-mark']}>默认</span>
                  </div>
                  <div className={style['address-info']}>
                    {item.address}
                    <Icon
                      type="edit-fill"
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
      <ElePlaceholder placeholderClass={style['placeholder-class']}>
        <Button block color="primary" size="middle" onClick={() => push('./address/add')}>
          <Icon type="icon-create" className={style['icon-add']} />
          添加收货地址
        </Button>
      </ElePlaceholder>
    </>
  );
}
