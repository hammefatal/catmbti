import React from 'react';
import styled from 'styled-components';
import { ProgressBar, Button } from 'react-bootstrap';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { QuestionData } from '../assets/data/questiondata';

const Question = () => {
  const [questionNo, setQuestionNo] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 }
  ]);
  const navigate = useNavigate();

  console.log(totalScore);

  const handleClickButton = (no, type) => {
    const newScore = totalScore.map(item => 
      item.id === type ? { id: item.id, score: item.score + no } : item
    );

    setTotalScore(newScore);

    if (questionNo + 1 < QuestionData.length) {
      setQuestionNo(questionNo + 1);
    
    } else {
      const mbti = newScore.reduce((acc, curr) => {
        return acc + (curr.score > 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2));
      }, "");

      navigate({
        pathname: '/result',
        search: `?${createSearchParams({
          mbti: mbti
        })}`
      });
    }
  }

  return (
    <Wrapper>
        <ProgressBar striped variant="danger" now={(questionNo /  QuestionData.length) * 100} style={{ marginTop: '20px' }}/>
        <Title>{QuestionData[questionNo].title}</Title>
        <ButtonGroup>
            <Button onClick= {()=>handleClickButton(1, QuestionData[questionNo].type)} style={{ width:"40%", minHeight: "200px", fontSize: "15pt" }}>{QuestionData[questionNo].answera}</Button>
            <Button onClick= {()=>handleClickButton(0, QuestionData[questionNo].type)} style={{ width:"40%", minHeight: "200px", fontSize: "15pt", marginLeft: "20px" }}>{QuestionData[questionNo].answerb}</Button>
        </ButtonGroup>
    </Wrapper>
  );
}

export default Question;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`

const Title = styled.div`
    font-size: 30pt;
    text-align: center;
    margin-top: 40px;
    font-family: "omyu_pretty";    
`

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: "omyu_pretty";
`
