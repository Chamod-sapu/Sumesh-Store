import React from 'react'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from 'antd';

function ProceedToPay() {
  return (
    <div className='flex justify-between w-[1350px]'>
        <div className='w-[800px] ml-40 mt-10 min-h-[510px]'>
            <Card title="Delivery information">
                <Card type="inner" title="Shipping Details" extra={<a href="#">Edit</a>}>
                Name : Sumesh Liyanarachchi
                <br />
                Tel No. : +9471 258 3698
                <br />
                Address : Allawwa, Kurunegala
                </Card>
                <Card
                style={{
                    marginTop: 16,
                }}
                type="inner"
                title="Delivery Method"
                >
                    <Form.Item
                        name="radio-button"
                        label="Select delivery option"
                        rules={[{ required: true, message: 'Please select a method' }]}
                        >
                            <br />
                        <Radio.Group>
                            <Radio.Button value="a">
                                Courier Delivery Service
                                (+ Rs.250)
                            </Radio.Button>
                            <Radio.Button value="b">
                                Sri Lanka Postal (+ Rs.250)
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Card>
            </Card>
        </div>
        <div className='mt-10 w-[380px]'>
            <Card type="inner" title="Billing Details">
                <p className='font-bold text-lg'>Order Summary</p>
                <br />
                <div className='flex justify-between'><p>Cost for selected items : </p><p>Rs.600</p></div>
                <br />
                <div className='flex justify-between'><p className='pb-2'>Delivery Charge : </p><p>Rs.250</p></div>
                <hr />
                <div className='flex justify-between pt-5'><p className='font-semibold text-lg'>Total</p><p className='font-bold text-xl text-orange-500'>Rs.850</p></div>
                <div><p className='text-[10px]'>VAT included, where applicable</p></div>
                <br />
                <Button type="primary" danger className='ml-[100px]'>
                    Proceed to pay
                </Button>
            </Card>
        </div>
    </div>
  )
}

export default ProceedToPay