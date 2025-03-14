import React, { useState, useEffect } from 'react';
import { Card, Space, Button, Empty, message } from 'antd';
import axios from 'axios';

function CartCard({ cartItems = [], loading = true, onCartUpdate, selectedItems = [], onSelectItem }) {
  const userID = localStorage.getItem('userId') || "guest";

  // No longer needed as we receive cartItems as props

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/Cart/delete/${itemId}`);
      message.success('Item removed from cart');
      // Notify parent component to refresh cart items
      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      message.error('Failed to remove item');
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const item = cartItems.find(item => item._id === itemId);
      if (!item) return;

      const updatedItem = {
        ...item,
        quantity: newQuantity.toString()
      };

      await axios.put(`http://localhost:5000/Cart/update/${itemId}`, updatedItem);
      message.success('Quantity updated');
      // Notify parent component to refresh cart items
      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error('Error updating quantity:', error);
      message.error('Failed to update quantity');
    }
  };

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
        {loading ? (
          <p>Loading cart items...</p>
        ) : cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Card
              key={item._id}
              title={item.name}
              size="small"
              extra={
                <Button 
                  type="text" 
                  danger
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </Button>
              }
            >
              <div className="flex justify-between items-center">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 cursor-pointer"
                  checked={selectedItems.includes(item._id)}
                  onChange={(e) => onSelectItem(item._id, e.target.checked)}
                />
                <img 
                  src={`image/img1.jpg`} // Default image or you can use a placeholder
                  alt={item.name} 
                  className='w-16 h-16 object-cover rounded' 
                />
                <p>
                  <strong>Product ID:</strong> {item.itemId}
                </p>
                <div>
                  <strong>Quantity:</strong>
                  <div className="flex items-center mt-1">
                    <Button 
                      size="small"
                      onClick={() => updateQuantity(item._id, Math.max(1, parseInt(item.quantity) - 1))}
                      disabled={parseInt(item.quantity) <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button 
                      size="small"
                      onClick={() => updateQuantity(item._id, parseInt(item.quantity) + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <p>
                  <strong>Price:</strong> Rs.{item.price}
                </p>
                <p>
                  <strong>Total:</strong> Rs.{parseInt(item.price) * parseInt(item.quantity)}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <Empty description="Your cart is empty" />
        )}
      </Space>
    </div>
  );
}

export default CartCard;