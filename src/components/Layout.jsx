import Header from '@/components/header'
import MenuBar from '@/components/MenuBar'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'
import '@/App.css'
export default function AppLayout() {
  return (
    <>
      <Header />
      <div className='flex h-screen'>
        <MenuBar />
        <Separator orientation='vertical' />
        <Outlet />
      </div>
    </>
  )
}
