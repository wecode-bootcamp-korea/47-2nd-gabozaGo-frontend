import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import Pay from '../Pay/Pay';
import { styled } from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const BookingCalandar = ({
  setModal,
  activityId,
  storeName,
  storeActivityName,
  numPrice,
  productId,
}) => {
  const [value, onChange] = useState(new Date());
  const dateObject = new Date(value);
  const originDate = dateObject.toISOString().slice(0, 10);
  dateObject.setDate(dateObject.getDate() + 1);
  const [books, setBooks] = useState([]);
  const [payModal, setPayModal] = useState(false);
  const [head, setHead] = useState(0);
  const token = localStorage.getItem('token');
  const findHead = books?.find(el => el.date === originDate)?.headCountCapacity;
  const bookingCount = Array.from({ length: findHead }, (v, i) => i + 1);
  const totalPrice = (Number(numPrice) * head).toLocaleString();
  const navigate = useNavigate();

  const disableButton = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(tomorrow.getDate() + 14);
    return dateObject >= tomorrow && dateObject <= twoWeeksLater;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    return date < today || date > twoWeeksLater;
  };

  const showAlert = () => {
    if (head === 0) {
      alert('예약 인원이 꽉 찼습니다.');
      setPayModal(false);
    } else if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      setPayModal(true);
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/order/capacitycheck/${productId}`)
      .then(res => res.json())
      .then(data => setBooks(data.capacityList));
  }, []);

  return (
    <CalanderBody>
      <BookingBox>
        <CalanderBox>
          <CustomCalendar
            onChange={onChange}
            value={value}
            tileDisabled={tileDisabled}
          />
        </CalanderBox>
        <BookSelectContainer>
          <ProductBox>
            <ProductName>{storeName}</ProductName>
            <ProductSubName>{storeActivityName}</ProductSubName>
            {moment(value).format('YYYY-MM-DD')}
            <AbledCount>예약가능 인원수 : {findHead} 명</AbledCount>
            <SelectBox>
              <Label htmlFor="count-select">예약 인원 수 : </Label>
              <Select
                name="count"
                id="count-select"
                onChange={e => setHead(Number(e.target.value))}
              >
                <option value="">{head}</option>
                {bookingCount.map(count => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </Select>
            </SelectBox>
            <TotalPrice>총가격 : {totalPrice}원</TotalPrice>
          </ProductBox>

          <OrderBtn onClick={showAlert} disabled={!disableButton()}>
            결제하기
          </OrderBtn>
          <ModalBox>
            {payModal && (
              <Pay
                setPayModal={setPayModal}
                storeName={storeName}
                numPrice={numPrice}
                activityId={activityId}
                storeActivityName={storeActivityName}
                head={head}
                originDate={originDate}
              />
            )}
          </ModalBox>
        </BookSelectContainer>
        <CloseBox onClick={() => setModal(false)}>✕</CloseBox>
      </BookingBox>
    </CalanderBody>
  );
};

export default BookingCalandar;

const CalanderBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f3;
  z-index: 20;
  height: 100vh;
`;

const BookingBox = styled.div`
  width: 50em;
  height: 30em;
  display: flex;
  justify-content: center;
  padding: 2em;
  background: #f0f0f3;
`;

const CalanderBox = styled.div`
  width: 30em;
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
  margin-bottom: 0.8em;
`;

const ProductSubName = styled.h3`
  margin-bottom: 1em;
`;

const SelectBox = styled.div`
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AbledCount = styled.div`
  margin-top: 1.1em;
  text-align: center;
`;

const Label = styled.label`
  font-size: 1em;
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

const TotalPrice = styled.p`
  font-size: 1.2em;
  margin-top: 1em;
  margin-bottom: 2em;
`;

const OrderBtn = styled.button`
  width: 15em;
  height: 3.5em;
  margin-top: 1em;
`;

const CloseBox = styled.button`
  width: 2em;
  height: 2em;
  background-color: transparent;
  color: blue;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 12%;
  left: 5%;
`;

const CustomCalendar = styled(Calendar)`
  border: none;
  width: 28em;

  .react-calendar__navigation__label__labelText {
    font-size: 1.4em;
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
    font-size: 1.1em;
  }

  .react-calendar__tile--now {
    background: #ffdcbc;
    border-radius: 10em;
  }

  .react-calendar__tile--active {
    background: ${props => props.theme.mainColor} !important;
    border-radius: 10em;
  }

  .react-calendar__month-view {
    height: 20em;
  }

  .react-calendar__month-view__days__day {
    font-size: 1em;
    padding: 1em 0;
  }

  .react-calendar__month-view__weekdays {
    background-color: ${props => props.theme.mainColor};
  }

  .react-calendar__navigation__arrow {
    color: black;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    border-radius: 10em;
    background-color: ${props => props.theme.mainColor};
    opacity: 0.6;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: gray;
  }
`;
