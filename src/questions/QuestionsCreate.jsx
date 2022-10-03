import React, { useRef } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate } from "react-router-dom";

function QuestionsCreate() {
  const refTitle = useRef(null);
  const refQuestion = useRef(null);

  const navigate = useNavigate();

  function handleSave(e) {
    e.preventDefault();
    instance.post(`questions`, {
      questions: {
        title: refTitle.current.value,
        question: refQuestion.current.value
      }
    })
    .then((response) => {
      console.log("this is the response", response)
      navigate(`/questions/${response.data.id}`);

    });
  }
  
  return (
    <>
     QuestionsCreate
     <form className="form-container">
      <div className="">
        <div class="">
          <input ref={refTitle} id="questions-title" type="text" placeholder="Title" className="input-field" />
        </div>
        <div class="">
          <textarea ref={refQuestion} className="text-area">
            This is a text
          </textarea>
        </div>
      </div>

      <button onClick={handleSave} class="form-button-right">
        Salvar
      </button>
    </form>
    </>
  )
}

export { QuestionsCreate }