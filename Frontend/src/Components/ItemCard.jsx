import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

function ItemCard({nm, prc, img}) {

  
  return (
    <div>
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
            title={nm}
            description={prc}
            />
        </Card>
    </div>
  )
}

export default ItemCard