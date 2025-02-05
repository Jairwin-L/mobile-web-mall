'use client';
import { Button, Form, Input } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/api/modules/auth';
import { phoneReg } from '@/utils';
import { PageLayout } from '@/components';
import style from './page.module.scss';

export default function PageRender() {
  const { back } = useRouter();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { success = false } = await login(values);
      setLoading(false);
      if (!success) return;
      back();
    } catch (error) {
      console.error(`------>`, error);
      setLoading(false);
    }
  };
  return (
    <PageLayout
      extraInfo={{
        navbarTitle: '登录',
      }}
    >
      <Form mode="card" name="form" layout="horizontal" onFinish={onFinish} form={form}>
        <Form.Item
          name="phone"
          label="手机"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (!phoneReg.test(value)) return Promise.reject('请输入正确的手机号码');
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="请输入手机号" clearable />
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
        <Button block color="primary" size="middle" loading={loading} onClick={() => form.submit()}>
          提交
        </Button>
      </div>
    </PageLayout>
  );
}
