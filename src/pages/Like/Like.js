import { styled } from 'styled-components';
import { useState, useEffect } from 'react';

const Like = () => {
  const [likes, setLikes] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/likes`)
      .then(res => res.json())
      .then(result => setLikes(result.data));
  }, []);

  const handleDisLike = id => {
    fetch(`${process.env.REACT_APP_API_URL}/likes/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    });
  };

  const handleDelete = id => {
    const newLike = likes.filter(item => item.storeActivityId !== id);
    setLikes(newLike);
    handleDisLike(id);
  };

  return (
    <LikeBody>
      <LikeIBox>
        {likes.map(info => {
          const parsedPrice = parseInt(info.perPrice).toLocaleString();
          return (
            <LikeInfo key={info.storeActivityId}>
              <LikeIImage src={info.image} />
              <RowDiv>
                <ProductInfo>{info.storeName}</ProductInfo>
                <ProductInfo>{info.spotName}</ProductInfo>
                <ProductInfo>{parsedPrice} 원</ProductInfo>
              </RowDiv>
              <ColumnDiv>
                <DeleteBtn onClick={() => handleDelete(info.storeActivityId)}>
                  ✕
                </DeleteBtn>
                <GotoDatailBtn>상세페이지로</GotoDatailBtn>
              </ColumnDiv>
            </LikeInfo>
          );
        })}
      </LikeIBox>
    </LikeBody>
  );
};

export default Like;

const LikeBody = styled.div`
  display: flex;
  justify-content: center;
`;

const LikeIBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  margin: 1em 0;
`;

const LikeInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  margin: 0.5em;
  padding: 1em;
  height: 11em;
  width: 40em;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 1px 1px 3px #d8d8d8;
`;

const LikeIImage = styled.img`
  width: 9em;
  height: 9em;
  border-radius: 0.5em;
  margin-right: 1em;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 8em;
  width: 15em;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 8em;
  width: 13em;
`;

const ProductInfo = styled.p`
  margin-left: 1em;
  font-size: 1.2em;
  font-weight: 600;
`;

const DeleteBtn = styled.button`
  width: 2em;
  height: 2em;
  color: black;
  font-size: 1.1em;
  background-color: transparent;
`;

const GotoDatailBtn = styled.button`
  width: 12em;
  height: 3em;
`;
