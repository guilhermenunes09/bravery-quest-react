import React, { useEffect, useState } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate } from 'react-router-dom';
import { TextEditor } from '../components/TextEditor';
 
function QuestionsCreate() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('warrior'));
    if (!user) {
      navigate('/login');
    }
  },[]);

  function handleSave(e) {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('jetsky_token'));
    console.log('what is instance', instance)
    instance.post(`questions`, {
      questions: {
        title: title,
        question: question
      }
    }, {
      headers: {
        authorization: `Bearer ${token.token}`
      }
    })
    .then((response) => {
      navigate(`/questions/${response.data.identifier}`);
    });
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function textData(data) {
    setQuestion(data);
  }
  
  return (
    <> 
    <div className='card'>
      <form>
        <div className="">
          <h1 className='ml-1 mb-4 text-[27px] block'>
            New Question
          </h1>
          <div class="">
            <label>Title</label>
            <input onChange={handleTitleChange} id="questions-title" type="text" placeholder="How to center a div vertically..." className="input-field" />
          </div>
          
          <label className='mt-3'>Question</label>
          <div class="">
            <TextEditor text={textData} />
            <div className='under-input-label'>Describe your issue, the more details the better.</div>
          </div>
        </div>

        <button disabled={title.length < 5 ? true : false || question.length < 5 ? true : false} onClick={handleSave} class="form-button-right">
          Save
        </button>
      </form>
    </div>
    </>
  )
}

export { QuestionsCreate }