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

//오류해결 https://velog.io/@songyeonji_/React%EB%B2%84%EC%A0%84%EA%B3%BC-toast-ui-%EB%B2%84%EC%A0%84-%EC%98%A4%EB%A5%98

//https://github.com/nhn/tui.editor/blob/master/docs/ko/toolbar.md
//https://bloodstrawberry.tistory.com/1268
// https://hyonyong.tistory.com/entry/TOAST-UI-Editor-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0#%ED%88%B4%EB%B0%94%20%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95-1
// 옵션
// - previewStyle (마크다운 - vertical or tab 옵션)
// - initialEditType (처음 편집 타입 설정 wysiwyg or markdown)
// - hideModeSwitch (하단 바 숨김 여부)
// - toolbarItems (툴바 옵션)
// - dark theme (다크 테마 적용)
// - useCommandShortcut (키보드 입력 컨트롤 방지)
// - usageStatistics (통계 수집)
