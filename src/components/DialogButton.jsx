import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CreateAccount from '@/components/CreateAccount'

export default function DialogButton() {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger>
              <Button>Account</Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Log in to Reddit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className='sm:max-w-[500px]'>
        <CreateAccount />
      </DialogContent>
    </Dialog>
  )
}
