'use client';
import { ElePlaceholder, Icon, PageLayout, Panel } from '@/components';
import { getCodeToText } from '@/utils';
import { Button, Input, Popup } from 'antd-mobile';
import { CheckOutline, CloseOutline, RightOutline } from 'antd-mobile-icons';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { show } from '@/api/modules/shop';
// import { queryList } from '@/api/modules/address';
import { create } from '@/api/modules/order';
import style from './page.module.scss';

export default function BuildOrder() {
  // const { buildOrderData = {}, addressData = {} } = props;
  const addressData: any = {};
  const buildOrderData: any = {};
  const { push, replace } = useRouter();
  const addressDataSource = addressData?.data || [];
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState('');
  const [isSuccess] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addressData.data?.[0]);
  const addressExitFlag = addressDataSource?.length <= 0;
  const {
    title,
    price,
    id,
    goodsPicUrl,
    // sku = {},
  } = buildOrderData?.data || {};
  const onSubmitOrder = async () => {
    setLoading(true);
    try {
      const { success } = await create({
        id: Number(id),
        remark,
      });
      setLoading(false);
      if (!success) return;
      replace('/');
    } catch (error) {
      setLoading(false);
      console.error(`------>`, error);
    }
    console.log(`onSubmitOrder----->：`);
  };
  const onOpenAddressPanel = () => {
    if (addressExitFlag) {
      push('/address/add');
      return;
    }
    setVisible(true);
  };
  const onSelectedAddress = (item: IQueryAddress.ListItem) => {
    if (item.code?.join('') === selectedAddress?.code?.join('')) return;
    setSelectedAddress(item);
    setVisible(false);
  };
  // 备注
  const onRemarkChange = debounce((value: string) => {
    setRemark(value.replace(' ', ''));
  }, 100);
  return (
    <PageLayout
      isSuccess={isSuccess}
      errorMsg={''}
      loading={loading}
      extraInfo={{
        navbarTitle: '生成订单',
      }}
    >
      <Panel left={<Icon type="address" />} right={<RightOutline />} onClick={onOpenAddressPanel}>
        <div>
          {!addressExitFlag ? (
            <>
              <p>{getCodeToText(selectedAddress?.code)}</p>
              <p>{selectedAddress?.phone}</p>
            </>
          ) : (
            <>添加地址</>
          )}
        </div>
      </Panel>
      <Panel>
        <div className={style['goods-info']}>
          <div
            className={style['goods-pic-url']}
            style={{
              backgroundImage: `url(${goodsPicUrl})`,
            }}
          />
          <div className={style['shop-desc']}>
            <p className={style['shop-title']}>{title}</p>
            <div className={style['shop-money']}>
              <span>¥{price ?? 0}</span>
            </div>
          </div>
        </div>
      </Panel>
      <Panel left={<>备注</>}>
        <Input placeholder="请输入备注" value={remark} clearable onChange={onRemarkChange} />
      </Panel>
      <ElePlaceholder
        placeholderClass="placeholder-class"
        className={style['submit-order--footer']}
      >
        <Button loading={loading} className={style['bar-buy-now']} onClick={onSubmitOrder}>
          提交订单
        </Button>
      </ElePlaceholder>
      <Popup
        visible={visible}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <div className={style['address-header']}>
          <span>选择地址</span>
          <CloseOutline onClick={() => setVisible(false)} />
        </div>
        <div className={style['address-popup-wrap']}>
          {addressDataSource?.map((item: IQueryAddress.ListItem) => {
            return (
              <Panel
                right={
                  <>
                    {item.code?.join('') === selectedAddress?.code?.join('') ? (
                      <CheckOutline />
                    ) : null}
                  </>
                }
                className={clsx({
                  [style['address-disabled']]:
                    item.code?.join('') === selectedAddress?.code?.join(''),
                })}
                onClick={() => onSelectedAddress(item)}
              >
                <div>
                  <p>{getCodeToText(item.code)}</p>
                  <p>{item?.phone}</p>
                </div>
              </Panel>
            );
          })}
        </div>
      </Popup>
    </PageLayout>
  );
}
