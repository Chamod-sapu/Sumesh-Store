import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

function ItemCard({nm, prc, img, onClick}) {

  return (
    <div>
      <a href="" onClick={onClick}>
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
            description={`Rs. ${prc}`
                          }
            />
        </Card>

      </a>
    </div>
  )
}

export default ItemCard