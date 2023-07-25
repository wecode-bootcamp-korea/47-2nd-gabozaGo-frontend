import { styled } from 'styled-components';
import { ImStarFull } from 'react-icons/im';
import useStar from '../../hooks/useStar';

const Review = () => {
  const { rate, starArr, reactionStar } = useStar();

  return (
    <ReviewBody>
      <ReviewBox>
        <ProfileImage src="/images/sujeong.png" />
        <InputBox>
          <RowBox>
            <UserName>김수정</UserName>
            <AllStar>
              {starArr?.map((star, idx) => {
                return (
                  <AllStar star={star <= rate} key={idx}>
                    <ImStarFull onClick={() => reactionStar(star)} />
                  </AllStar>
                );
              })}
            </AllStar>
          </RowBox>
          <InputReview type="text" />
          <ButtonBox>
            <WriteButton>입력</WriteButton>
          </ButtonBox>
        </InputBox>
      </ReviewBox>
    </ReviewBody>
  );
};

export default Review;

const ReviewBody = styled.div`
  margin-top: 1em;
  width: 41.1em;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 1px 1px 3px #d8d8d8;
  border-bottom: 1px solid #f0f0f0;
`;

const ReviewBox = styled.div`
  display: flex;
  padding: 1em 2.5em;
  width: 36em;
  height: 11em;
  justify-content: center;
  border-radius: 1em;
  justify-content: space-evenly;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 3em;
  height: 3em;
  margin-right: 0.5em;
`;

const UserName = styled.h3`
  display: flex;
  align-items: center;
  width: 4em;
  height: 2em;
  padding-left: 1em;
`;

const RowBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled.div`
  align-items: center;
`;

const InputReview = styled.input`
  margin-top: 0.5em;
  width: 30em;
  height: 3em;
  border: 1px solid #cccccc;
  border-radius: 0.5em;
  padding-left: 1em;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const WriteButton = styled.button`
  margin-top: 0.5em;
  width: 4.5em;
  height: 2.5em;
  border: none;
  background-color: ${props => props.theme.mainColor};
  border-radius: 0.5em;
`;

const AllStar = styled.div`
  display: flex;
  svg {
    font-size: 1.3em;
    path {
      color: ${props => (props.star ? props.theme.gabozaColor : 'lightgray')};
      cursor: pointer;
    }
  }
`;
