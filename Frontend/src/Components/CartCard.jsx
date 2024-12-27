import React from 'react'
import { Card, Space } from 'antd';


function CartCard() {
  return (
            <div>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                    display: 'flex',
                    width: 800,
                    minHeight: 500,
                    }}
                >
                    <Card title="Item name" size="small">
                    <p>Card content</p>
                    <p>Card content</p>
                    </Card>
                </Space>
            </div>
  )
}

export default CartCard