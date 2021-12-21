import { useState } from "react";
import PropTypes from "prop-types";
import { SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { GalleryContainer, SwiperMain, SwiperSelector } from "./Gallery.styled";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/thumbs/thumbs.min.css";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

function Gallery({ images }) {
  const slides = images.map(({ alt, image: { url } }) => (
    <SwiperSlide key={url}>
      <img src={url} alt={alt} />
    </SwiperSlide>
  ));

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <GalleryContainer>
      <SwiperMain
        spaceBetween={2}
        loop
        navigation
        thumbs={{ swiper: thumbsSwiper }}
      >
        {slides}
      </SwiperMain>
      <SwiperSelector
        spaceBetween={2}
        onSwiper={setThumbsSwiper}
        loop
        slidesPerView={4}
        freeMode
        watchSlidesProgress
      >
        {slides}
      </SwiperSelector>
    </GalleryContainer>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      image: PropTypes.shape({ url: PropTypes.string }),
    })
  ).isRequired,
};

export default Gallery;
