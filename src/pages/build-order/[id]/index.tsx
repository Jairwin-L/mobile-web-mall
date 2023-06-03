import { ElePlaceholder, PageLayout, Panel } from '@/components';
import style from './index.module.less';
import { show } from '@/api/modules/shop';
import { queryList } from '@/api/modules/address';

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
  console.log(`addressData----->：`, addressData);
  const {
    title,
    // price,
    // id,
    // sku = {},
  } = buildOrderData.data || {};
  const onSubmitOrder = () => {
    console.log(`onSubmitOrder----->：`);
  };
  return (
    <PageLayout
      initData={buildOrderData}
      extraInfo={{
        navbarTitle: '生成订单',
      }}
    >
      <Panel leftIcon={<div>left</div>} rightIcon={<div>right</div>}>
        {title}
      </Panel>
      <ElePlaceholder
        placeholderClass="placeholder-class"
        className={style['submit-order--footer']}
      >
        <div className={style['bar-buy-now']} onClick={onSubmitOrder}>
          提交订单
        </div>
      </ElePlaceholder>
    </PageLayout>
  );
}
