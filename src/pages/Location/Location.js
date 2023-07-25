import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const FindLocation = ({
  setModal,
  selectedSpot,
  spot,
  setSpot,
  setSelectedSpot,
  modal,
}) => {
  useEffect(() => {
    fetch('/data/location.json')
      .then(res => res.json())
      .then(data => {
        setSpot(data.data);
      });
  }, []);

  const handleSpotClick = e => {
    setSelectedSpot(e.target.value);
  };

  return (
    <LocationBody>
      <LocationBox>
        <LocationList>
          <ModalTitle>위치 찾기</ModalTitle>

          <Locations>
            <LocationBtn
              colorCondition={selectedSpot === ''}
              onClick={() => setSelectedSpot('')}
            >
              전체
            </LocationBtn>
            {spot.map(info => (
              <SelectBox key={info.id}>
                <LocationBtn
                  value={info.id}
                  name="spot"
                  onClick={e => {
                    handleSpotClick(e);
                  }}
                  colorCondition={info.id === Number(selectedSpot)}
                >
                  {info.name}
                </LocationBtn>

                <KaKaoMapBox>
                  <LocationImage src="/images/korea.png" alt="위치이미지" />
                  {Number(selectedSpot) === info.id && (
                    <LocationImage src={info.images} alt="위치이미지" />
                  )}
                </KaKaoMapBox>
              </SelectBox>
            ))}
          </Locations>

          {modal && (
            <SelectBtn onClick={() => setModal(false)}> 선택완료</SelectBtn>
          )}
        </LocationList>
      </LocationBox>
    </LocationBody>
  );
};

export default FindLocation;

const LocationBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LocationBox = styled.div`
  width: 44em;
  margin: 3em;
`;

const LocationList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5em;
  font-size: 2.5em;
  background-color: #f0f0f3;
  box-shadow: 1px 2px 2px 2px #d8d8d8;
`;

const Locations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  position: relative;
`;

const ModalTitle = styled.h1`
  padding: 0.5em;
  font-size: 0.8em;
  text-align: center;
  width: 13.5em;
`;

const SelectBox = styled.div`
  display: flex;
`;

const LocationBtn = styled.button`
  padding: 8px 16px;
  width: 10em;
  height: 3em;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  background: ${props => (props.colorCondition ? '#0073cf' : '#9cd3fc')};
`;

const KaKaoMapBox = styled.div`
  width: 9.5em;
`;

const SelectBtn = styled.button`
  width: 14em;
  height: 3.4em;
  margin: 1em 0;
  font-size: 0.4em;
  background: ${props =>
    props === Number(props.selectedSpot) ? '#0073cf' : '#9cd3fc'};
`;

const LocationImage = styled.img`
  width: 9em;
  height: 8.5em;
  border-radius: 0.3em;
  padding: 5px;
  position: absolute;
  top: -2%;
  left: 35%;
`;
