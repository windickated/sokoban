import { useState } from "react"
import "./styles/index.scss"
import field from "./data/gameLevels"
import Playground from "./components/Playground"
import Header from "./components/Header"
import Footer from "./components/Footer"


function Sokoban() {
  interface Device {
    pc: boolean
    pcWideScreen: boolean
    mobile: boolean
    touchScreen: boolean
  }
  
  const usersDevice: Device = {
    pc: window.outerWidth > 1024 ? true : false,
    pcWideScreen: window.outerWidth >= 1280 ? true : false,
    mobile: window.outerWidth < 768 ? true : false,
    touchScreen: "ontouchstart" in document.documentElement ? true : false
  }

  const [level, setLevel] = useState(1);
  const [currentMove, setCurrentMove] = useState(field[level - 1])

  function switchLevel(number: number) {
    setLevel(number);
    setCurrentMove(field[number - 1]);
  }
  
  return (
    <section className="game">
      <Header device={usersDevice} level={level} switchLevel={switchLevel} />
      <Playground gameField={currentMove} />
      <Footer device={usersDevice} />
    </section>
  )
}

export default Sokoban
