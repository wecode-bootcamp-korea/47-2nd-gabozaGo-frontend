import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Calander = () => {
  const [value, onChange] = useState(new Date());
  const token = localStorage.getItem('token');
  const bookingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const originDate = new Date().toISOString().slice(0, 10);

  fetch('data/booking.json')
    .then(res => res.json())
    .then(data => data.data);

  const sendBooking = () => {
    fetch('http://10.58.52.209:3000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: {
        date: `${value.getFullYear()}-${
          value.getMonth() + 1
        }-${value.getDate()}`,
      },
    }).then(res => {
      if (res.status === 200) {
        //모달로 결제완료 띄우기
      }
    });
  };

  return (
    <CalanderBody>
      <BookingBox>
        <CalanderBox>
          <CustomCalendar onChange={onChange} value={value} />
        </CalanderBox>
        <BookSelectContainer>
          <ProductBox>
            <ProductName>상품이름왈랄라루</ProductName>
            {moment(value).format('YYYY년 MM월 DD일')}
            <AbledCount>예약가능 인원수 : 10 명</AbledCount>
            <SelectBox>
              <Label htmlFor="count-select">예약 인원 수 :</Label>
              <Select name="count" id="count-select">
                <option value=""> 인원 수</option>
                {bookingCount.map(count => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </Select>
            </SelectBox>
            <AlertText>예약가능한 인원수를 초과하였습니다.</AlertText>
          </ProductBox>
          <OrderBtn onClick={sendBooking}>결제하기</OrderBtn>
        </BookSelectContainer>
        <CloseBox>✕</CloseBox>
      </BookingBox>
    </CalanderBody>
  );
};

export default Calander;

const CalanderBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookingBox = styled.div`
  width: 45em;
  display: flex;
  justify-content: center;
  padding: 2em;
  background: #f0f0f3;
`;

const CalanderBox = styled.div`
  width: 26em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15em;
  padding-top: 2em;
`;

const ProductBox = styled.div`
  text-align: center;
`;

const ProductName = styled.h2`
  margin-bottom: 1em;
`;

const SelectBox = styled.div`
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AbledCount = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5em;
  padding-top: 0.5em;
`;

const Select = styled.select`
  width: 6em;
  height: 2.3em;
  font-size: 0.8em;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  text-align: center;

  option {
    font-size: 1em;
  }
`;

const AlertText = styled.p`
  font-size: 0.7em;
  margin: 2em 0;
  color: red;
`;

const OrderBtn = styled.button`
  width: 10em;
  height: 3em;
  margin-top: 1em;
`;

const CloseBox = styled.button`
  width: 2em;
  height: 2em;
  background-color: transparent;
  color: blue;
`;

const CustomCalendar = styled(Calendar)`
  border: none;

  .react-calendar__navigation__label__labelText {
    font-size: 1.3em;
    color: black;
  }

  .react-calendar__month-view__days__day {
    color: black;

    &:hover {
      color: white;
    }
    &:focus {
      color: white;
    }
  }

  .react-calendar__month-view__weekdays {
    font-size: 1em;
  }

  .react-calendar__tile--now {
    background: #ffdcbc;
    border-radius: 10em;
  }

  .react-calendar__tile--active {
    background: ${props => props.theme.mainColor} !important;
    border-radius: 10em;
  }

  .react-calendar__month-view__weekdays {
    background-color: #ffe3e3;
  }

  .react-calendar__navigation__arrow {
    color: black;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    border-radius: 10em;
    background-color: green;
    opacity: 0.6;
  }

  &[disabled] {
    background-color: #f0f0f0;
  }
`;
