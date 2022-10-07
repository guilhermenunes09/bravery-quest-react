import React, { useMemo, useState } from 'react';
import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'

import ReactQuill from 'react-quill'

const TextEditor = (props) => {
   const [value, setValue] = useState('');

   hljs.configure({
      languages: ['javascript', 'ruby', 'python', 'rust'],
    });

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
    }),[]);
  
    const formats = [
      'header',
      'bold', 'italic',
      'list', 'bullet',
      'link',
      'code-block'
    ];

    function handleChange(value) {
      setValue(value);
      props.text(value);
    }

   return (
      <>
        <div className='container'>
          <div className='text-area-container'>
            <ReactQuill theme="snow" value={value} onChange={handleChange} className="text-area-question bg-white" modules={modules} formats={formats} />
          </div>
        </div>
      </>
   )
}

export { TextEditor }