import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { instance } from '../services/QuestionsService';

function QuestionsShow() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});

  useEffect(() => {
    instance.get(`questions\\${questionId}`)
    .then(res => {
      setQuestion(res.data)
    })
  }, []);

  return (
    <>
      <div>
     QuestionsShow --
     { questionId }
     Title: -- {question.title}
     Question: { question.question }
     </div>
    </>
  )
}

export { QuestionsShow }