import React, { useEffect, useState } from 'react';
import { Input,Button } from 'antd';
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

const navigate = useNavigate();


useEffect(() => {
    function getItems() {
        axios.get(`http://localhost:5000/Item/`).then((res) => {
            setItem(res.data);
            console.log(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    }
    getItems();
}, []);

console.log(item);

const handleItemClick = async (itemId) => {
    setGid(itemId);
    localStorage.setItem('IId', itemId);
    navigate("/productdetails");
  };

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
                style={{height: 500, width: 1200, marginTop:20, borderRadius: 60}}
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
        
        <div className='mx-40 mt-10 grid grid-cols-4 gap-10'>
            {
                item.map((el) => {
                    return (
                        <ItemCard 
                            key={el._id}
                            nm={el.name}
                            prc={el.price}

                            onClick={() => handleItemClick(el._id)}
                        />
                    );
                })
            }
        </div>

    </div>
    
  )
}

export default Home