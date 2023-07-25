import { styled } from 'styled-components';
import Carousel from '../../components/Carousel/Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import FindLocation from '../Location/Location';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Main = () => {
  const [product, setProduct] = useState([]);
  const [modal, setModal] = useState(false);
  const [spot, setSpot] = useState([]);
  const token = localStorage.getItem('token');
  const [selectedSpot, setSelectedSpot] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const gotoDetail = id => {
    navigate(`/productDetail/${id}`);
  };

  const productsSetting = {
    rows: 1,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const params = new URLSearchParams();
    selectedSpot && params.set('spotId', `${selectedSpot}`);
    selectedSpot && params.get('spotId');
    setSearchParams(params);
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    if (token) {
      headers.authorization = token;
    }
    fetch(`http://10.58.52.224:3000/storeActivities/?spotId=${selectedSpot}`, {
      headers,
    })
      .then(res => res.json())
      .then(data => setProduct(data.data));
  }, [selectedSpot]);

  return (
    <MainBody>
      <MainCarouselBox>
        <Carousel />
        <LocationBox>
          <LocationBtn onClick={() => setModal(true)}>
            📍 다른 지역 찾아보기
          </LocationBtn>
          <ModalBox>
            {modal && (
              <FindLocation
                setModal={setModal}
                selectedSpot={selectedSpot}
                setSelectedSpot={setSelectedSpot}
                spot={spot}
                setSpot={setSpot}
                modal={modal}
              />
            )}
          </ModalBox>
        </LocationBox>
      </MainCarouselBox>
      {product.map(info => (
        <TagListBox key={info.productId}>
          <TagName> {info.activityName}</TagName>
          <Border>
            <CustomSlider {...productsSetting}>
              {info.stores.map(el => (
                <Product
                  onClick={() => gotoDetail(el.storeActivityId)}
                  key={el.storeActivityId}
                >
                  <ProductImage src={el.Image} alt="product" />
                  <Rating>⭐ {el.scoreAvg}</Rating>
                  <Description>
                    <ProductText>{el.storeName}</ProductText>
                    <ProductText>{el.spotId}</ProductText>
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

const LocationBtn = styled.button`
  color: white;
  position: absolute;
  top: 12.5em;
  left: 45%;
  z-index: 10;
  font-size: 1.5em;
  background-color: #44899e;
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
  width: 3.3em;
  height: 1.9em;
  font-size: 0.7em;
  z-index: 9999;
  left: 8.1em;
  top: -1.9em;
  padding: 5px;
  background-color: #313131;
  opacity: 0.9;
  color: white;
  border-radius: 0.5em 0 0.5em 0;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 8em;
  height: 8em;
  border-radius: 0.5em;
`;

const ModalBox = styled.div`
  position: absolute;
  z-index: 9999;
  left: 25%;
  top: 1%;
`;
