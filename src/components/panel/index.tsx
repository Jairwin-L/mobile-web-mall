import { type ReactNode } from 'react';
import style from './index.module.less';
import clsx from 'clsx';

export default function Panel({
  leftIcon,
  rightIcon,
  children,
  onClick,
  className,
}: {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: any;
  onClick?: any;
}) {
  return (
    <div
      className={clsx(style['panel-wrapper'], className, {
        [style['panel-wrapper-all']]: leftIcon && rightIcon,
        [style['panel-wrapper-left']]: leftIcon && !rightIcon,
        [style['panel-wrapper-right']]: rightIcon && !leftIcon,
      })}
      onClick={onClick && onClick}
    >
      {leftIcon ? <div>{leftIcon}</div> : null}
      {children}
      {rightIcon ? <div>{rightIcon}</div> : null}
    </div>
  );
}
