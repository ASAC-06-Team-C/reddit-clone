import Header from '@/components/header'
import MenuBar from '@/components/MenuBar'
import { Separator } from '@/components/ui/separator'
import '@/App.css'
export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <div className='flex h-screen'>
        <MenuBar />
        <Separator orientation='vertical' />
        {children}
      </div>
    </>
  )
}
