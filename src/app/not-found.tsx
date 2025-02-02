'use client';
import { ErrorBlock } from 'antd-mobile';
import { AutoCenter } from '@/components';

export default function NotFound() {
  return (
    <AutoCenter>
      <ErrorBlock status="default" />
    </AutoCenter>
  );
}
