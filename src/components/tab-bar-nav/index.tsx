import { TabBar } from 'antd-mobile';
import { useRouter } from 'next/router';
import { TABS } from './const';
import style from './index.module.less';

function TabBarNav() {
  const { push, asPath } = useRouter();
  return (
    <div className={style['tab-bar-container']}>
      <TabBar activeKey={asPath} onChange={(value) => push(value)}>
        {TABS.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

export default TabBarNav;
