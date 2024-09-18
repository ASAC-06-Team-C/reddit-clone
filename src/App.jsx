import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import '@/App.css'

import Board from '@/Board'
import BoardDetail from '@/BoardDetail'

function App() {
  return (
    <>
      <Board />
      <BoardDetail />
    </>
  )
}

export default App
