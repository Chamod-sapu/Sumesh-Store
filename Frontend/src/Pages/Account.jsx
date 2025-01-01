import React, { useRef, useState } from 'react'
import { Descriptions, Button, Flex, Modal,Cascader,Form,Input,InputNumber, Select} from 'antd';
import Draggable from 'react-draggable';

const items = [
    {
      label: 'UserName',
      children: 'Zhou Maomao',
    },
    {
      label: 'email',
      span: 'filled',
      // span = 2
      children: 'sumeshliyanarachci@gmail.com',
    },
    {
      label: 'Tel No.',
      span: 'filled',
      // span = 3
      children: '+9471 258 9631',
    },
    {
      label: 'Address',
      span: 1,
      // span will be 3 and warning for span is not align to the end
      children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China </p>,
    },
  ];

  const { Option } = Select;
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


function Account() {

  //Edit profile popup
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
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
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };


  //Change password popup
  const [open1, setOpen1] = useState(false);
  const [disabled1, setDisabled1] = useState(true);
  const [bounds1, setBounds1] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef1 = useRef(null);
  const showModal1 = () => {
    setOpen1(true);
  };
  const handleOk1 = (e) => {
    console.log(e);
    setOpen1(false);
  };
  const handleCancel1 = (e) => {
    console.log(e);
    setOpen1(false);
  };
  const onStart1 = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds1({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="94">+94</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div className='min-h-[450px]'>
        <div className='w-[1150px] ml-44 mt-10'>
            <Descriptions bordered title="User Info" items={items} />
        </div>
        <div className='w-[1350px] ml-44 mt-10'>

          {/* Edit Profile Popup */}
        <Button type="primary" danger className='ml-44 mr-5' onClick={showModal}>
            Edit Profile
        </Button>
          <Modal
            title={
              <div
                style={{
                  width: '100%',
                  cursor: 'move',
                }}
                onMouseOver={() => {
                  if (disabled) {
                    setDisabled(false);
                  }
                }}
                onMouseOut={() => {
                  setDisabled(true);
                }}
                
                onFocus={() => {}}
                onBlur={() => {}}
                
              >
                Edit Your Profile
              </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Save"
            modalRender={(modal) => (
              <Draggable
                disabled={disabled}
                bounds={bounds}
                nodeRef={draggleRef}
                onStart={(event, uiData) => onStart(event, uiData)}
              >
                <div ref={draggleRef}>{modal}</div>
              </Draggable>
            )}
          >
            <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '94',
              email: 'sumeshliyanarachci@gmail.com',
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >


          <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="User Name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
      </Form>
        </Modal>


      {/* Change Password Popup */}
        <Button type="primary" danger onClick={showModal1}>
            Change the password
        </Button>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  setDisabled1(false);
                }
              }}
              onMouseOut={() => {
                setDisabled1(true);
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              Change the password
            </div>
          }
          open={open1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          okText="Save"
          modalRender={(modal) => (
            <Draggable
              disabled={disabled1}
              bounds={bounds1}
              nodeRef={draggleRef1}
              onStart={(event, uiData) => onStart1(event, uiData)}
            >
              <div ref={draggleRef1}>{modal}</div>
            </Draggable>
          )}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '94',
              email: 'sumeshliyanarachci@gmail.com',
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >

            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
        </div>
    </div>
  )
}

export default Account