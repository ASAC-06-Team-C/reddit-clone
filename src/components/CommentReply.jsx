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

function CommentReply({ onSubmit, currentUserId }) {
  const [editorState, setEditorState] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const commentRef = useRef(null)

  const handleInputChange = () => {
    const markdownText = commentRef.current.getInstance().getMarkdown()
    setInputValue(markdownText)
  }

  const handleCommentSubmit = () => {
    const newComment = {
      id: 0,
      postId: 123,
      userId: currentUserId,
      content: inputValue,
      date: new Date(),
      profileImage: 'https://example.com/example.jpg',
      likes: 0,
      replies: [],
    }
    onSubmit(newComment)
    commentRef.current.getInstance().setMarkdown('')
    setInputValue('')
  }

  return (
    <div>
      <EditorComponent
        handleInputChange={handleInputChange}
        commentRef={commentRef}
        inputValue={inputValue}
        editorType={editorState ? 'wysiwyg' : 'markdown'}
      />
      <Button onClick={handleCommentSubmit}>Reply</Button>
      <Button onClick={() => setEditorState((prev) => !prev)}>
        {editorState ? 'Markdown Editor' : 'Back to TextEditor'}
      </Button>
    </div>
  )
}

export default CommentReply
