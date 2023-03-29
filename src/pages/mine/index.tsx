import { useRouter } from 'next/router';
import { Button } from 'antd-mobile';

export default function Mine() {
  const { push } = useRouter();
  return (
    <>
      Mine
      <Button color="primary" onClick={() => push('/address')}>
        跳转地址页面
      </Button>
    </>
  );
}
