import React, { useRef, useState } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate } from 'react-router-dom';
import { TextEditor } from '../components/TextEditor';

function QuestionsCreate() {
  const refTitle = useRef(null);
  const [question, setQuestion] = useState('');

  const navigate = useNavigate();

  function handleSave(e) {
    e.preventDefault();
    instance.post(`questions`, {
      questions: {
        title: refTitle.current.value,
        question: question
      }
    })
    .then((response) => {
      navigate(`/questions/${response.data.id}`);

    });
  }

  function textData(data) {
    setQuestion(data);
  }
  
  return (
    <>
     <form className="form-container">
      <div className="">
        <div class="">
          <input ref={refTitle} id="questions-title" type="text" placeholder="Title" className="input-field" autoFocus />
        </div>
        <div class="">
          <TextEditor text={textData} />
        </div>
      </div>

      <button onClick={handleSave} class="form-button-right">
        Save
      </button>
    </form>
    </>
  )
}

export { QuestionsCreate }