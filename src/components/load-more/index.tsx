import { DotLoading } from 'antd-mobile';
import clsx from 'clsx';
import style from './index.module.less';

export default function LoadMore(props: ILoadMore) {
  const { loading, onLoadMore, loadMore = false } = props;
  const hasMoreNode = loading ? <DotLoading /> : '加载更多';
  const onLoad = () => {
    if (!loadMore && !loading && onLoadMore) {
      onLoadMore();
    }
  };
  return (
    <>
      <div
        className={clsx(style['load-more-container'], {
          [style['no-data']]: loadMore,
        })}
        onClick={onLoad}
      >
        {loadMore ? '没有更多数据了' : hasMoreNode}
      </div>
    </>
  );
}
