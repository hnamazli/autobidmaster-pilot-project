import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { IGalleryImage } from '../types';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './gallery.css';

interface IGalleryProps {
    images: IGalleryImage[];
}

export const Gallery: React.FC<IGalleryProps> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>();

    return (
        <div className='gallery-wrapper'>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {
                    images.map((image) => (
                        <SwiperSlide>
                            <img src={image.full} alt={image.full} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='autobidmaster-swiper-thumbs'
            >
                {
                    images.map((image) => (
                        <SwiperSlide>
                            <img src={image.thumbnail} alt={image.thumbnail} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}