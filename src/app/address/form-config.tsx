import { RefObject, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, TextArea, CascadePicker } from 'antd-mobile';
import type { CascadePickerRef } from 'antd-mobile/es/components/cascade-picker';
import { PickerColumnItem } from 'antd-mobile/es/components/picker-view';
import { ElePlaceholder } from '@/components';
import { genCascadeData } from '@/utils';
import { useQueryString } from '@/hooks';
import { create, edit } from '@/api/modules/address';

const options = genCascadeData();

export default function FormConfig(props: IQueryAddress.Model) {
  const id = useQueryString<QueryStringKey>('id') || '';
  const { back } = useRouter();
  const { formModel } = props;
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [loading, setLoading] = useState(false);
  const [cascadePickerTitle, setCascadePickerTitle] = useState<string>();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let result: IBaseResp<string> = {};
      if (id) {
        result = await edit({
          ...values,
          id,
        });
      } else {
        result = await create(values);
      }
      setLoading(false);
      if (!result?.success) return;
      back();
    } catch (error) {
      setLoading(false);
      console.error(`error----->：`, error);
    }
  };
  useEffect(() => {
    setFieldsValue(formModel);
  }, [formModel]);
  return (
    <>
      <Form mode="card" name="form" layout="horizontal" onFinish={onFinish} form={form}>
        <Form.Item name="username" label="姓名" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" clearable />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[
            {
              required: true,
              message: '手机号不能为空',
            },
            {
              pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
              message: '手机号格式有误',
            },
          ]}
        >
          <Input placeholder="请输入手机号码" clearable />
        </Form.Item>
        <Form.Item
          name="code"
          label="地址"
          rules={[
            {
              required: true,
              validator: (rule, value) => {
                if (!value) return Promise.reject(new Error('请选择地址'));
                return Promise.resolve();
              },
            },
          ]}
          trigger="onConfirm"
          onClick={(e, cascadePickerRef: RefObject<CascadePickerRef>) => {
            cascadePickerRef.current?.open();
          }}
        >
          <CascadePicker
            title={cascadePickerTitle ?? '请选择地址'}
            // @ts-ignore TODO:
            options={options}
            onConfirm={(val, extend) => {
              console.log('onConfirm', val, extend.items);
              const code = extend.items
                ?.map((item: PickerColumnItem | null) => item?.label)
                ?.join('');
              setCascadePickerTitle(code);
            }}
          >
            {(value) => {
              if (value?.length <= 2) return '请选择地址';
              const code = value.map((item: PickerColumnItem | null) => item?.label)?.join('');
              return code;
            }}
          </CascadePicker>
        </Form.Item>
        <Form.Item name="address" label="详情地址" help="详情地址">
          <TextArea placeholder="请输入地址" maxLength={100} rows={2} showCount />
        </Form.Item>
      </Form>
      <ElePlaceholder placeholderClass="">
        <Button loading={loading} block color="primary" size="middle" onClick={() => form.submit()}>
          确认
        </Button>
      </ElePlaceholder>
    </>
  );
}
