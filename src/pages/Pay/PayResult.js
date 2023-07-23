import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const PayResult = () => {
  return (
    <PayResultBody>
      <PayResultBox>
        <PayResultTitle>예약이 완료되었습니다.</PayResultTitle>
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
`;

const PayResultBox = styled.div`
  width: 40em;
  height: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const PayResultTitle = styled.h1``;

const GotoMypage = styled.button`
  width: 13em;
  height: 3em;
`;
