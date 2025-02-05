'use client';
import { ErrorBlock } from 'antd-mobile';
import AutoCenter from '../auto-center';

export default function PageData(props: IPageData) {
  const { dataSource = [], children } = props;
  return (
    <>
      {dataSource.length > 0 ? (
        children
      ) : (
        <AutoCenter>
          <ErrorBlock status="empty" />
        </AutoCenter>
      )}
    </>
  );
}
