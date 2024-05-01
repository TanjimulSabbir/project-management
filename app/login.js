"use client"
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleLogin } from './utils/handleLogin';

const LoginForm = () => {
  const [erro, setError] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    if (values.password) setError(false);
    if (values.email && values.password) {
      handleLogin({ data: values, status: "ok",router })
    }
  };

  const onFinishFailed = (errorInfo) => {
    setError(true)
  };

  return (
    <div>
      <div className='h-screen w-full flex items-center justify-center '>

        <Form
          className='w-[250px] sm:w-[300px] md:w-[400px]'
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1 className='text-3xl mb-10 text-center'>Login</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className={erro && "mt-5"} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
