import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Location = () => {
  const [spot, setSpot] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    fetch('data/location.json')
      .then(res => res.json())
      .then(data => {
        setSpot(data.data);
      });
  }, []);

  const handleSpotClick = spotId => {
    setSelectedSpot(spotId);
  };

  return (
    <LocationBody>
      <LocationBox>
        <LocationList>
          <ModalTitle>위치 찾기</ModalTitle>
          <MapBox>
            <Locations>
              {spot.map(info => (
                <SelectBox key={info.id}>
                  <List>
                    <SpotTitle>
                      <LocationBtn onClick={() => handleSpotClick(info.id)}>
                        {info.name}
                      </LocationBtn>
                    </SpotTitle>
                  </List>
                  <KaKaoMapBox>
                    {selectedSpot === info.id && (
                      <LocationImage src={info.images} alt="위치이미지" />
                    )}
                  </KaKaoMapBox>
                </SelectBox>
              ))}
            </Locations>
          </MapBox>
          <SelectBtn> 선택완료</SelectBtn>
        </LocationList>
      </LocationBox>
    </LocationBody>
  );
};

export default Location;

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
  box-shadow: 1px 2px 2px 2px #d8d8d8;
`;

const Locations = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ModalTitle = styled.h1`
  padding: 0.5em;
  font-size: 0.8em;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
  width: 13.5em;
`;

const SelectBox = styled.div`
  display: flex;
  width: 3em;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
`;

const SpotTitle = styled.div`
  margin-top: 0.2em;
  padding-left: 0.4em;
  width: 2.5em;
  height: 1em;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const LocationBtn = styled.button`
  font-size: 0.5em;
  width: 4em;
  padding: 0.3em 0;
`;

const MapBox = styled.div`
  display: flex;
`;

const KaKaoMapBox = styled.div`
  width: 8em;
  height: 10em;
`;

const SelectBtn = styled.button`
  width: 14em;
  height: 3.4em;
  margin: 1em 0;
  font-size: 0.4em;
`;

const LocationImage = styled.img`
  width: 9em;
  height: 8.5em;
  border-radius: 0.3em;
  padding: 5px;
  position: absolute;
  top: 28%;
  left: 38%;
`;
