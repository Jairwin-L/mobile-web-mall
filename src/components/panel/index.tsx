import { type ReactNode } from 'react';
import style from './index.module.less';
import clsx from 'clsx';

export default function Panel({
  leftContent,
  rightContent,
  children,
  onClick,
  className,
}: {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children: ReactNode;
  className?: any;
  onClick?: any;
}) {
  return (
    <div
      className={clsx(style['panel-wrapper'], className, {
        [style['panel-wrapper-all']]: leftContent && rightContent,
        [style['panel-wrapper-left']]: leftContent && !rightContent,
        [style['panel-wrapper-right']]: rightContent && !leftContent,
      })}
      onClick={onClick && onClick}
    >
      {leftContent ? <div>{leftContent}</div> : null}
      {children}
      {rightContent ? <div>{rightContent}</div> : null}
    </div>
  );
}
