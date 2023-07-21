import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const KakaoMaps = ({ spot }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document?.createElement('script');
    document.head.appendChild(script);

    script.onload = () => {
      kakao?.maps.load(() => {
        const container = mapContainer.current;
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
      });
    };
  }, [spot, mapContainer]);

  return <MapContainer id="map" ref={mapContainer} />;
};

export default KakaoMaps;
const MapContainer = styled.div`
  width: 400px;
  height: 400px;
`;
