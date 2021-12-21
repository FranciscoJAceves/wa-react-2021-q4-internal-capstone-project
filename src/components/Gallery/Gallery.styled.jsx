import styled from "styled-components";
import { Swiper } from "swiper/react/swiper-react";

export const GalleryContainer = styled.div`
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SwiperMain = styled(Swiper)`
  --swiper-navigation-color: ${({ theme }) => theme.accent};
  --swiper-pagination-color: ${({ theme }) => theme.accent};
`;

export const SwiperSelector = styled(Swiper)`
  .swiper-slide {
    opacity: 0.4;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
`;
