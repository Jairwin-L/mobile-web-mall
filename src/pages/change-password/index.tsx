import { useState } from 'react';
import { Form, Input, Button } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { PageLayout } from '@/components';
import style from './index.module.less';

export default function ChangePassword() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onFinish = (values: any) => {
    console.log('values----->：', values);
  };
  return (
    <PageLayout
      extraInfo={{
        navbarTitle: '修改密码',
      }}
    >
      <Form mode="card" name="form" layout="horizontal" onFinish={onFinish} form={form}>
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" clearable />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true }]}
          extra={
            <div className="eye">
              {visible ? (
                <EyeOutline onClick={() => setVisible(false)} />
              ) : (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              )}
            </div>
          }
        >
          <Input placeholder="请输入密码" clearable type={visible ? 'text' : 'password'} />
        </Form.Item>
      </Form>
      <div className={style['submit-btn']}>
        <Button block color="primary" size="middle" onClick={() => form.submit()}>
          提交
        </Button>
      </div>
    </PageLayout>
  );
}
