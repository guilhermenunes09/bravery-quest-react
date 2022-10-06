import React, { useRef, useState, useMemo } from 'react';
import { instance } from '../services/QuestionsService';
import { useNavigate } from 'react-router-dom';

import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'

import ReactQuill from 'react-quill'

function QuestionsCreate() {
  hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust'],
  })

  const modules = useMemo(() => ({
    syntax: {
      highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{'header': [2, false] }],
      ['bold', 'italic'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['code-block']
    ],
    clipboard: {
      matchVisual: false,
    }
  }),[])

  const formats = [
    'header',
    'bold', 'italic',
    'list', 'bullet',
    'link',
    'code-block'
  ]

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
          
          <ReactQuill theme="snow" value={question} onChange={setQuestion} className="text-area-question" modules={modules} formats={formats} />
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