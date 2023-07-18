import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [carousel, setCarousel] = useState([]);

  const settings = {
    arrow: true,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
  };

  useEffect(() => {
    fetch('data/carousel.json')
      .then(response => response.json())
      .then(data => setCarousel(data.data));
  }, []);

  return (
    <CarouselBody>
      <TotalBox>
        <Slider {...settings}>
          {carousel.map(info => (
            <CarouselBox key={info.id}>
              <Image src={info.image} />
            </CarouselBox>
          ))}
        </Slider>
      </TotalBox>
    </CarouselBody>
  );
};

export default Carousel;

const CarouselBody = styled.div`
  width: 100vw;
  height: 30em;
`;

const TotalBox = styled.div``;

const CarouselBox = styled.div`
  z-index: 10;
  width: 100vw;
  height: 40em;
`;

const Image = styled.img`
  width: 100vw;
  height: 40em;
`;
