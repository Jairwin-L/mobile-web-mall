import { type ReactNode } from 'react';
import style from './index.module.less';
import clsx from 'clsx';

export default function Panel({
  leftIcon,
  rightIcon,
  children,
}: {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(style['panel-wrapper'], {
        [style['panel-wrapper-all']]: leftIcon && rightIcon,
        [style['panel-wrapper-left']]: leftIcon && !rightIcon,
        [style['panel-wrapper-right']]: rightIcon && !leftIcon,
      })}
    >
      {leftIcon ? <div>{leftIcon}</div> : null}
      {children}
      {rightIcon ? <div>{rightIcon}</div> : null}
    </div>
  );
}
