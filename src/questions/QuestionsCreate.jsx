import React, { useRef, useState } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate } from 'react-router-dom';
import { TextEditor } from '../components/TextEditor';

function QuestionsCreate() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');

  const navigate = useNavigate();

  function handleSave(e) {
    e.preventDefault();
    instance.post(`questions`, {
      questions: {
        title: title,
        question: question
      }
    })
    .then((response) => {
      navigate(`/questions/${response.data.id}`);

    });
  }

  function handleTitleChange(e) {
    console.log('check title', e.target.value);
    setTitle(e.target.value);
  }

  function textData(data) {
    setQuestion(data);
  }
  
  return (
    <>
     <form className="form-container">
      <div className="">
        <div class="">
          <input onChange={handleTitleChange} id="questions-title" type="text" placeholder="Title" className="input-field" autoFocus />
        </div>
        
        <div class="">
          <TextEditor text={textData} />
        </div>
      </div>

      <button disabled={title.length < 15 ? true : false || question.length < 20 ? true : false} onClick={handleSave} class="form-button-right">
        Save
      </button>
    </form>
    </>
  )
}

export { QuestionsCreate }