import style from './index.module.less';

export default function Loading({ text = '加载中...' }) {
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
