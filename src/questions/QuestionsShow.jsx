import React from 'react';
import { useParams } from 'react-router';

function QuestionsShow() {
  const { questionId } = useParams();

  return (
    <>
     QuestionsShow --
     { questionId }
    </>
  )
}

export { QuestionsShow }