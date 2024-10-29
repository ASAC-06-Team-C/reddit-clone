import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DraftList from '@/components/DraftList'

const dummy1 = {
  post_title: 'test1',
  post_write_date: String(new Date()),
}
const dummy2 = {
  post_title: 'test2',
  post_write_date: String(new Date()),
}

export default function DraftButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='font-bold'>
          Drafts
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[532px] sm:rounded-sm'>
        <DialogHeader>
          <DialogTitle>Drafts</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <DraftList content={dummy1}></DraftList>
          <DraftList content={dummy2}></DraftList>
        </div>
      </DialogContent>
    </Dialog>
  )
}
