import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyle';
import { useState } from 'react';

const Nav = () => {
  const [searchText, setSearchText] = useState('');

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlnput = e => {
    setSearchText(e.target.value);
  };

  const gotoLikePage = () => {};

  return (
    <>
      <GlobalStyle />
      <NavBody>
        <NavList>
          <Logo>
            <Link to="/">
              <LogoImage src="/images/logo.png" />
            </Link>
          </Logo>
          <SearchBar
            type="text"
            placeholder="검색"
            value={searchText}
            onChange={handlnput}
          />
          {token && (
            <Link to="/mypage">
              <LikeIcon
                src="images/heart.png"
                alt="찜 아이콘"
                onClick={gotoLikePage}
              />
            </Link>
          )}
          {token ? (
            <LoginBtn onClick={logout}>로그아웃</LoginBtn>
          ) : (
            <Link to="/login">
              <LoginBtn>로그인</LoginBtn>
            </Link>
          )}
        </NavList>
      </NavBody>
    </>
  );
};
export default Nav;

const NavBody = styled.div`
  width: 100vw;
  height: 3.7em;
`;

const NavList = styled.ul`
  width: 98vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.2em;
`;

const Logo = styled.li``;

const LogoImage = styled.img`
  width: 9em;
  height: 3em;
  margin-left: 1em;
`;

const SearchBar = styled.input`
  position: absolute;
  left: 40%;
  width: 23em;
  height: 2em;
  border: 1px solid #cccccc;
  border-radius: 0.5em;
  padding-left: 1em;
`;

const LoginBtn = styled.span`
  width: 4em;
  font-weight: 700;
  color: black;
  font-size: 1.1em;

  &:hover {
    cursor: pointer;
  }
`;

const LikeIcon = styled.img`
  display: flex;
  align-items: center;
  margin-left: 25em;
  position: absolute;
  top: 2%;
  left: 63%;
  width: 24px;
  height: 24px;
`;
