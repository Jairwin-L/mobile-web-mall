import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SideBar } from 'antd-mobile';
import throttle from 'lodash.throttle';
import { PageLayout } from '@/components';
import { queryList } from '@/api/modules/category';
import style from './index.module.less';

export default function Category(props: IServerSideProps<IQueryCategory.Resp>) {
  const { initData } = props;
  const dataSource = initData.data || [];
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<string>(dataSource?.[0]?.id);
  const onScrollActive = throttle(() => {
    let currentKey = activeKey;
    for (const item of dataSource) {
      const element = document.getElementById(`anchor-${item.id}`);
      if (!element) continue;
      const rect = element.getBoundingClientRect() || {};
      if (rect.top <= 0) {
        currentKey = item.id;
      } else {
        break;
      }
    }
    setActiveKey(currentKey);
  }, 100);
  const onChangeSideBar = (key: string) => {
    if (key === activeKey) return;
    document.getElementById(`anchor-${key}`)?.scrollIntoView();
  };
  useEffect(() => {
    // TODO:初始化时延迟数据处理(有其他好的办法再修改)
    setTimeout(() => {
      const sideBarCurrent = sideBarRef.current;
      if (!sideBarCurrent) return;
      sideBarCurrent.addEventListener('scroll', onScrollActive);
      return () => {
        sideBarCurrent.removeEventListener('scroll', onScrollActive);
      };
    }, 100);
  }, []);

  return (
    <PageLayout initData={initData}>
      <main className={style.container}>
        <aside className="side">
          <SideBar activeKey={activeKey} onChange={(key) => onChangeSideBar(key)}>
            {dataSource.map((item) => (
              <SideBar.Item key={item.id} title={item.name} />
            ))}
          </SideBar>
        </aside>
        <section className={style['category-content']} ref={sideBarRef}>
          {dataSource.map((item) => (
            <Fragment key={item.id}>
              <h3 id={`anchor-${item.id}`}>{item.name}</h3>
              {item?.categoryList?.map((subItem) => {
                return (
                  <ul key={subItem.id}>
                    <li>
                      <p>{subItem.name}</p>
                      <Image
                        src={subItem.wapBannerUrl as string}
                        width="150"
                        height="150"
                        alt={subItem.name}
                      />
                    </li>
                  </ul>
                );
              })}
            </Fragment>
          ))}
        </section>
      </main>
    </PageLayout>
  );
}

export async function getServerSideProps() {
  const resp = await queryList();
  return {
    props: {
      initData: resp,
    },
  };
}
