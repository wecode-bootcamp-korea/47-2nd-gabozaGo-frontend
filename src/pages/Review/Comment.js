import styled from 'styled-components';

import { useState, useEffect } from 'react';

const Comment = () => {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    fetch('data/comment.json')
      .then(res => res.json())
      .then(data => setComment(data.data));
  }, []);

  return (
    <CommentBody>
      <CommentBox>
        <UserProfile>
          {comment.map(info => (
            <UserInfo key={info.id}>
              <RowDiv>
                <ProfileBox>
                  <UserImg src={info.images} />
                  <UserName>{info.userName}</UserName>
                </ProfileBox>
                <UserRating>{info.rating} 점</UserRating>
              </RowDiv>
              <UserComment>{info.userComment}</UserComment>
            </UserInfo>
          ))}
        </UserProfile>
      </CommentBox>
    </CommentBody>
  );
};

export default Comment;

const CommentBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 1.3em;
`;

const CommentBox = styled.div`
  width: 41em;
  background-color: white;
  box-shadow: 1px 1px 3px #d8d8d8;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 1em;
`;

const UserProfile = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-direction: column;
  align-items: center;
`;

const UserImg = styled.img`
  width: 3em;
  height: 3em;
  border-radius: 50%;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35em;
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  width: 18em;
`;

const UserInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin: 1em 0.3em;
`;

const UserName = styled.p`
  margin-left: 1em;
  font-size: 1.2em;
  font-weight: 600;
`;

const UserRating = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  & svg {
    color: #f2f3f7;
    cursor: pointer;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

const UserComment = styled.p`
  width: 100%;

  font-size: 1.1em;
  font-weight: bold;
  margin-top: 1.2em;
  padding-bottom: 30px;
  border-bottom: 1px solid #e4e5ed;
  color: #605969;
`;
