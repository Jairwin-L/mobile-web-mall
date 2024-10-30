'use client';
import { Icon, PageLayout } from '@/components';
import { ORDER_OPTION, SIMPLE_LINE } from '@/constants';
import { RightOutlined } from '@ant-design/icons';
import { List } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import style from './page.module.scss';

export default function Mine() {
  const { push } = useRouter();
  const onGoNav = (item: any) => {
    push(item.path);
  };
  return (
    <PageLayout>
      <section className={style['user-info']}>
        <img src="http://diy-static.oss-cn-beijing.aliyuncs.com/default-avatar.jpg" alt="logo" />
        <div className={style.info}>
          <p>我的商城</p>
          <p>小mall</p>
        </div>
      </section>
      <section className={`${style['common-block']} ${style['order-container']}`}>
        <div className={style['order-all']} onClick={() => push('/order?status=ALL')}>
          <span className={style['order-text']}>我的订单</span>
          <div>
            <span className={style['order-margin']}>查看全部订单</span>
            <RightOutlined />
          </div>
        </div>
        <div className={style['order-list-container']}>
          <div className={style['order-list']}>
            {ORDER_OPTION.map((item: OrderItem) => {
              return (
                <div
                  className={style['order-item']}
                  key={item.value}
                  onClick={() => push(`/order?status=${item.value}`)}
                >
                  <Icon type={item.icon} className={style['order-icon']} />
                  <span className={style['order-status']}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <List className="simple-container">
        {SIMPLE_LINE.map((item) => {
          return (
            <List.Item
              key={item.path}
              prefix={<Icon type={item.icon} />}
              onClick={() => onGoNav(item)}
            >
              {item.text}
            </List.Item>
          );
        })}
      </List>
    </PageLayout>
  );
}
