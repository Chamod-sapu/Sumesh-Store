import React, { useState } from 'react';
import { Card, Space } from 'antd';

const tabListNoTitle = [
  {
    key: 'Pending',
    label: 'Pending',
  },
  {
    key: 'On_the_way',
    label: 'On the way',
  },
  {
    key: 'Delivered',
    label: 'Delivered',
  },
];
const contentListNoTitle = {
  Pending: <div>
                <div>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{
                    display: 'flex',
                    width: 800,
                    minHeight: 450,
                    }}
                >
                    <Card title="Item name" size="small">
                      <div className='flex justify-between'>
                      <img src="" alt="" className='w-12 h-12'/>
                      <div className='flex justify-start'><p>Order# :</p><p>102145123</p></div>
                      <div className='flex justify-start'><p>Placed on :</p><p>2021-09-25</p></div>
                      <div className='flex justify-start'><p>Total :</p><p>Rs.800</p></div>
                      </div>
                    </Card>
                </Space>
                </div>
          </div>,
  On_the_way: 
            <div>
                <div>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{
                    display: 'flex',
                    width: 800,
                    minHeight: 450,
                    }}
                >
                    <Card title="Item name" size="small">
                      <div className='flex justify-between'>
                      <img src="" alt="" className='w-12 h-12'/>
                      <div className='flex justify-start'><p>Order# :</p><p>102145123</p></div>
                      <div className='flex justify-start'><p>Placed on :</p><p>2021-09-25</p></div>
                      <div className='flex justify-start'><p>Total :</p><p>Rs.800</p></div>
                      </div>
                    </Card>
                </Space>
                </div>
          </div>,
  Delivered: 
  <div>
                <div>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{
                    display: 'flex',
                    width: 800,
                    minHeight: 450,
                    }}
                >
                    <Card title="Item name" size="small" extra={<a className='text-blue-600' href="#">Confirm the delivery</a>}>
                      <div className='flex justify-between'>
                      <img src="" alt="" className='w-12 h-12'/>
                      <div className='flex justify-start'><p>Order# :</p><p>102145123</p></div>
                      <div className='flex justify-start'><p>Placed on :</p><p>2021-09-25</p></div>
                      <div className='flex justify-start'><p>Total :</p><p>Rs.800</p></div>
                      </div>
                    </Card>
                </Space>
                </div>
          </div>,
};


function Orders() {
  const [activeTabKey2, setActiveTabKey2] = useState('article');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <div className='w-[1000px]'>

      <Card
        className='mt-10'
        style={{
          width: '100%',
          marginLeft: '250px',
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </div>
  );
};


export default Orders