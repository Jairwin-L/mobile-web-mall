import { query } from '@/api/modules/biz';
import { Button } from 'antd-mobile';

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

export default function Main(props: { model: IBaseResp<IQueryBiz.Resp> }) {
  const { model } = props;
  console.log(`model----->：`, model);
  return (
    <>
      <Button color="primary">按钮</Button>
      Main
      <ul>
        {Array(50)
          .fill(1)
          .map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
      </ul>
      <p>底部</p>
    </>
  );
}
