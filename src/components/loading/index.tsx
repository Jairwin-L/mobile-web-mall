import style from './index.module.scss';

export default function Loading(props: ILoading) {
  const { text = '加载中...' } = props;
  return (
    <div className={style['loading-container']}>
      <div className={style.loading}>
        <div className={style.loader}>
          <div />
          <div />
          <div />
        </div>
        {text ? <span className={style.text}>{text}</span> : null}
      </div>
    </div>
  );
}
