import React, { useRef, useState } from 'react';
import { Descriptions, Button, Flex, Modal, Cascader, Form, Input, InputNumber, Select, message } from 'antd';
import Draggable from 'react-draggable';
import axios from 'axios';

const items = [
  {
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    label: 'email',
    span: 'filled',
    children: 'sumeshliyanarachci@gmail.com',
  },
  {
    label: 'Tel No.',
    span: 'filled',
    children: '+9471 258 9631',
  },
  {
    label: 'Address',
    span: 1,
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China </p>,
  },
];

const { Option } = Select;

function Account() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const showModal1 = () => setOpen1(true);
  const handleCancel1 = () => setOpen1(false);

  const onFinishEditProfile = async (values) => {
    try {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      const response = await axios.put(`http://localhost:5000/User/update/${userId}`, values);
      if (response.status === 200) {
        message.success('Profile updated successfully');
        setOpen(false);
      }
    } catch (error) {
      message.error('Failed to update profile');
    }
  };
  
  const onFinishChangePassword = async (values) => {
    try {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      const response = await axios.put(`http://localhost:5000/User/change-password/${userId}`, values);
      if (response.status === 200) {
        message.success('Password changed successfully');
        setOpen1(false);
      }
    } catch (error) {
      message.error('Failed to change password');
    }
  };

  return (
    <div className='min-h-[450px]'>
      <div className='w-[1150px] ml-44 mt-10'>
        <Descriptions bordered title="User Info" items={items} />
      </div>
      <div className='w-[1350px] ml-44 mt-10'>
        <Button type="primary" danger className='ml-44 mr-5' onClick={showModal}>
          Edit Profile
        </Button>
        <Modal
          title="Edit Your Profile"
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={onFinishEditProfile}>
            <Form.Item name="email" label="E-mail">
              <Input />
            </Form.Item>
            <Form.Item name="nickname" label="User Name">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        </Modal>

        <Button type="primary" danger onClick={showModal1}>
          Change the password
        </Button>
        <Modal
          title="Change the password"
          open={open1}
          onCancel={handleCancel1}
          footer={null}
        >
          <Form form={form} onFinish={onFinishChangePassword}>
            <Form.Item name="currentPassword" label="Current Password">
              <Input.Password />
            </Form.Item>
            <Form.Item name="newPassword" label="New Password">
              <Input.Password />
            </Form.Item>
            <Form.Item name="confirmPassword" label="Confirm New Password">
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default Account;