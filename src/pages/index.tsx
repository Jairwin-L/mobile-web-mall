import { Button } from 'antd-mobile';
require('./index.less');

export default function Main() {
  return (
    <div className="main">
      antd-mobile
      <Button color="primary" size="middle">
        Button
      </Button>
    </div>
  );
}
