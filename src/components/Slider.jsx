import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper/core";
import "swiper/swiper-bundle.css";
const Slider = ({ data }) => {
  SwiperCore.use([Autoplay, Pagination]);
  if (!data) return <p>No images available</p>;
  // console.log(data);

  return (
    <div className="image-slider">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {data.map((item, key) => (
          <SwiperSlide key={key}>
            <img src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
