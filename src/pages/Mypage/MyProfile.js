import { styled } from 'styled-components';
import { useState, useEffect } from 'react';

const MyProfile = () => {
  const [profile, setProfile] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  console.log(profile[0]);

  const myPhone = profile[0]?.phoneNumber;
  console.log(myPhone);

  return (
    <MyProfileBody>
      <MyProfileIBox>
        {profile.map(info => (
          <MyProfileInfo key={info.id}>
            <MyProfileImage src={info.images} />
            <RowDiv>
              <ProductInfo>성함 : {info.name}</ProductInfo>
              <ProductInfo>
                전화번호 :
                {info.phoneNumber.replace(
                  /^(\d{2,3})(\d{3,4})(\d{4})$/,
                  `$1-$2-$3`,
                )}
              </ProductInfo>
              <ProductInfo>
                보유 포인트 : {info.point.slice(0, 6)} 원
              </ProductInfo>
              <ProductInfo>관심 지역 : {info.spot.name}</ProductInfo>
              <ProductInfo>
                관심 태그 :
                {info.activities.map(activitiy => {
                  return (
                    <InfoTags key={activitiy.id}>{activitiy.name}, </InfoTags>
                  );
                })}{' '}
              </ProductInfo>
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
  align-items: center;
`;

const MyProfileIBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40em;
  height: 28em;
  background-color: white;
  margin: 1em 2em;
  border: 1px solid gray;
  border-radius: 1em;
`;

const MyProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  margin: 0.5em 0.3em;
  height: 25em;
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
  display: flex;
`;

const InfoTags = styled.div``;
