import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import ItemCard from '../Components/ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../Swipper.css';

import Store1 from '../Images/store1.jpg';
import Store2 from '../Images/store2.jpg';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

function Home() {
    const [item, setItem] = useState([]);
    const [iId, setIid] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        function getItems() {
        axios.get(`http://localhost:5000/Item/`).then((res) => {
            setItem(res.data);
        }).catch((err) => {
            alert(err.message);
        });
        }
        getItems();
    }, []);

    const handleItemClick = (itemId) => {
        setIid(itemId);
        localStorage.setItem('iId', itemId);
        navigate("/productdetails");
    };

    return (
        <div className=' mx-32'>
        <div className='flex flex-col items-center justify-center'>
            <Search
            placeholder="input search text"
            allowClear
            enterButton={<Button type="primary" style={{ backgroundColor: '#ea580c', borderColor: '#ea580c'}}>Search</Button>}
            size="large"
            onSearch={onSearch}
            className="w-11/12 md:w-96 lg:w-96 mt-5 mx-auto"
            />
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-10">
            <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            style={{ 
                height: 'auto', 
                aspectRatio: '16/9',
                width: '100%', 
                marginTop: 20, 
                borderRadius: '20px', 
                maxHeight: '500px'
            }}
            >
            <SwiperSlide><img src={Store1} alt="Store 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store2} alt="Store 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store1} alt="Store 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store2} alt="Store 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store1} alt="Store 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store2} alt="Store 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store1} alt="Store 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store2} alt="Store 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            <SwiperSlide><img src={Store1} alt="Store 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></SwiperSlide>
            </Swiper>
        </div>

        <div className='mx-2 sm:mx-4 md:mx-8 lg:mx-16 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10'>
            {
            item.map((el) => (
                <ItemCard
                key={el._id}
                nm={el.name}
                prc={el.price}
                img={el.image}
                onClick={() => handleItemClick(el._id)}
                />
            ))
            }
        </div>
        </div>
    )
}

export default Home;