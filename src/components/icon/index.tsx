'use client';
import { createFromIconfontCN } from '@ant-design/icons';

const IconPreFix = 'font_3983875_rjhsj9pm3s';
const IconFont = createFromIconfontCN({
  scriptUrl: `//at.alicdn.com/t/c/${IconPreFix}.js`,
});

interface Props {
  type: string;
  style?: any;
  className?: string;
  onClick?: any;
}

export default function Icon(props: Props) {
  const { type, style, className, onClick } = props;
  const cssStyle = {
    ...style,
  };
  return (
    <IconFont
      onClick={() => onClick && onClick()}
      type={`icon-${type}`}
      style={cssStyle}
      className={className && className}
    />
  );
}
