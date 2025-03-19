import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Form,
  Radio,
  message,
  Spin
} from 'antd';
import axios from 'axios';

function ProceedToPay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, selectedItems } = location.state || { totalPrice: 0, selectedItems: [] };
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userID = localStorage.getItem('userId') || 'guest';

  // Fetch user data when component mounts
  useEffect(() => {
    if (userID !== 'guest') {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userID]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/User/${userID}`);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      message.error('Failed to load user information');
      setLoading(false);
    }
  };

  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleProceedToPay = () => {
    if (!deliveryMethod) {
      message.error('Please select a delivery method');
      return;
    }
    
    setIsProcessing(true);
    
    // Create order object
    const orderData = {
      userId: userID,
      items: selectedItems.map(item => ({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: totalPrice,
      deliveryMethod: deliveryMethod === 'a' ? 'Courier Delivery Service' : 'Sri Lanka Postal',
      status: 'Pending',
      shippingAddress: {
        name: userData?.name || 'Guest',
        phone: userData?.phoneNumber || 'Not provided',
        address: userData?.address || 'Not provided'
      }
    };
    
    // Send order to backend
    axios.post('http://localhost:5000/Order/create', orderData)
      .then(response => {
        message.success('Order placed successfully!');
        console.log('Order created:', response.data);
        
        // If items came from cart, clear those items
        if (selectedItems.length > 0 && location.state.fromCart) {
          // Clear cart items
          const itemIds = selectedItems.map(item => item.itemId);
          axios.post('http://localhost:5000/Cart/remove-multiple', { 
            userID, 
            itemIds 
          })
          .then(() => {
            console.log('Cart items cleared');
          })
          .catch(error => {
            console.error('Error clearing cart items:', error);
          });
        }
        
        // Redirect to a thank you or order confirmation page
        // For now we'll just navigate back to home
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        setIsProcessing(false);
        message.error('Failed to create order. Please try again.');
        console.error('Error creating order:', error);
      });
  };

  return (
<div className='lg:w-[1200px] lg:mt-28 lg:mb-[110px] lg:ml-40 flex flex-wrap lg:flex-nowrap justify-center lg:justify-between w-full px-5'>
  <div className='w-full lg:w-[800px] mb-5 lg:mb-0'>
    <Card title="Delivery information">
      <Card type="inner" title="Shipping Details" extra={<a href="#">Edit</a>}>
        {loading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <>
            Name : {userData?.name || 'Guest User'}
            <br />
            Tel No. : {userData?.phoneNumber || 'Not provided'}
            <br />
            Address : {userData?.address || 'Address not provided'}
          </>
        )}
      </Card>
      <Card
        className="mt-5"
        type="inner"
        title="Delivery Method"
      >
        <Form.Item
          name="radio-button"
          label="Select delivery option"
          rules={[{ required: true, message: 'Please select a method' }]}
        >
          <br />
          <Radio.Group onChange={handleDeliveryChange} value={deliveryMethod}>
            <Radio.Button value="a">
              Courier Delivery Service (+ Rs.250)
            </Radio.Button>
            <Radio.Button value="b">
              Sri Lanka Postal (+ Rs.250)
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Card>
    </Card>
  </div>
  <div className='lg:ml-10 w-full lg:w-[380px]'>
    <Card type="inner" title="Billing Details">
      <p className='font-bold text-lg'>Order Summary</p>
      <br />
      <div className='flex justify-between'>
        <p>Cost for selected items:</p>
        <p>Rs. {totalPrice - 250}</p>
      </div>
      <br />
      <div className='flex justify-between'>
        <p>Delivery Charge:</p>
        <p>Rs. 250</p>
      </div>
      <hr />
      <div className='flex justify-between pt-5'>
        <p className='font-semibold text-lg'>Total</p>
        <p className='font-bold text-xl text-orange-500'>Rs. {totalPrice}</p>
      </div>
      <div><p className='text-[10px]'>VAT included, where applicable</p></div>
      <br />
      <Button 
        type="primary" 
        danger 
        className='w-full lg:w-auto'
        onClick={handleProceedToPay}
        loading={isProcessing}
      >
        Proceed to pay
      </Button>
    </Card>
  </div>
</div>

  );
}

export default ProceedToPay;