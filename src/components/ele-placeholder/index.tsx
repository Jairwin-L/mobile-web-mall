import { type ReactNode } from 'react';
import style from './index.module.less';

export default function ElePlaceholder({
  fixType = 'BOTTOM',
  placeholderClass,
  children,
}: {
  fixType: 'BOTTOM' | 'TOP';
  placeholderClass: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className={placeholderClass} />
      <div
        className={`${style['fix-box']} ${
          fixType === 'BOTTOM' ? style['fix-type-bottom'] : style['fix-type-top']
        }`}
      >
        {children}
      </div>
    </>
  );
}
