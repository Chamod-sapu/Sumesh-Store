import React from 'react';
import { Tabs, Button, Modal } from 'antd';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import { useState } from 'react';

function LoginAndSignup() {
    const [open, setOpen] = useState(false);
    const [activeKey, setActiveKey] = useState("1");

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = (e) => {
        console.log(e);
        setOpen(false);
    };

    const handleCancel = (e) => { 
        console.log(e);
        setOpen(false);
    };

    const onChange = (key) => {
        setActiveKey(key);
    };

    // Pass setOpen to Login component
    const items = [
        {
            key: "1",
            label: "Login",
            children: <Login setOpen={setOpen} />
        },
        {
            key: "2",
            label: "Signup", 
            children: <Signup />
        }
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Login / Signup
            </Button>
            <Modal
                title="User Authentication"
                open={open}
                onCancel={handleCancel}
                footer={null}
                width={500}
                closable={false}
            >
                <Tabs
                    activeKey={activeKey}
                    onChange={onChange}
                    defaultActiveKey="1"
                    centered
                    items={items}
                />
            </Modal>
        </div>
    );
}

export default LoginAndSignup;
