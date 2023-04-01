import { ErrorBlock } from 'antd-mobile';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <ErrorBlock
        status="empty"
        fullPage
        description={
          <>
            <Link className="not-found-btn" href="/" replace>
              返回首页
            </Link>
          </>
        }
      />
    </>
  );
}
