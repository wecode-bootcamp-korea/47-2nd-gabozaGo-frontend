import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const PayResult = () => {
  return (
    <PayResultBody>
      <PayResultBox>
        <PayResultTitle>예약이 완료되었습니다.</PayResultTitle>
        <Description>상세내역은 마이페이지에서 확인해주세요.</Description>
        <Link to="/mypage">
          <GotoMypage>마이페이지로</GotoMypage>
        </Link>
      </PayResultBox>
    </PayResultBody>
  );
};

export default PayResult;

const PayResultBody = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 9999;
  background-color: #f0f0f3;
  width: 100vw;
  height: 100vh;
  top: -22%;
  align-items: center;
`;

const PayResultBox = styled.div`
  width: 40em;
  height: 30em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid gray;
  border-radius: 0.5em;
`;

const PayResultTitle = styled.h1``;

const Description = styled.h3`
  font-weight: 400;
`;

const GotoMypage = styled.button`
  font-size: 1.5em;
  width: 15em;
  height: 3em;
`;
