import { Button, DotLoading } from 'antd-mobile';
import style from './index.module.less';

export default function LoadMore(props: ILoadMore) {
  const { hasMore, onLoadMore, loadMore = false } = props;
  return (
    <>
      {loadMore ? (
        <div className={style['no-data']}>
          <span>没有更多数据了</span>
        </div>
      ) : (
        <Button block fill="none" onClick={onLoadMore}>
          {hasMore ? <span className={style['load-more-text']}>加载更多</span> : <DotLoading />}
        </Button>
      )}
    </>
  );
}
