import React from 'react';
import { Link } from 'react-router-dom';
import FOOTER_LIST from './FooterList';
import FOOTER_MEMBER from './FooterMembers';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterBody>
      <FooterInner>
        <FooterMenu>
          {FOOTER_LIST.map(({ id, title, list }) => {
            return (
              <FooterList key={id}>
                <H3>{title}</H3>
                <ul>
                  {list.map(({ id, listTitle, path }) => {
                    return (
                      <Link to={path} key={id}>
                        <Li>{listTitle}</Li>
                      </Link>
                    );
                  })}
                </ul>
              </FooterList>
            );
          })}
        </FooterMenu>
        <FooterInfo>
          <FooterDev>
            <H3>Developer</H3>
            <DevEmail>
              {FOOTER_MEMBER.map(({ id, name, img, github }) => {
                return (
                  <Github href={github} target="_blank" key={id}>
                    <UlLi key={id}>
                      <Img src={img} alt="member" />
                      <Name>{name}</Name>
                    </UlLi>
                  </Github>
                );
              })}
            </DevEmail>
          </FooterDev>
          <License>
            <br />
            (주)가보자GO <br /> 서울 강남구 테헤란로 427 위워크타워 10층 <br />
            통신판매업신고번호 00000000 | 등록번호 사업자 정보 확인
          </License>
        </FooterInfo>
      </FooterInner>
    </FooterBody>
  );
};

export default Footer;

const FooterBody = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.mainColor};
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
  font-weight: 300;
`;

const FooterMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-right: 30px;
`;

const FooterList = styled.div`
  margin-right: 120px;
`;

const H3 = styled.h3`
  border-bottom: 2px solid white;
  margin-bottom: 30px;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
`;

const Li = styled.li`
  margin-bottom: 20px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FooterDev = styled.div`
  color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
`;
const DevEmail = styled.ul`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
`;

const UlLi = styled.li`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: #fff;
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  border-radius: 0.5em;
  border: 1px solid white;
`;

const Name = styled.div`
  margin-left: -5px;
  width: 60px;
  color: white;
`;

const License = styled.p`
  border-top: 1px solid white;
  font-size: 1.2rem;
  line-height: 22px;
  color: white;
`;

const Github = styled.a``;
