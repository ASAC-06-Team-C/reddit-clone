import Header from '@/components/header'
import MenuBar from '@/components/MenuBar'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

function Layout() {
  return (
    <>
      <Header />
      <div className='flex'>
        <MenuBar />
        <Separator orientation='vertical' />
        <Outlet />
        <Toaster />
      </div>
    </>
  )
}

export default Layout
