import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useRef, useState } from 'react'

function CommentBasic({ basicState }) {
  return (
    <>
      <input placeholder='Add a comment' onClick={basicState} />
    </>
  )
}

function CommentTextarea({ basicState, textOptions }) {
  return (
    <div>
      <textarea />
      <div>
        <button onClick={textOptions}>T</button>
        <button onClick={basicState}>Canel</button>
        <button>Comment</button>
      </div>
    </div>
  )
}

function CommentTextEditor({ basicState, textOptions, editorButton }) {
  const editorRef = useRef(null)

  const myCustomButton = document.createElement('button')
  myCustomButton.addEventListener('click', editorButton)
  myCustomButton.innerText = 'Markdown Editor'
  return (
    <>
      <Editor
        // ref={editorRef}
        height='auto'
        initialEditType='wysiwyg'
        initialValue=' '
        previewStyle='tab'
        hideModeSwitch={true}
        useCommandShortcut={true}
        usageStatistics={false}
        toolbarItems={[
          ['bold', 'italic', 'strike', 'heading'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
          [
            {
              name: 'myCustom',
              el: myCustomButton,
            },
          ],
        ]}
      />
      <button onClick={textOptions}>T</button>
      <button onClick={basicState}>Canel</button>
      <button>Comment</button>
    </>
  )
}

function CommentMarkdownEditor({ basicState, editorButton }) {
  const editorRef = useRef(null)

  const myCustomButton = document.createElement('button')
  myCustomButton.innerText = 'Back to Rich Text Editor'
  myCustomButton.addEventListener('click', editorButton)

  const myCustomSpan = document.createElement('span')
  myCustomSpan.innerText = 'Markdown Editor'

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Editor
        // ref={editorRef}
        height='auto'
        initialEditType='markdown'
        initialValue=' '
        previewStyle='tab'
        hideModeSwitch={true}
        useCommandShortcut={true}
        usageStatistics={false}
        toolbarItems={[
          [
            { name: 'myCustomSpan', el: myCustomSpan },
            { name: 'myCustom', el: myCustomButton },
          ],
        ]}
      />

      <button onClick={basicState}>Cancel</button>
      <button>Comment</button>
    </div>
  )
}

function StateManager(currentState, updateState) {
  updateState(!currentState)
}

function Comment() {
  const [inputState, setInputState] = useState(true)
  const [textOptionsState, setTextOptionsState] = useState(true)
  const [editState, setEditState] = useState(true)

  return (
    <div>
      <div>
        {inputState ? (
          <CommentBasic basicState={() => StateManager(inputState, setInputState)} />
        ) : textOptionsState ? (
          <CommentTextarea
            basicState={() => StateManager(inputState, setInputState)}
            textOptions={() => StateManager(textOptionsState, setTextOptionsState)}
          />
        ) : editState ? (
          <CommentTextEditor
            basicState={() => StateManager(inputState, setInputState)}
            textOptions={() => StateManager(textOptionsState, setTextOptionsState)}
            editorButton={() => StateManager(editState, setEditState)}
          />
        ) : (
          <CommentMarkdownEditor
            basicState={() => StateManager(inputState, setInputState)}
            editorButton={() => StateManager(editState, setEditState)}
          />
        )}
      </div>
    </div>
  )
}

export default Comment
