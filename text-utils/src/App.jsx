
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ButtonToggle } from './components/ButtonToggle'
import { useState } from 'react'
import { Input } from './components/input'

function App() {

  const [color, setColor] = useState("bg-white")
  const changeColor=()=> {
    setColor(color === "bg-white text-black" ? "bg-gray-800 text-white":"bg-white text-black")
  }

  return (
    <div className={`${color} min-h-screen`}>
      <Header data={{header: "TextUtils"}}></Header>
      <ButtonToggle data={{text:"Tooggle theme", click: changeColor}}></ButtonToggle>
      <Input></Input>
      <Footer data={{footer: "all copyright reserved"}}></Footer>
    </div>
  )
}

export default App
