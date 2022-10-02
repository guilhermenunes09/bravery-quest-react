import React from 'react';

function QuestionsCreate() {
  return (
    <>
     QuestionsCreate
     <form className="w-full max-w-lg bg-blue-900 self-center">
      <div className="flex flex-wrap -mx-3 mb-6 bg-slate-600 self-center">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 self-center">
          <input id="questions-title" type="text" placeholder="Title" className="input-field" />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <textarea className="text-area">
            This is a text
          </textarea>
        </div>
      </div>
    </form>
    </>
  )
}

export { QuestionsCreate }