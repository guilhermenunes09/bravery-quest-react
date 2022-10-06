import React, { useRef, useState } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuestionsCreate() {
  const refTitle = useRef(null);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  function handleSave(e) {
    e.preventDefault();
    instance.post(`questions`, {
      questions: {
        title: refTitle.current.value,
        question: value
      }
    })
    .then((response) => {
      console.log("this is the response", response)
      navigate(`/questions/${response.data.id}`);

    });
  }
  
  return (
    <>
     <form className="form-container">
      <div className="">
        <div class="">
          <input ref={refTitle} id="questions-title" type="text" placeholder="Title" className="input-field" autoFocus />
        </div>
        <div class="">
          <ReactQuill theme="snow" value={value} onChange={setValue} className="text-area-question" />
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