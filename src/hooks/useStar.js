import { useState } from 'react';

const useStar = () => {
  const [rate, setRate] = useState(0);
  const starArr = [1, 2, 3, 4, 5];

  const reactionStar = id => {
    setRate(id);
  };

  return { rate, starArr, reactionStar };
};

export default useStar;
