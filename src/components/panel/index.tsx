import { type ReactNode } from 'react';
import style from './index.module.less';
import clsx from 'clsx';

export default function Panel({
  left,
  right,
  children,
  onClick,
  className,
}: {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: any;
  onClick?: any;
}) {
  return (
    <div
      className={clsx(style['panel-wrapper'], className, {
        [style['panel-wrapper-all']]: left && right,
        [style['panel-wrapper-left']]: left && !right,
        [style['panel-wrapper-right']]: right && !left,
      })}
      onClick={onClick && onClick}
    >
      {left ? <div>{left}</div> : null}
      {children}
      {right ? <div>{right}</div> : null}
    </div>
  );
}
