import React from 'react'
import { Card, Space } from 'antd';
import CartCard from '../Components/CartCard';

function Cart() {
  return (
    <div className='mx-40 mt-10 flex justify-between'>

        <div>
            <CartCard/>
        </div>

        <div>
            <Card
                title="Billing Details"
                bordered={false}
                style={{
                width: 350,
                }}
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>


    </div>
  )
}

export default Cart