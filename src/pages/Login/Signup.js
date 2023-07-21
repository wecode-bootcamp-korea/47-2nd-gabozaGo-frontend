import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [activeLocation, setActiveLocation] = useState('');
  const [location, setLocation] = useState([]);
  const [tag, setTag] = useState([]);
  const navigate = useNavigate();

  const [isSignupActive, setIsSignupActive] = useState(false);

  useEffect(() => {
    setIsSignupActive(activeLocation !== '' && activeTags.length >= 5);
  }, [activeLocation, activeTags]);

  const validateNumber = /^\d{0,11}$/;
  const validatePhone = phone.length !== 0 && phone.length === 11;
  const token = localStorage.getItem('token');
  const changePhone = e => {
    const inputValue = e.target.value;
    setPhone(inputValue);
  };

  const changeLocation = locId => {
    setActiveLocation(locId);
  };

  const changeTag = tagId => {
    if (activeTags.indexOf(tagId) >= 0) {
      setActiveTags(activeTags.filter(id => id !== tagId));
    } else {
      setActiveTags([...activeTags, tagId]);
    }
  };

  useEffect(() => {
    fetch('data/location.json')
      .then(res => res.json())
      .then(data => setLocation(data.location));
  }, []);

  useEffect(() => {
    fetch('data/tags.json')
      .then(res => res.json())
      .then(data => setTag(data.tags));
  }, []);

  const addInfo = () => {
    fetch('http://10.58.52.209:3000/users/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify({
        socialPlatform: 'kakao',
        phoneNumber: phone,
        userSpots: activeLocation,
        userActivities: activeTags,
      }),
    }).then(res => {
      if (res.status === 200) {
        navigate('/');
      }
    });
  };

  return (
    <SignupBody>
      <SignupBox>
        <Title> 회원가입</Title>
        <InputBox>
          <InputPhone
            type="text"
            name="phone"
            value={phone}
            onChange={changePhone}
            placeholder="전화번호 11자리를 숫자로 입력해주세요"
          />
          <ErrorText>
            {phone && !validateNumber.test(phone) && (
              <ErrorMessage>숫자 11자리를 입력해주세요</ErrorMessage>
            )}
          </ErrorText>
        </InputBox>
        <SelectBox>
          <SelectTitle>가고싶은 여행지를 선택해주세요. (필수 1개)</SelectTitle>
          <TagBox>
            {location.map(({ id, name }) => {
              return (
                <TagList key={id}>
                  <Tag
                    onClick={() => changeLocation(id)}
                    active={Number(activeLocation) === id}
                  >
                    {name}
                  </Tag>
                </TagList>
              );
            })}
          </TagBox>
          <SelectTitle>이번 여름의 목표를 선택해주세요. (필수 5개)</SelectTitle>
          <TagBox>
            {tag.map(({ id, name }) => {
              return (
                <TagList key={id}>
                  <Tag
                    onClick={() => changeTag(id)}
                    active={activeTags.indexOf(id) >= 0}
                  >
                    {name}
                  </Tag>
                </TagList>
              );
            })}
          </TagBox>
        </SelectBox>
        <SignupButton
          validatePhone={validatePhone}
          isActive={isSignupActive}
          onClick={addInfo}
        >
          회원가입
        </SignupButton>
      </SignupBox>
    </SignupBody>
  );
};

export default Signup;

const SignupBody = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 10em 0;
`;

const SignupBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 35em;
  height: 40em;
  border: 1px solid black;
  border-radius: 1em;
`;
const InputBox = styled.div``;

const ErrorMessage = styled.span`
  color: red;
`;

const Title = styled.h1`
  padding: 1em 0;
`;

const InputPhone = styled.input`
  width: 20em;
  height: 3em;
  border-bottom: 1px solid #a0a0a0;
  border-radius: 0.5em;
  padding: 0 1em;
`;

const ErrorText = styled.div`
  margin-top: 0.7em;
  text-align: center;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectTitle = styled.h1`
  font-size: 1.3em;
  padding: 1em 0 1em 0;
`;

const TagBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  margin-bottom: 1em;
`;

const TagList = styled.li`
  padding-top: 1em;
`;

const Tag = styled.button`
  width: 6em;
  height: 3em;
  border-radius: 1em;
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${props => (props.active ? '#0099ff' : '#a0a0a0')};
  border: 0px;
`;

const SignupButton = styled.button`
  margin-top: 3em;
  width: 22em;
  height: 4.5em;
  border: none;
  border-radius: 1em;
  background-color: ${props =>
    props.validatePhone && props.isActive ? '#0099ff' : 'gray'};
  color: white;
`;
