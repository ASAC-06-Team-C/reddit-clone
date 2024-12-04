import { useContext, useEffect, useState } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'
import ValidButton from '@/components/ValidButton'
import InputTitle from '@/components/InputTitle'
import { useParams } from 'react-router-dom'
import { CreatedContext } from '@/components/Post'
import { useToast } from '@/hooks/use-toast'
import * as API from '@/constants/API'

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
      fetch(`${API.MAIN_DOMAIN + API.PATH_DRAFTS}/${postNumberParam.post_no}`)
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
    const userNo = JSON.parse(localStorage.getItem('loginStatus')).user_no

    const requestObject = postNumberParam?.post_no
      ? {
          post_no: postNumberParam?.post_no,
          user_no: userNo,
          post_title: titleRef?.current?.value,
          post_content: textRef?.current.getInstance().getMarkdown(),
          post_draft: isDraft,
        }
      : {
          user_no: userNo,
          post_title: titleRef?.current?.value,
          post_content: textRef?.current.getInstance().getMarkdown(),
          post_draft: isDraft,
        }
    console.log(requestObject)
    await fetch(`${API.MAIN_DOMAIN}${isDraft ? API.PATH_DRAFTS : API.PATH_POSTS}`, {
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
