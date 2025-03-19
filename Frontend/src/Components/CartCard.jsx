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
    <div className="w-full px-2 sm:px-3 md:px-4">
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
          width: '100%',
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
              className="w-full"
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
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                    checked={selectedItems.includes(item._id)}
                    onChange={(e) => onSelectItem(item._id, e.target.checked)}
                  />
                  <img 
                    src={`image/img1.jpg`}
                    alt={item.name} 
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" 
                  />
                </div>

                <div className="flex flex-col items-center sm:items-start">
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

                <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                  <p className="text-center sm:text-left text-sm md:text-base">
                    <strong>Price:</strong> Rs.{item.price}
                  </p>
                  <p className="text-center sm:text-left text-sm md:text-base">
                    <strong>Total:</strong> Rs.{parseInt(item.price) * parseInt(item.quantity)}
                  </p>
                </div>
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