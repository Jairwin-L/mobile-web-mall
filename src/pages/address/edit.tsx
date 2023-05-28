import { show } from '@/api/modules/address';
import { PageLayout } from '@/components';
import FormConfig from './form-config';

export async function getServerSideProps(context: IServerSideContext) {
  const resp = await show({
    id: Number(context.query.id),
  });
  return {
    props: resp,
  };
}

export default function Edit(props: IBaseResp<IQueryAddress.ListItem>) {
  const { data } = props;
  return (
    <PageLayout
      initData={props}
      extraInfo={{
        navbarTitle: '修改地址',
      }}
    >
      <FormConfig formModel={data} />
    </PageLayout>
  );
}
