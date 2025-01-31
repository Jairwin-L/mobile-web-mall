'use client';
import { queryList } from '@/api/modules/category';
import { PageLayout } from '@/components';
import { SideBar } from 'antd-mobile';
import throttle from 'lodash.throttle';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import style from './page.module.scss';

export default function PageRender() {
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  const [list, setList] = useState<any>([]);
  const onScrollActive = throttle(() => {
    // let currentKey = activeKey;
    let currentKey = list[0].id;
    for (const item of list) {
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
  const fetchList = async () => {
    setLoading(true);
    try {
      const resp = await queryList();
      const { data, success } = resp;
      setSuccess(success as boolean);
      if (!success) return setLoading(false);
      // @ts-ignore
      setList(data);
      setActiveKey(data?.[0]?.id);
    } catch (error) {
      console.error(`123----->：`, error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchList();
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
    <PageLayout isSuccess={isSuccess} errorMsg={''} loading={loading}>
      <main className={style.container}>
        <aside className="side">
          <SideBar activeKey={activeKey} onChange={(key) => onChangeSideBar(key)}>
            {list.map((item: any) => (
              <SideBar.Item key={item.id} title={item.name} />
            ))}
          </SideBar>
        </aside>
        <section className={style['category-content']} ref={sideBarRef}>
          {list.map((item: any) => (
            <Fragment key={item.id}>
              <h3 id={`anchor-${item.id}`}>{item.name}</h3>
              {item?.categoryList?.map((subItem: any) => {
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
