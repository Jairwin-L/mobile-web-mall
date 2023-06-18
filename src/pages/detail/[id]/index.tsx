import { Popup, Selector, Stepper, Swiper, Toast } from 'antd-mobile';
import { useRouter } from 'next/router';
import { RightOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import clsx from 'clsx';
import { CoverImage, ElePlaceholder, Icon, PageLayout } from '@/components';
import { create } from '@/api/modules/collection';
import { show } from '@/api/modules/shop';
import style from './index.module.less';

export async function getServerSideProps(context: IServerSideContext) {
  const { query } = context;
  const { id = 1 } = query || {};
  const resp = await show({ id });
  return {
    props: resp,
  };
}

export default function Detail(props: IBaseResp<IQueryShop.DetailResp>) {
  const { data } = props;
  const { push, asPath } = useRouter();
  const [visible, setVisible] = useState(false);
  const { title, banners = [], collection = false, price, id, sku = {} } = data || {};
  const [skuValues, setSkuValues] = useState<any>({
    amount: 0,
    color: {},
    weight: {},
  });
  const { amount = 0, color = {}, weight = {} } = skuValues;
  const buildOrderFlag = amount <= 0 || !color.value || !weight.value;
  const updateSkuValues = (value: any) => {
    setSkuValues((state: any) => {
      return {
        ...state,
        ...value,
      };
    });
  };
  const onCollection = async () => {
    try {
      const { success } = await create({ id });
      if (!success) return;
      push(asPath, undefined, {
        scroll: false,
      });
    } catch (error) {
      console.error(`------>`, error);
    }
  };
  const onSkuPanel = () => {
    setVisible(true);
  };
  const onWeightSelector = (arr: string[], extend: any) => {
    console.log(`arr, extend----->：`, arr, extend);
    updateSkuValues({
      weight: extend[0],
    });
  };
  const onColorSelector = (arr: string[], extend: any) => {
    console.log(`arr, extend----->：`, arr, extend);
    updateSkuValues({
      color: extend[0],
    });
  };
  const onCalculatePrice = (value: number) => {
    updateSkuValues({
      amount: value,
    });
  };
  const onAddShop = () => {
    if (buildOrderFlag) {
      return Toast.show({
        content: '请选择规格',
      });
    }
  };
  const onBuyNow = () => {
    if (buildOrderFlag) {
      return Toast.show({
        content: '请选择规格',
      });
    }
    push(`/build-order/${id}`, undefined, { shallow: true });
  };
  const BarBtnWrapper = () => (
    <div className={style['bar-btn-wrapper']}>
      <div className={clsx(style['bar-btn'], style['bar-add-cart'])} onClick={onAddShop}>
        加入购物车
      </div>
      <div className={clsx(style['bar-btn'], style['bar-buy-now'])} onClick={onBuyNow}>
        立即购买
      </div>
    </div>
  );

  return (
    <PageLayout
      initData={props}
      extraInfo={{
        navbarTitle: '商品详情',
      }}
    >
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
      <div className={style.panel}>
        <p className={style['shop-title']}>{title}</p>
        <p className={style['shop-price']}>
          ¥<span>{price}</span>
        </p>
      </div>
      <div className={style['sku-panel']} onClick={onSkuPanel}>
        <span>规格</span>
        <p>
          <span>库存: {skuValues?.amount > 0 ? skuValues?.amount : null}</span>
          <span>重量: {skuValues?.weight?.label}</span>
          <span>颜色: {skuValues?.color?.label}</span>
          <RightOutline />
        </p>
      </div>
      <ElePlaceholder placeholderClass="placeholder-class" className={style['detail-footer']}>
        <Icon
          type={collection ? 'collected' : 'collection'}
          className={style['icon-collection']}
          onClick={onCollection}
        />
        {BarBtnWrapper()}
      </ElePlaceholder>
      <Popup
        visible={visible}
        showCloseButton
        onClose={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <div className={style['sku-wrap']}>
          <div className={style['sku-header']}>
            <CoverImage className={style['sku-image']} src={sku?.imgUrl as string} />
            <div className={style['sku-info']}>
              <p className={style['sku-price']}>
                ¥<span>100</span>
              </p>
              <div className={style['sku-specification']}>
                已选
                <p className={style['sku-amount']}>
                  {skuValues?.amount > 0 ? <span>库存: {skuValues?.amount}</span> : null}
                  {skuValues?.weight?.label ? <span>重量: {skuValues?.weight?.label}</span> : null}
                  {skuValues?.color?.label ? <span>颜色: {skuValues?.color?.label}</span> : null}
                </p>
              </div>
            </div>
          </div>
          <div className={style['sku-content']}>
            <div>
              <span>重量</span>
              <Selector
                options={sku?.weight}
                defaultValue={[skuValues.weight]}
                onChange={(arr, extend) => onWeightSelector(arr, extend.items)}
              />
            </div>
            <div>
              <span>颜色</span>
              <Selector
                options={sku?.color}
                defaultValue={[skuValues.color]}
                onChange={(arr, extend) => onColorSelector(arr, extend.items)}
              />
            </div>
            <div className={style['sku-buy-amount']}>
              购买数量
              <Stepper
                value={skuValues.amount}
                min={0}
                disabled={sku.amount === 0}
                max={sku?.amount}
                onChange={(value: number) => onCalculatePrice(value)}
              />
            </div>
          </div>
        </div>
        <ElePlaceholder placeholderClass="placeholder-class" className={style['popup-footer']}>
          {BarBtnWrapper()}
        </ElePlaceholder>
      </Popup>
    </PageLayout>
  );
}
