import { useState, useEffect, useRef } from "react"
import "./styles/index.scss"
import field from "./data/gameLevels"
import Playground from "./components/Playground"
import Header from "./components/Header"
import Footer from "./components/Footer"


interface Device {
  pc: boolean
  pcWideScreen: boolean
  mobile: boolean
  touchScreen: boolean
}

const usersDevice: Device = {
  pc: window.outerWidth > 1024 ? true : false,
  pcWideScreen: window.outerWidth >= 1280 ? true : false,
  // mobile: window.outerWidth < 768 ? true : false,
  mobile: window.outerWidth < 600 ? true : false,
  touchScreen: "ontouchstart" in document.documentElement ? true : false
}


function Sokoban() {
  const [level, setLevel] = useState(1);
  const [currentMove, setCurrentMove] = useState(field[level - 1]);

  const documentRef = useRef(document);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.match('Arrow')) handleMove(event.key);
  } 

  useEffect(() => {
      documentRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        documentRef.current.removeEventListener('keydown', handleKeyDown);
      }
  }, [currentMove])

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


  function handleMove(move: string) {
    let bulldozerPosition: any;
    let checkPoint: any;
    let boxCheckPoint: any;
    const playgroundArray: number[][] = currentMove.slice();

    currentMove.map((row, i) => {
      row.map((item, j) => {
        if (item == 4) bulldozerPosition = [i, j]
      })
    })

    switch (move) {
      case 'ArrowUp': {
        checkPoint = [-1, 0];
        boxCheckPoint = [-2, 0];
        break;
      }
      case 'ArrowRight': {
        checkPoint = [0, 1];
        boxCheckPoint = [0, 2];
        break;
      }
      case 'ArrowDown': {
        checkPoint = [1, 0];
        boxCheckPoint = [2, 0];
        break;
      }
      case 'ArrowLeft': {
        checkPoint = [0, -1];
        boxCheckPoint = [0, -2];
        break;
      }
    }

    switch (playgroundArray[bulldozerPosition[0] + checkPoint[0]][bulldozerPosition[1] + checkPoint[1]]) {
      case 0: {
        playgroundArray[bulldozerPosition[0]][bulldozerPosition[1]] = 0;
        playgroundArray[bulldozerPosition[0] + checkPoint[0]][bulldozerPosition[1] + checkPoint[1]] = 4;
        setCurrentMove(playgroundArray);
        break;
      }
      case 2: {
        playgroundArray[bulldozerPosition[0]][bulldozerPosition[1]] = 0;
        playgroundArray[bulldozerPosition[0] + checkPoint[0]][bulldozerPosition[1] + checkPoint[1]] = 4;
        setCurrentMove(playgroundArray);
        break;
      }
      case 3: {
        if (playgroundArray[bulldozerPosition[0] + boxCheckPoint[0]][bulldozerPosition[1] + boxCheckPoint[1]] != 1) {
          playgroundArray[bulldozerPosition[0]][bulldozerPosition[1]] = 0;
          playgroundArray[bulldozerPosition[0] + checkPoint[0]][bulldozerPosition[1] + checkPoint[1]] = 4;
          playgroundArray[bulldozerPosition[0] + boxCheckPoint[0]][bulldozerPosition[1] + boxCheckPoint[1]] = 3;
          setCurrentMove(playgroundArray);
        }
        break;
      }
    }
  }
}


export default Sokoban