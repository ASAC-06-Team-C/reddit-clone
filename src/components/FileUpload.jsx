import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function UploadFile() {
  return (
    <div className='w-full items-center'>
      <Input
        id='picture'
        type='file'
        style={{ height: '200px', width: '100%' }}
        placeholder='asdf'
      />
    </div>
  )
}

export default UploadFile
