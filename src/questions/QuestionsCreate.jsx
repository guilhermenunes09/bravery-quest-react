import React, { useRef } from 'react';
import { instance } from '../services/QuestionsService';

function QuestionsCreate() {
  const refTitle = useRef(null);
  const refQuestion = useRef(null);

  function handleSave(e) {
    e.preventDefault();
    instance.post(`questions`, {
      questions: {
        title: refTitle.current.value,
        question: refQuestion.current.value
      }
    })
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