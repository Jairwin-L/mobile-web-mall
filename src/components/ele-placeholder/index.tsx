import { type ReactNode } from 'react';
import style from './index.module.less';

export default function ElePlaceholder({
  fixType = 'BOTTOM',
  placeholderClass = '',
  className = '',
  children,
}: {
  fixType?: 'BOTTOM' | 'TOP';
  placeholderClass?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className={placeholderClass} />
      <div
        className={`${style['fix-box']} ${className} ${
          fixType === 'BOTTOM' ? style['fix-type-bottom'] : style['fix-type-top']
        }`}
      >
        {children}
      </div>
    </>
  );
}
