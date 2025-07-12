// src/components/Users/UserModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { User } from '../../types/user';

interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  initialData: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ visible, onClose, onSubmit, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      onClose();
    } catch (error) {
      // Validation failed
    }
  };

  return (
    <Modal
      title={initialData ? 'Edit User' : 'Create User'}
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="Submit"
      okButtonProps={{ type: 'primary' }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Invalid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Profile Image Link"
          rules={[{ required: true, message: 'Profile image URL is required' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
