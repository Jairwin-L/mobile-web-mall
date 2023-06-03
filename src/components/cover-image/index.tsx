import clsx from 'clsx';
import style from './index.module.less';

interface ICoverImage {
  src: string;
  className?: string;
}

export default function CoverImage(props: ICoverImage) {
  const { src = '', className = '' } = props;
  return (
    <div
      className={clsx(style['cover-image'], className)}
      style={{
        backgroundImage: `url(${src})`,
      }}
    />
  );
}
