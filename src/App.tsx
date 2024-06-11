//import { useState } from 'react'
import './App.css'
import MancalaBoard from './components/MancalaBoard/MancalaBoard'

function App() {



  return (
    <>
      <MancalaBoard onGameMessageLog={(msg:string)=>{console.log(msg)}} />
    </>
  )
}

export default App
