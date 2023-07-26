import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Comment from '../Review/Comment';
import Review from '../Review/Review';
import BookingCalandar from '../BookingCalandar/BookingCalandar';

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const [activity, setActivity] = useState();
  const [modal, setModal] = useState(false);
  const [isLike, setIsLike] = useState(activity?.likes);
  const token = localStorage.getItem('token');
  const storeName = activity?.StoreName;
  const storeActivityName = activity?.activityName;
  const activityId = activity?.storeActivityId;
  const price = Number(activity?.price.slice(0, 5)).toLocaleString();
  const numPrice = Number(activity?.price.slice(0, 5));
  const phoneNumber = activity?.phoneNumber.replace(
    /^(\d{2,3})(\d{3,4})(\d{4})$/,
    `$1-$2-$3`,
  );

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    if (token) {
      headers.authorization = token;
    }
    fetch(`${process.env.REACT_APP_API_URL}/detailMain/${productId}`, {
      method: 'GET',
      headers,
    })
      .then(res => res.json())
      .then(result => setActivity(result.data));
  }, [token, productId]);

  const handleLike = () => {
    fetch(`${process.env.REACT_APP_API_URL}/likes/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    }).then(res => res.json());
  };

  const handleLikeButton = () => {
    // setIsLike(prev => !!!prev);
    // if (!token) {
    //   return;
    // }
    handleLike();
  };

  return (
    <ProductDetailBody>
      <ProductBox>
        <ItemBox>
          <MainImage src={activity?.imageUrls[1]} alt="itemImage" />
          <ItemDescriptionBox>
            <ItemName> {activity?.StoreName}</ItemName>
            <ItemDescription>
              <Tag> {activity?.activityName}</Tag>
            </ItemDescription>
            <Description>{activity?.description}</Description>
            <Rating>
              <Description>만족도 : {activity?.scoreAvg} 점</Description>
            </Rating>
            <Description>가격 : {price} 원</Description>
            <RowDiv>
              <LikeButton onClick={handleLikeButton}>찜</LikeButton>
              <LikeButton>공유하기</LikeButton>
              <LikeButton onClick={() => setModal(true)}>예약하기</LikeButton>
            </RowDiv>
            <ModalBox>
              {modal && (
                <BookingCalandar
                  setModal={setModal}
                  storeName={storeName}
                  numPrice={numPrice}
                  activityId={activityId}
                  storeActivityName={storeActivityName}
                  productId={productId}
                />
              )}
            </ModalBox>
          </ItemDescriptionBox>
          <DetailText>
            <CompanyText>가게 이름 :{activity?.StoreName}</CompanyText>
            <CompanyText>전화번호 : {phoneNumber}</CompanyText>
            <CompanyText>가게 위치 : {activity?.storeAddress}</CompanyText>
            <CompanyText>1인 이용가격 : {price} 원</CompanyText>
          </DetailText>
        </ItemBox>
        <Review />
      </ProductBox>
      <Comment productId={productId} />
    </ProductDetailBody>
  );
};

export default ProductDetail;

const ProductDetailBody = styled.div`
  background: #f0f0f3;
`;

const ProductBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em;
  background-color: white;
  margin-top: 1.5em;
  box-shadow: 1px 1px 3px #d8d8d8;
  border-bottom: 1px solid #f0f0f0;
`;

const ItemDescriptionBox = styled.div`
  padding-left: 1em;
  width: 35em;
  height: 20em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const MainImage = styled.img`
  width: 35em;
  height: 23em;
  border-radius: 1em;
  margin-bottom: 1em;
`;

const ItemName = styled.h1`
  text-align: center;
`;

const ItemDescription = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Tag = styled.h5`
  font-size: 1.2em;
  font-weight: 500;
`;

const Rating = styled.div`
  display: flex;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.1em;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35em;
  height: 7em;
  margin: 1em 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;

const LikeButton = styled.button`
  margin: 1em;
  border: none;
  width: 8em;
  height: 3em;
  border-radius: 0.9em;
  background-color: ${props => props.theme.mainColor};
  color: white;
  font-size: 1.2em;
`;

const DetailText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1em;
  width: 32em;
  height: 9em;
  line-height: 120%;
  text-align: center;
  background-color: white;
  box-shadow: 1px 1px 3px #d8d8d8;
  border-bottom: 1px solid #f0f0f0;
  justify-content: center;
`;

const CompanyText = styled.h5`
  font-weight: 600;
`;

const ModalBox = styled.div`
  position: absolute;
  z-index: 9999;
  left: 25%;
  top: 9%;
`;
