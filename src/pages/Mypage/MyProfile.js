import { styled } from 'styled-components';
import { useState, useEffect } from 'react';

const MyProfile = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch('data/myInfo.json')
      .then(res => res.json())
      .then(data => setProfile(data.data));
  }, []);

  return (
    <MyProfileBody>
      <MyProfileIBox>
        {profile.map(info => (
          <MyProfileInfo key={info.id}>
            <MyProfileImage src={info.images} />
            <RowDiv>
              <ProductInfo>성함 : {info.userName}</ProductInfo>
              <ProductInfo>전화번호 :{info.phoneNumber}</ProductInfo>
              <ProductInfo>관심 지역 : {info.likeSpot}</ProductInfo>
              <ProductInfo>관심 태그 : {info.likeTags}</ProductInfo>
            </RowDiv>
          </MyProfileInfo>
        ))}
      </MyProfileIBox>
    </MyProfileBody>
  );
};

export default MyProfile;

const MyProfileBody = styled.div`
  display: flex;
  justify-content: center;
`;

const MyProfileIBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 44em;
  background-color: white;
  margin: 1em 2em;
`;

const MyProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  margin: 0.5em 0.3em;

  height: 10em;
  border-bottom: 1px solid #f0f0f0;
`;

const MyProfileImage = styled.img`
  width: 7em;
  height: 7em;
  border-radius: 50%;
  margin-right: 1em;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 11em;
  width: 35em;
`;

const ProductInfo = styled.p`
  margin-left: 1em;
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 1em;
`;
