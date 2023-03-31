import style from './index.module.less';

export default function AutoCenter({ children }: { children: React.ReactNode }) {
  return <div className={style['center-container']}>{children}</div>;
}
