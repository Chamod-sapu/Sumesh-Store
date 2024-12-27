import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

function ItemCard() {
  return (
    <div className='mx-44 mt-10'>
        <Card
            style={{
            width: 280,
            }}
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
            <ShoppingCartOutlined key="Add to Cart" />,
            ]}
        >
            <Meta
            title="Card title"
            description="This is the description"
            />
        </Card>
    </div>
  )
}

export default ItemCard