import React, { useEffect, useRef } from "react";
import { Card,Rate,Button, Form, InputNumber,Badge, Descriptions } from 'antd';

export default function ProductDetails() {
    const carouselRef = useRef(null);
    const sliderRef = useRef(null);
    const thumbnailRef = useRef(null);
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);
  
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
  
      nextButtonRef.current.addEventListener("click", nextHandler);
      prevButtonRef.current.addEventListener("click", prevHandler);
  
      return () => {
        clearInterval(runNextAuto);
        nextButtonRef.current.removeEventListener("click", nextHandler);
        prevButtonRef.current.removeEventListener("click", prevHandler);
      };
    }, []);

    const items = [
        {
          key: '1',
          label: 'Product',
          children: 'Cloud Database',
        },
        {
          key: '2',
          label: 'Billing Mode',
          children: 'Online Payment',
        },
        {
          key: '3',
          label: 'Item listed',
          children: '2018-04-20',
        },
        {
          key: '4',
          label: 'Manufacture Date',
          children: '2018-04-24',
        },
        {
          key: '5',
          label: 'Expiry Date',
          children: '2019-04-24',
          span: 2,
        },
        {
          key: '6',
          label: 'Status',
          children: <Badge status="success" text="In-Stock" />,
          span: 3,
        },
        {
          key: '7',
          label: 'Negotiated Amount',
          children: '$80.00',
        },
        {
          key: '8',
          label: 'Discount',
          children: '$20.00',
        },
        {
          key: '9',
          label: 'Official Receipts',
          children: '$60.00',
        },
        {
          key: '10',
          label: 'Config Info',
          children: (
            <>
              Brand Name: MongoDB
              <br />
              SKU-No: 3.4
              <br />
              Package QTY: dds.mongo.mid
              <br />
              Item Specs: 10 GB
              <br />
            </>
          ),
        },
      ];
  
    return (
        <div className="w-[1350px]">
            <div className="flex justify-start mt-10 w-[1350px]">
                <div className="ml-52  w-[450px] relative" ref={carouselRef}>
                    {/* Slider Section */}
                    <div className="list flex overflow-hidden" ref={sliderRef}>
                    {[1, 2, 3, 4].map((index) => (
                        <div
                        className="item flex-shrink-0 w-full flex items-center justify-center relative"
                        key={index}
                        >
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
                        <div
                        className="item w-24 h-24 flex-shrink-0 m-2 overflow-hidden border border-gray-300 rounded-xl"
                        key={index}
                        >
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
                    <button
                        id="prev"
                        ref={prevButtonRef}
                        className="bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full focus:outline-none"
                    >
                        &lt;
                    </button>
                    <button
                        id="next"
                        ref={nextButtonRef}
                        className="bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full focus:outline-none"
                    >
                        &gt;
                    </button>
                    </div>
                </div>

                <div>
                    
                    <Card type="inner" title="Item Name" className="w-[450px] ml-20">
                        <div className="flex justify-start font-bold text-4xl text-orange-500"><p>Rs.</p><p></p>1000</div>
                        <div className="flex justify-start mt-7"><p className="font-bold">Brand Name :</p><p></p>Alex</div>
                        <hr className="border"/>
                        <div className="mt-4 mb-2"><p className="mb-2">Ratings:</p><Rate disabled defaultValue={2} /></div>
                        <hr className="border"/>
                        <div className="mt-4">

                            <Form.Item label="Quantity">
                                <Form.Item name="input-number" noStyle>
                                    <InputNumber min={1} max={100} />
                                </Form.Item>
                            </Form.Item>

                            <Button className="mr-4" color="success" variant="solid">
                                Buy Now
                            </Button>
                            <Button color="danger" variant="solid">
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
  };
  
