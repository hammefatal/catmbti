import React from 'react';
// css-in-js
import styled from 'styled-components';
import CatImage from '../assets/catimg.jpg';
import Button from 'react-bootstrap/Button';
import { ResultData } from '../assets/data/resultdata';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get('mbti');
  const [resultData, setResultData] = React.useState({});

  React.useEffect(() => {
    const result = ResultData.find((s) => s.best === mbti);
    setResultData(result);
  }, [mbti]);

  return (
    <Wrapper>
        <Header>예비집사 판별기</Header>
        <Contents>
            <Title>결과 보기</Title>
            <LogoImage>
                <img src={resultData.image} className="rounded-circle" width={350} />
            </LogoImage>
            <Desc>예비 집사님과 찰떡궁합인 고양이는 {resultData.name}입니다.</Desc>
            <Button style={{ fontFamily: "omyu_pretty" }} onClick={()=>navigate("/")}>테스트 다시하기</Button>
        </Contents>
    </Wrapper>
  );
}

export default Result;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
const Header = styled.header`
    font-size: 40pt;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "omyu_pretty";
`

const Contents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Title = styled.div`
    font-size: 30pt;
    margin-top: 40px;
    font-family: "omyu_pretty";    
`

const LogoImage = styled.div`
    margin-top: 10px;
`

const Desc = styled.div`
    font-size: 20pt;
    margin-top: 20px;    
    font-family: "omyu_pretty";    
`