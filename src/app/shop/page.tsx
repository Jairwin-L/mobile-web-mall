'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Dialog, SwipeAction, Stepper, Toast } from 'antd-mobile';
import { SwipeActionRef } from 'antd-mobile/es/components/swipe-action';
import { PageLayout, ElePlaceholder, Icon, PageData } from '@/components';
import { del, queryList } from '@/api/modules/shop';
import style from './index.module.less';

export default function Shop() {
  const swipeActionRef = useRef<SwipeActionRef>(null);
  const [allSelected, setAllSelected] = useState<any>(false);
  const [list, setList] = useState<IQueryShop.Resp>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedList, setSelectedList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  // 下单支付，TODO:需要服务端支持
  const onPayOrder = () => {
    if (selectedList.length <= 0) {
      return Toast.show({
        content: '您还没有选择宝贝哦',
      });
    }
  };
  // 商品删除
  const onDelAll = () => {
    if (selectedList.length <= 0) {
      return Toast.show({
        content: '您还没有选择宝贝哦',
      });
    }
  };
  // 单个购物车删除，TODO:需要服务端支持
  const onDelItem = (item: IQueryShop.ListItem) => {
    Dialog.confirm({
      content: `确定要删除“${item.title}”嘛？`,
      onConfirm: async () => {
        const { success } = await del({
          id: Number(item.id),
        });
        if (!success) return;
        setList(list.filter((delItem) => delItem.id !== item.id));
      },
    });
    swipeActionRef.current?.close();
  };
  // 单个商品选择和不选择
  const onToggleSelected = (index: number) => {
    list[index].isSelected = !list[index].isSelected;
    getSelectedShop(list, list);
  };
  // 单个商品价格计算，TODO:需要服务端支持
  const onCalculatePrice = (index: number, value: number) => {
    list[index].amount = value;
    const priceList = list.filter((item) => item.isSelected);
    const total = priceList.reduce((acc: any, cur: any) => acc + cur.price * cur.amount, 0);
    setTotalPrice(total);
    setList([...list]);
  };
  // 全选和非全选
  const onSelectedAll = () => {
    const dataList = list?.map((item) => {
      return {
        ...item,
        isSelected: selectedList.length === list.length ? !item.isSelected : true,
      };
    });
    getSelectedShop(dataList, dataList);
  };
  // 计算已选商品价格，TODO:需要服务端支持
  const getSelectedShop = (selectedShopList: IQueryShop.List, originList: IQueryShop.List) => {
    const priceList = selectedShopList.filter((item: IQueryShop.ListItem) => item.isSelected);
    const total = priceList.reduce((acc: any, cur: any) => acc + cur.price * cur.amount, 0);
    setTotalPrice(total);
    setSelectedList(priceList);
    setList(originList);
    setAllSelected(priceList.length === originList.length);
  };
  const fetchList = async () => {
    setLoading(true);
    try {
      const resp = await queryList();
      const { data, success } = resp;
      setSuccess(success as boolean);
      if (!success) return setLoading(false);
      // @ts-ignore
      setList(data);
    } catch (error) {
      console.error(`123----->：`, error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <PageLayout isSuccess={isSuccess} errorMsg={''} loading={loading}>
      <main className={style['base-container']}>
        <PageData dataSource={list}>
          <section className={style['header-title']}>
            <div className={style.title}>
              <span>
                购物车共计<span className={style.number}>{list?.length ?? '--'}</span>
                件商品
              </span>
            </div>
            <div className={style['delete-btn']} onClick={onDelAll}>
              删除
            </div>
          </section>
          <section className={style['shop-list-container']}>
            <ul>
              {list.map((item, index) => {
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
                      <Icon
                        className={style['checkbox-icon']}
                        type={item?.isSelected ? 'selected' : 'unselected'}
                        onClick={() => onToggleSelected(index)}
                      />
                      <div className={style['shop-img-container']}>
                        <Image
                          src={item.goodsPicUrl as string}
                          alt={item.title as string}
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className={style['shop-desc']}>
                        <p className={style['shop-title']}>{item.title}</p>
                        <div className={style['shop-money']}>
                          <span>¥{item.price ?? 0}</span>
                          <Stepper
                            value={item.amount}
                            min={1}
                            max={100000}
                            onChange={(value: number) => onCalculatePrice(index, value)}
                          />
                        </div>
                      </div>
                    </li>
                  </SwipeAction>
                );
              })}
            </ul>
          </section>
          <ElePlaceholder className={style['shop-footer']}>
            <div className={style['shop-selected']} onClick={onSelectedAll}>
              <Icon
                className={style['checkbox-icon']}
                type={allSelected ? 'selected' : 'unselected'}
              />
              <span>全选</span>
            </div>
            <div className={style['footer-price']}>
              <div className={style['total-price']}>合计：¥{totalPrice}</div>
              <div className={style['calculate-btn']} onClick={onPayOrder}>
                结算
              </div>
            </div>
          </ElePlaceholder>
        </PageData>
      </main>
    </PageLayout>
  );
}
