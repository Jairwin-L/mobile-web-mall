import { show } from '@/api/modules/address';
import { PageLayout } from '@/components';
import { FormConfig } from './form-config';

export async function getServerSideProps(context: IServerSideContext) {
  const resp = await show({
    id: Number(context.query.id),
  });
  return {
    props: {
      initData: resp,
    },
  };
}

export default function Edit(props: IServerSideProps<IQueryAddress.ListItem>) {
  const { initData } = props;
  return (
    <PageLayout
      initData={initData}
      extraInfo={{
        navbarTitle: '修改地址',
      }}
    >
      <FormConfig formModel={initData.data} />
    </PageLayout>
  );
}
