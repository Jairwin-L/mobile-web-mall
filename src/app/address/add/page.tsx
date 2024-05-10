'use client';
import { PageLayout } from '@/components';
import FormConfig from '../form-config';

export default function Add() {
  return (
    <PageLayout
      extraInfo={{
        navbarTitle: '新增地址',
      }}
    >
      <FormConfig />
    </PageLayout>
  );
}
