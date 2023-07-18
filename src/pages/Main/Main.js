import { styled } from 'styled-components';
import Carousel from '../../components/Carousel/Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

const Main = () => {
  const [product, setProduct] = useState([]);

  const productsSetting = {
    rows: 1,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch('data/productList.json')
      .then(res => res.json())
      .then(data => setProduct(data.data));
  }, []);

  return (
    <MainBody>
      <MainCarouselBox>
        <Carousel />
        <LocationBox>
          <Location>📍 다른 지역 찾아보기</Location>
        </LocationBox>
      </MainCarouselBox>
      {product.map(info => (
        <TagListBox key={info.id}>
          <TagName> {info.name}</TagName>
          <Border>
            <CustomSlider {...productsSetting}>
              {info.product.map(productInfo => (
                <Product key={productInfo.id}>
                  <ProductImage src={productInfo.images} alt="product" />
                  <Rating>⭐ {productInfo.rating}</Rating>
                  <Description>
                    <ProductText>{productInfo.name}</ProductText>
                  </Description>
                </Product>
              ))}
            </CustomSlider>
          </Border>
        </TagListBox>
      ))}
    </MainBody>
  );
};

export default Main;

const MainBody = styled.div`
  background-color: #e1f0ef;
`;

const MainCarouselBox = styled.div`
  position: relative;
  height: 40em;
`;

const LocationBox = styled.div`
  height: 10em;
  display: flex;
  width: 100vw;
`;

const Border = styled.div`
  border: 2px solid #d5dbcf;
  border-top: none;
  border-radius: 0 0 0.5em 0.5em;
  background-color: white;
`;

const Location = styled.button`
  color: white;
  position: absolute;
  top: 12.5em;
  left: 45%;
  z-index: 10;
  font-size: 1.5em;
  background-color: #449e9d;
  height: 2.6em;
  width: 10em;
  border: none;
  border-radius: 1em;
  padding: 0.5em;

  &:hover {
    background-color: #0073cf;
  }
`;

const TagListBox = styled.div`
  margin-left: 1.5em;
  width: 45em;
  font-size: 2em;
  padding: 2em;
`;

const TagName = styled.div`
  text-align: center;
  font-size: 1.2em;
  border: 2px solid #d5dbcf;
  border-radius: 0.5em 0.5em 0 0;
  padding: 0.5em 0;
  background-color: rgb(250, 250, 250);
`;

const CustomSlider = styled(Slider)`
  .slick-prev,
  .slick-next {
    position: absolute;
    top: 50%;
    z-index: 9;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: translateY(-100%);
    font-size: 0;
    color: transparent;
    outline: none;
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0073cf;
    }

    &.slick-prev {
      left: -70px;
    }

    &.slick-next {
      right: -70px;
    }
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6em;
  width: 10em;
  height: 10em;
`;

const Description = styled.div`
  display: flex;
  font-size: 0.8em;
  justify-content: center;
`;

const ProductText = styled.p`
  position: relative;
  top: -1em;
`;

const Rating = styled.p`
  position: relative;
  width: 3em;
  height: 2.3em;
  font-size: 0.7em;
  z-index: 9999;
  left: 8.4em;
  top: -2.3em;
  padding: 5px;
  background-color: #313131;
  opacity: 0.9;
  color: white;
  border-radius: 0.5em 0 0.5em 0;
`;

const ProductImage = styled.img`
  width: 8em;
  height: 8em;
  border-radius: 0.5em;
`;
