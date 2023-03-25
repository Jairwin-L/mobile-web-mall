import { query } from '@/api/modules/biz';
import { TabBarNav } from '@/components';
import { Button } from 'antd-mobile';

export default function Main(props: { model: IBaseResp<IQueryBiz.Resp> }) {
  const { model } = props;
  console.log(`data----->：`, model);
  return (
    <>
      <Button color="primary">按钮</Button>
      Main
      <TabBarNav />
    </>
  );
}

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
