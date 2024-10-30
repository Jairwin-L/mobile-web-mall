import style from './index.module.scss';

export default function AutoCenter({ children }: { children: React.ReactNode }) {
  return <div className={style['center-container']}>{children}</div>;
}
