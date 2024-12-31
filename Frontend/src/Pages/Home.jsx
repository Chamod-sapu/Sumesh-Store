import React, { useRef, useState } from 'react';
import { Input,Button } from 'antd';
import ItemCard from '../Components/ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../Swipper.css';

import Store1 from '../Images/store1.jpg';
import Store2 from '../Images/store2.jpg';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

function Home() {

        

  return (
    <div >

        <div className='flex flex-col items-center justify-center'>
            <Search
                placeholder="input search text"
                allowClear
                enterButton={<Button type="primary" style={{ backgroundColor: '#fb933c', borderColor: '#fb933c'}}>Search</Button>}
                size="large"
                onSearch={onSearch}
                style={{ width:400, marginTop: 20, marginLeft: 20}}
                />
        </div>

        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                style={{height: 500, width: 1200, marginTop:20, borderRadius: 10}}
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
        
        <div className='mx-40 mt-10'>
            <ItemCard/>
        </div>

    </div>
    
  )
}

export default Home