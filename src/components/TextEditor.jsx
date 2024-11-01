import { useContext, useEffect, useState } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'
import ValidButton from '@/components/ValidButton'
import InputTitle from '@/components/InputTitle'
import { useParams } from 'react-router-dom'
import { CreatedContext } from '@/components/Post'
import { useToast } from '@/hooks/use-toast'

function TextEditor() {
  const [isValid, setIsValid] = useState(true)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const [content, setContent] = useState('')
  const { title, setTitle } = useContext(CreatedContext)
  const postNumberParam = useParams()
  const { toast } = useToast()

  useEffect(() => {
    console.log(postNumberParam)
    if (postNumberParam?.post_no) {
      fetch(`http://localhost:8080/drafts/${postNumberParam.post_no}`)
        .then((res) => res.json())
        .then((draft) => {
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
    const requestObject = postNumberParam?.post_no
      ? {
          post_no: postNumberParam?.post_no,
          user_no: 0,
          post_title: titleRef?.current?.value,
          post_content: textRef?.current.getInstance().getMarkdown(),
          post_draft: isDraft,
        }
      : {
          user_no: 0,
          post_title: titleRef?.current?.value,
          post_content: textRef?.current.getInstance().getMarkdown(),
          post_draft: isDraft,
        }
    console.log(requestObject)
    await fetch(`http://localhost:8080/${isDraft ? 'drafts' : 'posts'}`, {
      method: postNumberParam?.post_no ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestObject),
    })
      .then((res) => {
        if (res.status >= 300) {
          toast({
            variant: 'destructive',
            title: 'Error!',
            description: '요청이 전달되지 않았습니다. 잠시 후 다시 시도해주세요.',
          })
        } else if (isDraft) {
          toast({
            title: '성공!',
            description: 'Draft가 업데이트 됩니다.',
          })
        } else {
          toast({
            title: '성공!',
            description: '잠시 후 작성된 글로 이동합니다.',
          })
          res.json().then((response) => {
            setTimeout(function () {
              console.log(`http://localhost:5173/posts/${response.post_no}`)
              // window.location.href = `http://localhost:5173/posts/${response.post_no}`
            }, 2000)
          })
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Internal Server Error',
        })
      })

    // 데이터를 받았을 경우 이것을 사용해 detail post 페이지로 route

    // 추후 toast 추가
  }

  return (
    <>
      <InputTitle value={title} reference={titleRef} isValid={isValid} setIsValid={setIsValid} />
      <Editor
        initialValue={content}
        previewStyle='vertical'
        height='200px'
        minHeight='200px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
        placeholder='Body'
        ref={textRef}
      />
      <div className='flex justify-end mt-4 gap-4'>
        <ValidButton eventFunction={() => request(true)} isValid={isValid}>
          {postNumberParam?.post_no ? 'Change Draft' : 'Save Draft'}
        </ValidButton>
        <ValidButton eventFunction={() => request(false)} isValid={isValid}>
          Post
        </ValidButton>
      </div>
    </>
  )
}

export default TextEditor
