'use client';
import { show } from '@/api/modules/address';
import { PageLayout } from '@/components';
import { useEffect, useState } from 'react';
import FormConfig from '../form-config';

export default function PageRender() {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  const [model, setModel] = useState({});
  const fetchModel = async () => {
    setLoading(true);
    try {
      const resp = await show({ id: 1 });
      const { data, success } = resp;
      setSuccess(success as boolean);
      if (!success) return setLoading(false);
      // @ts-ignore
      setModel(data);
    } catch (error) {
      console.error(`123----->：`, error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchModel();
  }, []);
  return (
    <PageLayout
      isSuccess={isSuccess}
      errorMsg={''}
      loading={loading}
      extraInfo={{
        navbarTitle: '修改地址',
      }}
    >
      {/* @ts-ignore */}
      <FormConfig formModel={model} />
    </PageLayout>
  );
}
