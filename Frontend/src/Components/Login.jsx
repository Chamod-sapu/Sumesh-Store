import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Add setOpen as a prop
const Login = ({ setOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();
    
    const onFinish = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/User/login`, { email, password });
            
            console.log(response);
            if (response.status === 200) {
                // Store token
                const token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                
                // Direct method: Get userId from response
                const userId = response.data.userId;
                localStorage.setItem('userId', userId);
                console.log('User ID:', userId);
                
                if (typeof setOpen === 'function') {
                    setOpen(false);
                }
                // Show success message
                messageApi.open({
                    type: 'success',
                    content: 'Login Successful',
                });
                
                // Navigate after modal is closed
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            alert("Invalid credentials");
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <Form
            name="login"
            initialValues={{
                remember: true,
            }}
            style={{
                maxWidth: 360,
            }}
            >
            <Form.Item
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your Email!',
                },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="" className='text-blue-400'>Forgot password</a>
                </Flex>
            </Form.Item>

            <Form.Item>
            {contextHolder}
                <Button block type="primary" htmlType="submit" onClick={onFinish}>
                Log in
                </Button>
                or <a href="" className='text-blue-400'>Register now!</a>
            </Form.Item>
            </Form>
        </div>
    );
};

export default Login;