import { PageLayout } from '@/components';
import FormConfig from './form-config';

export default function Add() {
  return (
    <PageLayout
      initData={{
        success: true,
      }}
      extraInfo={{
        navbarTitle: '新增地址',
      }}
    >
      <FormConfig />
    </PageLayout>
  );
}
