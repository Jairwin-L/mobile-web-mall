import { TAB_BARS } from '@/constants/router';
import { TabBar } from 'antd-mobile';
import { useRouter } from 'next/router';
import { ElePlaceholder } from '..';
import { TABS } from './const';
import style from './index.module.less';

export default function CustomTabBar(props: ICustomTabBar) {
  const { children } = props;
  const { push, asPath } = useRouter();
  const tabbarFlag = TAB_BARS.includes(asPath);
  return (
    <>
      {children}
      {tabbarFlag ? (
        <ElePlaceholder fixType="BOTTOM" placeholderClass="placeholder-class">
          <div className={style['tab-bar-container']}>
            <TabBar activeKey={asPath} onChange={(value) => push(value)}>
              {TABS.map((item) => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
              ))}
            </TabBar>
          </div>
        </ElePlaceholder>
      ) : null}
    </>
  );
}
