import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import editImage from '/img/edit-button.svg'
import deleteImage from '/img/delete-button.svg'
import { Link } from 'react-router-dom'
import { DialogClose } from '@radix-ui/react-dialog'
import { calculator } from '@/lib/timeCalculator'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

export default function DraftCard({ content, index, draft, setDraft }) {
  const { toast } = useToast()
  async function deleteDraft(index, post_no) {
    console.log(draft)
    await fetch(`http://localhost:8080/drafts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        post_no: post_no,
        user_no: 0,
      }),
    })
      .then((res) => {
        if (res.status >= 300) {
          toast({
            variant: 'destructive',
            title: '삭제 실패',
            description: '잠시 후 다시 이용 바랍니다.',
            action: <ToastAction altText='ok'>ok</ToastAction>,
          })
        }
        draft.splice(index, 1)
        setDraft(() => draft)
        toast({
          title: 'Draft 삭제 완료!',
        })
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Internal Server Error',
          description: 'Please Try Agiain Later',
          action: <ToastAction altText='ok'>ok</ToastAction>,
        })
      })
  }

  return (
    <Card className='w-[100%] mb-2 rounded-[8px] h-16 hover:bg-gray-100'>
      <div className='flex justify-between'>
        <div>
          <p className='font-bold m-1 mt-2 ml-3'>{content.post_title}</p>
          <p className='text-xs m-1 ml-3 text-gray-500'>{calculator(content.post_write_date)}</p>
        </div>
        <div className='flex items-center'>
          <Link to={`/post/${content.post_no}`}>
            <DialogClose>
              <Button variant='ghost' size='icon' className='hover:bg-gray-300'>
                <img src={editImage}></img>
              </Button>
            </DialogClose>
          </Link>
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-gray-300'
            onClick={() => deleteDraft(index, content.post_no)}
          >
            <img src={deleteImage}></img>
          </Button>
        </div>
      </div>
    </Card>
  )
}
