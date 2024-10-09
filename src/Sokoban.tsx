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
  const [currentMove, setCurrentMove] = useState(structuredClone(field[level - 1]));
  const [history, setHistory] = useState([structuredClone(field[level - 1])])
  const [checkPoints, setCheckPoints] = useState([]);

  const documentRef = useRef(document);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.match('Arrow')) handleMove(event.key);
  } 

  useEffect(() => {
    switchLevel(1);
  }, [])

  useEffect(() => {
      documentRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        documentRef.current.removeEventListener('keydown', handleKeyDown);
      }
  }, [currentMove])

  function switchLevel(number: number) {
    const checkPointsArray: any = [];
    field[number - 1].map((row, i) => {
      row.map((item, j) => {
        if (item == 2) checkPointsArray.push([i, j])
      })
    })
    setLevel(number);
    setCurrentMove(structuredClone(field[number - 1].slice()));
    setHistory([structuredClone(field[number - 1].slice())]);
    setCheckPoints(checkPointsArray);
  }

  return (
    <section className="game">
      <Header device={usersDevice} level={level} switchLevel={switchLevel} />
      <Playground playField={currentMove} />
      <Footer device={usersDevice} level={level} switchLevel={switchLevel} undo={undoMove} history={history} />
    </section>
  )

  function handleMove(move: string) {
    if (winCondition(level)) return;
    
    let newPlayerPosition: any = [];
    let playerPosition: any;
    let nextPosition: any;
    let positionBehindTheBox: any;
    const playgroundArray: number[][] = structuredClone(currentMove);

    // get the Player's position index
    currentMove.map((row, i) => {
      row.map((item, j) => {
        if (item == 4) playerPosition = [i, j];
      })
    })
    // get the next move's position index
    switch (move) {
      case 'ArrowUp': {
        nextPosition = [-1, 0];
        positionBehindTheBox = [-2, 0];
        break;
      }
      case 'ArrowRight': {
        nextPosition = [0, 1];
        positionBehindTheBox = [0, 2];
        break;
      }
      case 'ArrowDown': {
        nextPosition = [1, 0];
        positionBehindTheBox = [2, 0];
        break;
      }
      case 'ArrowLeft': {
        nextPosition = [0, -1];
        positionBehindTheBox = [0, -2];
        break;
      }
    }

    if (playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 0
      || playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 2
    ) {
      // nextPosition is a CHECK POINT or EMPTY
      playgroundArray[playerPosition[0]][playerPosition[1]] = 0;
      playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] = 4;
      newPlayerPosition[0] = playerPosition[0] + nextPosition[0];
      newPlayerPosition[1] = playerPosition[1] + nextPosition[1];
    } else if (playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 3
      || playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 5
    ) {
      // nextPosition is a BOX or ACTIVE BOX
      switch (playgroundArray[playerPosition[0] + positionBehindTheBox[0]][playerPosition[1] + positionBehindTheBox[1]]) {
        case 2: {
          playgroundArray[playerPosition[0] + positionBehindTheBox[0]][playerPosition[1] + positionBehindTheBox[1]] = 5;
          playgroundArray[playerPosition[0]][playerPosition[1]] = 0;
          playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] = 4;
          newPlayerPosition[0] = playerPosition[0] + nextPosition[0];
          newPlayerPosition[1] = playerPosition[1] + nextPosition[1];
          break;
        }
        case 0: {
          playgroundArray[playerPosition[0] + positionBehindTheBox[0]][playerPosition[1] + positionBehindTheBox[1]] = 3;
          playgroundArray[playerPosition[0]][playerPosition[1]] = 0;
          playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] = 4;
          newPlayerPosition[0] = playerPosition[0] + nextPosition[0];
          newPlayerPosition[1] = playerPosition[1] + nextPosition[1];
          break;
        }
      }
    } else {
      newPlayerPosition = playerPosition.slice();
    }
    
    // render the Check Point again if its position is EMPTY
    checkPoints.map((point) => {
      if (playgroundArray[point[0]][point[1]] === 0) playgroundArray[point[0]][point[1]] = 2;
    })
    setCurrentMove(playgroundArray);

    setHistory([...history, playgroundArray]);
    console.log(history)

    let bulldozer: any = document.getElementById(newPlayerPosition[0]?.toString() + newPlayerPosition[1]?.toString());
    switch (move) {
      case 'ArrowUp': {
        bulldozer.style.transform = 'none';
        break;
      }
      case 'ArrowRight': {
        bulldozer.style.transform = 'rotate(90deg)';
        break;
      }
      case 'ArrowDown': {
        bulldozer.style.transform = 'rotate(180deg)';
        break;
      }
      case 'ArrowLeft': {
        bulldozer.style.transform = 'rotate(270deg)';
        break;
      }
    }
    let oldBulldozer: any = document.getElementById(playerPosition[0].toString() + playerPosition[1].toString())
    oldBulldozer.style.transform = 'none';

    if (winCondition(level)) console.log('You won!');
  }


  function winCondition(currentLevel: number) {
    let win: boolean = true;
    currentMove.map((row) => {
      row.map((item) => {
        if (item == 3) win = false;
      })
    })

    if (win) {
      const levelsList = Array.from(document.querySelectorAll('.level'));
      levelsList.map((level: any) => {
        if (level.id == currentLevel) {
          level.classList.add('completed');
          if (usersDevice.pcWideScreen) level.style.backgroundColor = '#19913a';
        }
      })
    }

    return win;
  }


  function undoMove() {
    if (history.length > 1) {
      setCurrentMove(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  }
}


export default Sokoban