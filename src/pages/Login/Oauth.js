/*global Kakao*/
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Oauth = () => {
  const location = useLocation();
  const CODE = location.search.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://10.58.52.224:3000/users/signin?code=${CODE}`)
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
