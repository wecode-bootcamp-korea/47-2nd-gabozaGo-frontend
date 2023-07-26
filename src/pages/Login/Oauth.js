/*global Kakao*/
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Oauth = () => {
  const location = useLocation();
  const CODE = location.search.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/signin?code=${CODE}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.accessToken.newUser === false) {
          localStorage.setItem('token', data.accessToken.accessToken);
          navigate('/');
        } else {
          localStorage.setItem('token', data.accessToken.accessToken);
          navigate('/signup');
        }
      });
  }, []);

  return <></>;
};

export default Oauth;
