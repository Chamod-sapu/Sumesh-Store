import React, { useEffect, useRef, useState } from "react";
import { Card, Rate, Button, Form, InputNumber, Badge, Descriptions, message } from 'antd';
import axios from 'axios';

export default function ProductDetails() {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const [quantity, setQuantity] = useState(1);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const showSlider = (type) => {
    const sliderItems = sliderRef.current.querySelectorAll(".item");
    const thumbnailItems = thumbnailRef.current.querySelectorAll(".item");

    if (type === "next") {
      sliderRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      carouselRef.current.classList.add("next");
    } else {
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    setTimeout(() => {
      carouselRef.current.classList.remove("next");
      carouselRef.current.classList.remove("prev");
    }, timeRunning);
  };

  useEffect(() => {
    const nextHandler = () => showSlider("next");
    const prevHandler = () => showSlider("prev");

    const runNextAuto = setInterval(() => {
      nextHandler();
    }, timeAutoNext);

    nextButtonRef.current?.addEventListener("click", nextHandler);
    prevButtonRef.current?.addEventListener("click", prevHandler);

    return () => {
      clearInterval(runNextAuto);
      if (nextButtonRef.current) {
        nextButtonRef.current.removeEventListener("click", nextHandler);
      }
      if (prevButtonRef.current) {
        prevButtonRef.current.removeEventListener("click", prevHandler);
      }
    };
  }, []);

  const [product, setProduct] = useState({});
  const productID = localStorage.getItem('iId');
  const userID = localStorage.getItem('userId');

  useEffect(() => {
    function getProduct() {
      axios.get(`http://localhost:5000/Item/${productID}`)
        .then((res) => {
          setProduct(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProduct();
  }, [productID]);

  // Function to handle adding item to cart
  const addToCart = () => {
    // Create cart item object
    const cartItem = {
      name: product.name,
      itemId: productID,
      price: product.price,
      quantity: quantity.toString(),
      userID: userID || "guest" // Use guest if userID is not available
    };

    // Send POST request to add item to cart
    axios.post('http://localhost:5000/Cart/add', cartItem)
      .then((response) => {
        message.success('Item added to cart successfully!');
        console.log('Cart item added:', response.data);
      })
      .catch((error) => {
        message.error('Failed to add item to cart');
        console.error('Error adding to cart:', error);
      });
  };

  const items = [
    { key: '1', label: 'Product', children: product.productName },
    { key: '2', label: 'Billing Mode', children: 'Online Payment' },
    { key: '3', label: 'Item listed', children: product.itemListedDate },
    { key: '4', label: 'Manufacture Date', children: product.manufactureDate },
    { key: '5', label: 'Expiry Date', children: product.expiryDate, span: 2 },
    { key: '6', label: 'Status', children: <Badge status="success" text={product.status} />, span: 3 },
    { key: '7', label: 'Negotiated Amount', children: `$${product.negotiatedAmount}` },
    { key: '8', label: 'Discount', children: `$${product.discount}` },
    { key: '9', label: 'Official Receipts', children: `$${product.officialReceipts}` },
    { 
      key: '10', 
      label: 'Config Info', 
      children: (
        <>
          Brand Name: {product.brandName}
          <br />
          SKU-No: {product.sku}
          <br />
          Package QTY: {product.packageQty}
          <br />
          Item Specs: {product.itemSpecs}
          <br />
        </>
      ) 
    }
  ];

  return (
    <div className="w-[1350px]">
      <div className="flex justify-start mt-10 w-[1350px]">
        <div className="ml-52 w-[450px] relative" ref={carouselRef}>
          {/* Slider Section */}
          <div className="list flex overflow-hidden" ref={sliderRef}>
            {[1, 2, 3, 4].map((index) => (
              <div className="item flex-shrink-0 w-full flex items-center justify-center relative" key={index}>
                <img
                  className="w-[450px] h-96 border border-black rounded-xl object-cover"
                  src={`image/img${index}.jpg`}
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </div>

          {/* Thumbnail Section */}
          <div className="thumbnail flex justify-center mt-4" ref={thumbnailRef}>
            {[1, 2, 3, 4].map((index) => (
              <div className="item w-24 h-24 flex-shrink-0 m-2 overflow-hidden border border-gray-300 rounded-xl" key={index}>
                <img
                  className="w-full h-full object-cover"
                  src={`image/img${index}.jpg`}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="arrows flex justify-between absolute top-44 w-full px-4">
            <button id="prev" ref={prevButtonRef} className="bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full focus:outline-none">
              &lt;
            </button>
            <button id="next" ref={nextButtonRef} className="bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full focus:outline-none">
              &gt;
            </button>
          </div>
        </div>

        <div>
          {/* Update the Card title with the item name from product array */}
          <Card type="inner" title={product.name} className="w-[450px] ml-20">
            <div className="flex justify-start font-bold text-4xl text-orange-500">
              <p>Rs.</p>
              <p>{product.price}</p>
            </div>
            <div className="flex justify-start mt-7">
              <p className="font-bold">Brand Name:</p>
              <p>{product.brandName}</p>
            </div>
            <hr className="border"/>
            <div className="mt-4 mb-2">
              <p className="mb-2">Ratings:</p>
              <Rate disabled defaultValue={product.rating} />
            </div>
            <hr className="border"/>
            <div className="mt-4">
              <Form.Item label="Quantity">
                <Form.Item name="input-number" noStyle>
                  <InputNumber 
                    min={1} 
                    max={100} 
                    defaultValue={1} 
                    onChange={(value) => setQuantity(value)} 
                  />
                </Form.Item>
              </Form.Item>
              <Button className="mr-4" color="success" variant="solid">
                Buy Now
              </Button>
              <Button 
                color="danger" 
                variant="solid"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <div className="ml-52 mt-7">
        <Descriptions title="Item Description" bordered items={items} />
      </div>
    </div>
  );
}