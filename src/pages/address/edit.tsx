import { show } from '@/api/modules/address';
import { FormConfig } from './form-config';

// TODO: ts
export async function getServerSideProps(context: any) {
  const resp = await show({
    id: context.query.id,
  });
  return {
    props: {
      model: resp,
    },
  };
}

export default function Edit(props: IServerSideProps<IQueryAddress.ListItem>) {
  const { model } = props;
  console.log(`model----->：`, model);
  return (
    <>
      <FormConfig formModel={model.data} />
    </>
  );
}
