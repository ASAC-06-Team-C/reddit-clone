import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@/App.css'

function TextButtonApp() {
  const [state, setState] = useState(true)

  return (
    <>
      <div className='button-group' style={{ display: 'flex', gap: 10 }}>
        <button>Text</button>
      </div>
    </>
  )
}

function InputTitle() {
  const [input, setInput] = useState('')
  const [length, setLength] = useState(0)

  function lengthCalculate(value) {
    setInput(value)
    setLength(input.length)
  }

  return (
    <>
      <div className='input-title' style={{ display: 'grid', gap: 10 }}>
        <input
          type='text'
          placeholder='title'
          value={input}
          onChange={(e) => {
            lengthCalculate(e.currentTarget.value)
          }}
        />
        <p>{length}/300</p>
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <TextButtonApp />
      <InputTitle />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
