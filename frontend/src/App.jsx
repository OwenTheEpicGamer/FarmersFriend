import { useState } from 'react'
import './App.css'
import Listings from './components/Listings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Listings></Listings>
    </>
  )
}

export default App
