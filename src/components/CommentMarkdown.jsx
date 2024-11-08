import { Button } from '@/components/ui/button'
import { Editor } from '@toast-ui/react-editor'
import { useEffect, useRef, useState } from 'react'

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
  // setInputState,
  // inputValue,
  // setInputValue,
  // createComment,
  // setTextOptionState,
  // setComments,
  // currentUserNo,

  inputValue,
  setInputValue,
  editorState,
}) {
  // const [editorState, setEditorState] = useState(true)

  const commentRef = useRef(null)
  useEffect(() => {
    if (inputValue === '') {
      commentRef.current.getInstance().setMarkdown('')
    }
  }, [inputValue])

  // const handleState = (setState) => {
  //   setState((prev) => !prev)
  // }

  // const commentText = async () => {
  //   const newCreateComment = {
  //     post_no: 4, // 현재 게시물 번호
  //     user_no: currentUserNo,
  //     comment_content: inputValue,
  //     comment_mother: 0, // 부모 댓글 no
  //     comment_depth: 0, // 댓글의 깊이
  //   }
  //   try {
  //     const newComment = await createComment(newCreateComment)
  //     setComments((prevComments) => [...prevComments, newComment])
  //     commentRef.current.getInstance().setMarkdown('')
  //     setInputValue('')
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

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
      {/* <Button onClick={() => handleState(setTextOptionState)}>T</Button>
      <Button onClick={() => handleState(setInputState)}>Cancel</Button>
      <Button onClick={() => commentText()}>Comment</Button> */}
      {/* <Button onClick={() => handleState(setEditorState)}>
        {editorState ? 'Markdown Editor' : 'Back to TextEditor'}
      </Button> */}
    </div>
  )
}

export default CommentMarkdown
