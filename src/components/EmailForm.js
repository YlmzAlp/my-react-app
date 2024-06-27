// components/EmailForm.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Form, Input, Button, notification } from 'antd';

const EmailForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (values) => {
    setLoading(true);
    try {
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        values,
        process.env.REACT_APP_EMAILJS_USER_ID
      );
      console.log(result.text);
      notification.success({ message: 'Email sent successfully!' });
      form.resetFields();
    } catch (error) {
      console.error(error.text);
      notification.error({ message: 'Failed to send email.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={sendEmail}>
      <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
        <Input placeholder="Your Name" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
        <Input placeholder="Your Email" />
      </Form.Item>
      <Form.Item name="message" rules={[{ required: true, message: 'Please enter your message' }]}>
        <Input.TextArea placeholder="Your Message" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Send Email
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailForm;
