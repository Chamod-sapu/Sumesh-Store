import React, { useState, useEffect } from 'react';
import { Card, Space, Button, Divider } from 'antd';
import CartCard from '../Components/CartCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const userID = localStorage.getItem('userId') || "guest";
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/Cart/');
      const userItems = userID ? response.data.filter(item => item.userID === userID) : response.data;
      setCartItems(userItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  const handleSelectItem = (itemId, isSelected) => {
    if (isSelected) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedItems(cartItems.map(item => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item._id))
      .reduce((total, item) => {
        return total + (parseInt(item.price) * parseInt(item.quantity));
      }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 10000 ? 0 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length > 0) {
      // Pass total price and selected items to ProceedToPay
      navigate('/proceedtopay', {
        state: {
          totalPrice: calculateTotal(),
          selectedItems: cartItems.filter(item => selectedItems.includes(item._id)),
        },
      });
    }
  };

  return (
    <div className='mx-40 mt-10 flex justify-between'>
      <div>
        <div className="mb-4 flex items-center">
          <input 
            type="checkbox" 
            id="selectAll"
            className="w-5 h-5 cursor-pointer mr-2"
            checked={selectedItems.length > 0 && selectedItems.length === cartItems.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <label htmlFor="selectAll" className="cursor-pointer">
            Select All Items
          </label>
          <span className="ml-4 text-gray-500">
            {selectedItems.length} of {cartItems.length} item(s) selected
          </span>
        </div>

        <CartCard 
          onCartUpdate={fetchCartItems}
          cartItems={cartItems}
          loading={loading}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
        />
      </div>

      <div>
        <Card
          title="Billing Details"
          bordered={false}
          style={{
            width: 350,
          }}
        >
          {selectedItems.length === 0 ? (
            <p className="text-center text-gray-500 mb-4">Please select items to see total</p>
          ) : null}
          <div className="flex justify-between mb-2">
            <p>Subtotal ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}):</p>
            <p>Rs. {calculateSubtotal()}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Shipping:</p>
            <p>Rs. {calculateShipping()}</p>
          </div>
          <Divider />
          <div className="flex justify-between mb-4 font-bold text-lg">
            <p>Total:</p>
            <p>Rs. {calculateTotal()}</p>
          </div>
          <Button 
            type="primary" 
            danger
            block 
            size="large"
            disabled={selectedItems.length === 0}
            onClick={handleProceedToCheckout} // Use the new handler
          >
            {selectedItems.length === 0 ? 'Select Items to Checkout' : 'Proceed to Checkout'}
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Cart;