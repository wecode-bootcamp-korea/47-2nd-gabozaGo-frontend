import { styled } from 'styled-components';
import { useState, useEffect } from 'react';

const MyOrder = () => {
  const [order, setOrder] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/reservation/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setOrder(data.data));
  }, []);

  return (
    <MyOrderBody>
      <MyOrderBox>
        {order.map(info => (
          <MyOrderInfo key={info.id}>
            <MyOrderIImage src={info.stores[0]?.imageUrl} />
            <RowDiv>
              <OrderTitle>
                <ProductInfo>주문번호 : {info.orderNumber}</ProductInfo>
              </OrderTitle>
              <ProductInfo>가게 명 : {info.stores[0]?.storeName}</ProductInfo>
              <ProductInfo>
                전화번호 :{' '}
                {(info.stores[0]?.storePhoneNumber).replace(
                  /^(\d{2,3})(\d{3,4})(\d{4})$/,
                  `$1-$2-$3`,
                )}
              </ProductInfo>
              <ProductInfo>위치 : {info.stores[0]?.storeAddress}</ProductInfo>
              <ProductInfo>결제가격 : {info.totalPrice} 원</ProductInfo>
              <ProductInfo>예약날짜 : {info.reservationDate} </ProductInfo>
              <ProductInfo>예약인원: {info.headCount} 인</ProductInfo>
            </RowDiv>
            <StatusDiv>
              <ProductInfo>
                {info.reservationStatus === 'beforeReservation'
                  ? '예약완료'
                  : '기간만료'}
              </ProductInfo>
            </StatusDiv>
          </MyOrderInfo>
        ))}
      </MyOrderBox>
    </MyOrderBody>
  );
};

export default MyOrder;

const MyOrderBody = styled.div`
  display: flex;
  justify-content: center;
`;

const MyOrderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44em;
  background-color: white;
  margin-bottom: 1em 0;
`;

const OrderTitle = styled.div``;

const MyOrderInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  margin: 0 0.3em;
  height: 14em;
  width: 42em;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 1px 1px 3px #d8d8d8;
  border-bottom: 1px solid #f0f0f0;
  margin: 1em 0;
  padding-left: 1em;
`;

const MyOrderIImage = styled.img`
  width: 9em;
  height: 9em;
  border-radius: 0.5em;
  margin-right: 1em;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10em;
  width: 23em;
`;

const ProductInfo = styled.p`
  margin-left: 1em;
  font-size: 1em;
  font-weight: 500;
`;

const StatusDiv = styled.div`
  display: flex;
`;
