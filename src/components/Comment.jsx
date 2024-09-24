import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Editor, Viewer } from '@toast-ui/react-editor'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

function CommentBasic({ basicState }) {
  return (
    <>
      <input placeholder='Add a comment' onClick={basicState} />
    </>
  )
}

function CommentTextarea({ basicState, textOptions, setComment }) {
  const commentRef = useRef(null)

  const commentText = () => {
    const value = commentRef.current.value
    commentRef.current.value = ''
    setComment(value)
  }

  return (
    <div>
      <textarea ref={commentRef} />
      <div>
        <Button onClick={textOptions}>T</Button>
        <Button onClick={basicState}>Canel</Button>
        <Button onClick={commentText}>Comment</Button>
      </div>
    </div>
  )
}

function CommentTextEditor({ basicState, textOptions, editorButton }) {
  const commentRef = useRef(null)

  return (
    <>
      <Editor
        // ref={commentRef}
        height='auto'
        initialEditType='wysiwyg'
        initialValue=' '
        previewStyle='tab'
        hideModeSwitch={true}
        useCommandShortcut={true}
        usageStatistics={false}
      />
      <Button onClick={textOptions}>T</Button>
      <Button onClick={basicState}>Canel</Button>
      <Button>Comment</Button>
      <Button onClick={editorButton}>Markdown Editor</Button>
    </>
  )
}

function CommentMarkdownEditor({ basicState, editorButton, setMarkdownText }) {
  const commentRef = useRef(null)

  const commentText = () => {
    const commentInstance = commentRef.current.getInstance().getMarkdown()

    setMarkdownText(commentInstance)
  }
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Editor
        ref={commentRef}
        height='auto'
        initialEditType='markdown'
        initialValue=' '
        previewStyle='tab'
        hideModeSwitch={true}
        useCommandShortcut={true}
        usageStatistics={false}
        toolbarItems={[]}
      />

      <Button onClick={basicState}>Cancel</Button>
      <Button onClick={commentText}>Comment</Button>
      <Button onClick={editorButton}>Back to Rich Text Editor</Button>
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

  const testData = ['첫 번째 댓글입니다!', '두 번째 댓글입니다!', '세 번째 댓글입니다!']
  const [comments, setComments] = useState(testData)
  const [comment, setComment] = useState(null)
  const [markdownText, setMarkdownText] = useState('')

  useEffect(() => {
    if (comment) setComments((prev) => [...prev, comment])
    setComment(null)
  }, [comment])

  useEffect(() => {
    if (markdownText) setComments((prev) => [...prev, markdownText])
    setMarkdownText(null)
  }, [markdownText])

  return (
    <div>
      <div>
        {inputState ? (
          <CommentBasic basicState={() => StateManager(inputState, setInputState)} />
        ) : textOptionsState ? (
          <CommentTextarea
            basicState={() => StateManager(inputState, setInputState)}
            textOptions={() => StateManager(textOptionsState, setTextOptionsState)}
            setComment={setComment}
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
            setMarkdownText={setMarkdownText}
          />
        )}
      </div>
      <div>
        <h3>댓글 목록:</h3>
        {/* {comments.map((text, index) => (
          <div key={index}>{text}</div>
        ))} */}
        {comments.map((text, index) => (
          <Viewer key={index} initialValue={text} />
        ))}
      </div>
      <div>{/* <Viewer key={markdownText} initialValue={markdownText} /> */}</div>
    </div>
  )
}

export default Comment
