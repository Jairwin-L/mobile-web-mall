import { createFromIconfontCN } from '@ant-design/icons';

const IconPreFix = '3983875_9dtbvz78e34';
const Icon = createFromIconfontCN({
  scriptUrl: `//at.alicdn.com/t/c/font_${IconPreFix}.js`,
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
