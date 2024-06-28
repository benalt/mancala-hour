import { StrictMode } from 'react'
import './App.css'
import MancalaBoard from './components/MancalaBoard/MancalaBoard'

function App() {



  return (
    <StrictMode>
      <MancalaBoard onGameMessageLog={(msg:string)=>{console.log(msg)}} />
    </StrictMode>
  )
}

export default App
