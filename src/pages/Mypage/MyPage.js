import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Like from '../Like/Like';
import MyProfile from './MyProfile';
import MyOrder from './MyOrder';

const MyPage = () => {
  const [isActive, setisActive] = useState('MyProfile');

  const handleButtonClick = name => {
    setisActive(name);
  };

  const activeTab = {
    MyProfile: <MyProfile />,
    Like: <Like />,
    MyOrder: <MyOrder />,
  };

  return (
    <MyPageBody>
      <MyPageBox>
        <MyCategory>
          <Category onClick={() => handleButtonClick('MyProfile')}>
            MyProfile
          </Category>
          <Category onClick={() => handleButtonClick('Like')}>Like</Category>
          <Category onClick={() => handleButtonClick('MyOrder')}>
            MyOrder
          </Category>
        </MyCategory>
        {activeTab[isActive]}
        {/* {isActive === 'MyProfile' && <MyProfile />}
        {isActive === 'Like' && <Like />}
        {isActive === 'MyOrder' && <MyOrder />} */}
      </MyPageBox>
    </MyPageBody>
  );
};

export default MyPage;

const MyPageBody = styled.div`
  padding: 2em;
  display: flex;
  justify-content: center;
  background: #f0f0f3;
`;

const MyPageBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em;
  background-color: white;
  margin-top: 1.5em;
  width: 50em;
`;

const MyCategory = styled.div`
  display: flex;
  height: 3.5em;
  justify-content: space-evenly;
  border-bottom: 1px solid #f0f0f0;
`;

const Category = styled.button`
  width: 13em;
  height: 3em;
`;
