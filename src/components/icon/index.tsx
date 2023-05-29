import { createFromIconfontCN } from '@ant-design/icons';

const IconPreFix = 'font_3983875_ve5x8wrrfp';
const Icon = createFromIconfontCN({
  scriptUrl: `//at.alicdn.com/t/c/${IconPreFix}.js`,
});

interface Props {
  type: string;
  style?: any;
  className?: string;
  onClick?: any;
}

export default (props: Props) => {
  const { type, style, className, onClick } = props;
  const cssStyle = {
    ...style,
  };
  return (
    <Icon
      onClick={() => onClick && onClick()}
      type={`icon-${type}`}
      style={cssStyle}
      className={className && className}
    />
  );
};
