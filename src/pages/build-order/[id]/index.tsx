import { useState } from 'react';
import { useRouter } from 'next/router';
import { Popup } from 'antd-mobile';
import clsx from 'clsx';
import { CheckOutline, CloseOutline, RightOutline } from 'antd-mobile-icons';
import { ElePlaceholder, Icon, PageLayout, Panel } from '@/components';
import style from './index.module.less';
import { show } from '@/api/modules/shop';
import { queryList } from '@/api/modules/address';
import { getCodeToText } from '@/utils';

export async function getServerSideProps(context: IServerSideContext) {
  const { query } = context;
  const { id = 1 } = query || {};
  try {
    const resp: any = await Promise.allSettled([
      show({ id }),
      queryList({
        pageIndex: 1,
        pageSize: 10,
      }),
    ]);
    const buildOrderData = resp?.[0]?.value;
    const addressData = resp?.[1]?.value;
    return {
      props: {
        buildOrderData,
        addressData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default function BuildOrder(props: IQueryShop.BuildOrderResp) {
  const { buildOrderData = {}, addressData = {} } = props;
  const { push } = useRouter();
  const addressDataSource = addressData.data || [];
  const [visible, setVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addressData.data?.[0]);
  const addressExitFlag = addressDataSource?.length <= 0;
  const {
    title,
    // price,
    // id,
    // sku = {},
  } = buildOrderData.data || {};
  const onSubmitOrder = () => {
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
  return (
    <PageLayout
      initData={buildOrderData}
      extraInfo={{
        navbarTitle: '生成订单',
      }}
    >
      <Panel
        leftIcon={<Icon type="address" />}
        rightIcon={<RightOutline />}
        onClick={onOpenAddressPanel}
      >
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
      <Panel>{title}</Panel>
      <ElePlaceholder
        placeholderClass="placeholder-class"
        className={style['submit-order--footer']}
      >
        <div className={style['bar-buy-now']} onClick={onSubmitOrder}>
          提交订单
        </div>
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
                rightIcon={
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
