import { useContext, useEffect, useState } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'
import ValidButton from '@/components/ValidButton'
import InputTitle from '@/components/InputTitle'
import { useParams } from 'react-router-dom'
import { CreatedContext } from '@/components/Post'

function TextEditor() {
  const [isValid, setIsValid] = useState(true)
  const titleRef = useRef(null)
  const textRef = useRef(null)

  const [content, setContent] = useState('')
  const { title, setTitle } = useContext(CreatedContext)
  const postNumberParam = useParams()

  useEffect(() => {
    console.log(postNumberParam)
    if (postNumberParam?.post_no) {
      fetch(`http://localhost:8080/drafts/${postNumberParam.post_no}`)
        .then((res) => res.json())
        .then((draft) => {
          console.log(draft)
          setTitle(draft.post_title)
          setContent(() => draft.post_content)
        })
    }
  }, [postNumberParam])

  useEffect(() => {
    if (textRef.current) {
      textRef.current.getInstance().setMarkdown(content || '')
    }
  }, [content])

  async function request(isDraft) {
    //user_no의 경우 추후 수정해야 합니다.
    const requestObject = {
      user_no: 0,
      post_title: titleRef?.current?.value,
      post_content: textRef?.current.getInstance().getMarkdown(),
      post_draft: isDraft,
    }
    if (isDraft) {
      const response = await fetch('http://localhost:8080/drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(requestObject),
      })
      const data = await response.json()
      console.log(data)
    } else {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(requestObject),
      })
      const data = await response.json()
      console.log(data)
    }

    // 추후 toast 추가
  }

  // 만약 그냥 HTML 형식 받아오고 싶으면 getHTML
  // 자세한건 https://nhn.github.io/tui.editor/latest/ToastUIEditor

  return (
    <>
      <InputTitle value={title} reference={titleRef} isValid={isValid} setIsValid={setIsValid} />
      <Editor
        initialValue={content}
        previewStyle='vertical'
        height='200px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
        placeholder='Body'
        ref={textRef}
      />
      <div className='flex justify-end mt-4 gap-4'>
        <ValidButton eventFunction={() => request(false)} isValid={isValid}>
          Save Draft
        </ValidButton>
        <ValidButton eventFunction={() => request(true)} isValid={isValid}>
          Post
        </ValidButton>
      </div>
    </>
  )
}

export default TextEditor
