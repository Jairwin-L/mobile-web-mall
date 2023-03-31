import style from './index.module.less';

export default function Loading(props: ILoading) {
  const { text } = props;
  return (
    <div className={style['loading-container']}>
      <div className={style.loading}>
        <div className={style.loader}>
          <div />
          <div />
          <div />
        </div>
        {text ? <span className={style.text}>{text || '加载中...'}</span> : null}
      </div>
    </div>
  );
}
