import { Button } from '@/components/ui/button'
import { Editor } from '@toast-ui/react-editor'
import { useRef, useState } from 'react'

const EditorComponent = ({ handleInputChange, commentRef, inputValue, editorType }) => (
  <Editor
    key={editorType}
    onChange={handleInputChange}
    ref={commentRef}
    height='100px'
    initialEditType={editorType}
    initialValue={`${inputValue} `}
    previewStyle='tab'
    hideModeSwitch={true}
    useCommandShortcut={true}
    usageStatistics={false}
  />
)

function CommentMarkdown({
  setInputState,
  inputValue,
  setInputValue,
  setText,
  setTextOptionState,
  comments,
  currentUserId,
}) {
  const [editorState, setEditorState] = useState(true)

  const commentRef = useRef(null)

  const handleState = (setState) => {
    setState((prev) => !prev)
  }

  const commentText = (comments) => {
    const newValue = {
      id: comments.length + 1,
      postId: 123,
      userId: currentUserId,
      content: inputValue,
      date: new Date(),
      profileImage: 'https://example.com/example.jpg',
      likes: 5,
      replies: [],
    }
    setText(newValue)
    commentRef.current.getInstance().setMarkdown('')
    setInputValue('')
  }

  const handleInputChange = () => {
    const markdownText = commentRef.current.getInstance().getMarkdown()
    setInputValue(markdownText)
  }

  return (
    <div>
      <EditorComponent
        handleInputChange={handleInputChange}
        commentRef={commentRef}
        inputValue={inputValue}
        editorType={editorState ? 'wysiwyg' : 'markdown'}
      />
      <Button onClick={() => handleState(setTextOptionState)}>T</Button>
      <Button onClick={() => handleState(setInputState)}>Cancel</Button>
      <Button onClick={() => commentText(comments)}>Comment</Button>
      <Button onClick={() => handleState(setEditorState)}>
        {editorState ? 'Markdown Editor' : 'Back to TextEditor'}
      </Button>
    </div>
  )
}

export default CommentMarkdown
