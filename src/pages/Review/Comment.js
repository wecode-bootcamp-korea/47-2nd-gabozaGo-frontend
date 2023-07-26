import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ImStarFull } from 'react-icons/im';

const Comment = ({ productId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/reviews/${productId}`)
      .then(res => res.json())
      .then(data => setComments(data.data));
  }, []);

  const arr = [1, 2, 3, 4, 5];

  return (
    <CommentBody>
      <CommentBox>
        <UserProfile>
          {comments.map(info => {
            const score = Math.floor(info.rating);
            return (
              <UserInfo key={`comment-${info.id}`}>
                <RowDiv>
                  <ProfileBox>
                    <UserImg src={info.profileImage} />
                    <UserName>{info.name}</UserName>
                  </ProfileBox>
                  <AllStarBox>
                    <AllStar filled={true}>
                      {arr.map((ele, idx) => {
                        return <ImStarFull key={idx} />;
                      })}
                    </AllStar>
                    <BlueStar filled={true}>
                      {Array.from({ length: info.rating }, idx => (
                        <ImStarFull key={idx} />
                      ))}
                    </BlueStar>
                  </AllStarBox>
                  <UserRating>{score} 점</UserRating>
                </RowDiv>
                <UserComment>{info.userComment}</UserComment>
              </UserInfo>
            );
          })}
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
    cursor: default;
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

const AllStar = styled.div`
  display: flex;
  svg {
    font-size: 1.3em;
    path {
      color: ${props => (props.star ? props.theme.gabozaColor : 'lightgray')};
      cursor: default;
    }
  }
`;

const AllStarBox = styled.div`
  position: relative;
`;

const BlueStar = styled.div`
  position: absolute;
  top: 0%;
  svg {
    font-size: 1.3em;
    path {
      color: ${props => props.theme.gabozaColor};
      cursor: default;
    }
  }
`;
