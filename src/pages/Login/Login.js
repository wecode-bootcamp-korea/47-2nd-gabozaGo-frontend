/*global Kakao*/
import styled from 'styled-components';
import variables from '../../styles/variables';
import { Link } from 'react-router-dom';

export const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

const handleLogin = () => {
  window.location.href = KAKAO_AUTH_URI;
};

const Login = () => {
  return (
    <LoginBody>
      <LoginForm>
        <Logo>가보자GO</Logo>
        {/* <Link to={KAKAO_AUTH_URI}> */}
        <KakaoLoginBtn
          alt="kakaologin"
          src="images/kakaologin.png"
          onClick={handleLogin}
        />
        {/* </Link> */}
        <Link to="/">
          <ToMain>메인으로</ToMain>
        </Link>
      </LoginForm>
    </LoginBody>
  );
};

export default Login;

const LoginBody = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const LoginForm = styled.div`
  border: 1px solid black;
  border-radius: 0.5em;
  padding: 2em;
  width: 25em;
  height: 25em;
  ${variables.flex}
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
  margin: auto;
`;

const Logo = styled.div`
  font-size: 2.5em;
  font-weight: 900;
  padding-bottom: 1em;
  color: black;
`;

const KakaoLoginBtn = styled.img`
  height: 2.8em;
`;

const ToMain = styled.p`
  font-size: 0.8em;
`;
