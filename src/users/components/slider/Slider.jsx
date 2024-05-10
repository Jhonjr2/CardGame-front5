import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from './img_slider/cards.png'
import img2 from './img_slider/pattern.png'
import img3 from './img_slider/plane.png'
import img4 from './img_slider/album.png'
import img5 from './img_slider/exchanging.png'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const Slider = () => {

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                autoplay={Autoplay}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} />
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default Slider
