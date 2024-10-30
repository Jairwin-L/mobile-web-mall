import clsx from 'clsx';
import style from './index.module.scss';

export default function ElePlaceholder(props: IElePlaceholder) {
  const { fixType = 'BOTTOM', placeholderClass = '', className = '', children } = props;
  return (
    <>
      <div className={placeholderClass} />
      <div
        className={clsx(style['placeholder-wrapper'], className, {
          [style['fix-type-top']]: fixType === 'TOP',
          [style['fix-type-bottom']]: fixType === 'BOTTOM',
        })}
      >
        {children}
      </div>
    </>
  );
}
