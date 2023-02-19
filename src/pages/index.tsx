import { Divider } from 'antd-mobile';
import style from './index.module.less';

export default function Main() {
  return (
    <>
      <Divider>Divider</Divider>
      <div className={style['main-title']}>main</div>
    </>
  );
}
