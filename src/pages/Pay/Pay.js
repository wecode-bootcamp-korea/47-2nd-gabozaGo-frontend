import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Pay = () => {
  const [order, setOrder] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`data/order.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setOrder(data.data);
      });
  }, []);

  const payPoint = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify({
        userId: 1,
        storeActivity: 1,
        date: '2023-07-24',
        headCount: 3,
      }),
    }).then(res => {
      if (res.message === 'RESERVATION_SUCCESS') {
      } else if (res.message === 'KET_ERROR') {
        alert('요청에 누락된 정보가 있습니다');
      } else if (res.message === 'HEAD_COUNT_EXCEED') {
        alert('예약 가능한 인원을 초과하였습니다.');
      } else if (res.message === 'NOT_ENOUGH_POINT') {
        alert('포인트가 부족합니다.');
      }
    });
  };

  return (
    <PayBody>
      <PayBox>
        <PageTitle>결제방식 선택</PageTitle>
        {order.map(info => (
          <PayDetail key={info.userId}>
            <ProductInfo>놀이 이름 : {info.product.name}</ProductInfo>
            <ProductInfo>지역 이름 : {info.product.spotName}</ProductInfo>
            <ProductInfo>총 인원 : {info.product.headCount} 명</ProductInfo>
            <ProductInfo>총 가격 : {info.product.price} 원</ProductInfo>
          </PayDetail>
        ))}
        <ButtonBox>
          <PayButton onClick={payPoint}>포인트 결제</PayButton>
          <PayButton>카카오페이 결제</PayButton>
        </ButtonBox>
        <CancelBtn> 취소하기 </CancelBtn>
      </PayBox>
    </PayBody>
  );
};

export default Pay;

const PayBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40em;
  height: 32em;
  background-color: #f0f0f3;
  padding: 2em;
  justify-content: space-between;
`;

const PageTitle = styled.h1``;

const PayDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 30em;
  height: 30em;
  background-color: #f0f0f3;
  padding: 2em;
  justify-content: space-between;
`;

const ProductInfo = styled.h2`
  font-size: 1.4em;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const PayButton = styled.button`
  width: 11em;
  height: 3em;
  font-size: 1.2em;
  align-items: center;
  margin: 1em 1em;
`;

const CancelBtn = styled.button`
  margin-top: 1em;
  font-size: 1em;
  background-color: transparent;
  color: black;
  &:hover {
    background-color: transparent;
    color: red;
  }
`;
