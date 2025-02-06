import React, { useEffect, useState } from 'react';
import { Card, Space, Popover, Button, Rate } from 'antd';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState('Pending');
  const [ratingValues, setRatingValues] = useState({});

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch orders from the backend
  const fetchOrders = () => {
    axios
      .get('http://localhost:5000/Order/')
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert('Error fetching orders: ' + err.message);
      });
  };

  // Function to handle status change and rating submission
  const handleStatusChange = (order) => {
    const rating = ratingValues[order._id];
    if (!rating) {
      alert('Please provide a rating before confirming.');
      return;
    }

    // Update the status locally
    const updatedOrders = orders.map((o) => {
      if (o._id === order._id) {
        return { ...o, status: 'Delivered', rating: rating };
      }
      return o;
    });
    setOrders(updatedOrders);

    // Prepare the updated order data
    const updatedOrderData = {
      orderNO: order.orderNO,
      name: order.name,
      quantity: order.quantity,
      address: order.address,
      price: order.price,
      status: 'Delivered', // Update the status
      rating: rating,      // Include the rating if you have a field for it
    };

    // Update the status in the backend
    axios
      .put(`http://localhost:5000/Order/update/${order._id}`, updatedOrderData)
      .then((res) => {
        console.log('Order status updated:', res.data);
      })
      .catch((err) => {
        alert('Error updating order: ' + err.message);
      });
  };

  // Tab list configuration
  const tabList = [
    { key: 'Pending', label: 'Pending' },
    { key: 'On the way', label: 'On the way' },
    { key: 'Delivered', label: 'Delivered' },
  ];

  // Rating descriptions
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  // Function to render orders based on status
  const renderOrders = (status) => {
    const filteredOrders = orders.filter(
      (order) => order.status === status
    );

    if (filteredOrders.length === 0) {
      return <p>No {status} orders.</p>;
    }

    return (
      <div>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
            width: '100%',
            minHeight: 450,
          }}
        >
          {filteredOrders.map((order) => (
            <Card
              key={order._id}
              title={order.name}
              size="small"
              extra={
                status === 'On the way' ? (
                  <Popover
                    content={
                      <div>
                        <Rate
                          tooltips={desc}
                          onChange={(value) =>
                            setRatingValues({
                              ...ratingValues,
                              [order._id]: value,
                            })
                          }
                          value={ratingValues[order._id]}
                        />
                        {ratingValues[order._id] ? (
                          <span>
                            {desc[ratingValues[order._id] - 1]}
                          </span>
                        ) : null}
                        <br />
                        <Button
                          type="primary"
                          danger
                          className="mt-3"
                          onClick={() => handleStatusChange(order)}
                        >
                          Confirm
                        </Button>
                      </div>
                    }
                    title="Rate Us"
                    trigger="click"
                  >
                    <Button>Confirm the delivery</Button>
                  </Popover>
                ) : null
              }
            >
              <div className="flex justify-between">
                <img img src="" alt="" className='w-12 h-12' />
                <p>
                  <strong>Order#:</strong> {order.orderNO}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Price:</strong> Rs.{order.price}
                </p>
              </div>
            </Card>
          ))}
        </Space>
      </div>
    );
  };

  // Content for each tab
  const contentList = {
    Pending: renderOrders('Pending'),
    'On the way': renderOrders('On the way'),
    Delivered: renderOrders('Delivered'),
  };

  // Handle tab change
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div className="w-[1000px]">
      <Card
        className="mt-10"
        style={{
          width: '100%',
          marginLeft: '250px',
        }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
}

export default Orders;
