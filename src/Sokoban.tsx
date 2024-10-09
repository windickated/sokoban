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
  const [history, setHistory] = useState(new Array)
  const [checkPoints, setCheckPoints] = useState([]);

  const documentRef = useRef(document);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.match('Arrow')) handleMove(event.key);
    if (event.key.toLowerCase() === 'u') undoMove();
    if (event.key.toLowerCase() === 'r') switchLevel(level);
  } 

  useEffect(() => {
      if (!usersDevice.mobile) documentRef.current.addEventListener('keydown', handleKeyDown);
      // check if player has completed the level
      if (winCondition()) {
        const levelsList = Array.from(document.querySelectorAll('.level'));
        levelsList.map((item: any) => {
          if (item.id == level) {
            item.classList.add('completed');
            if (usersDevice.pcWideScreen) item.style.backgroundColor = '#19913a';
          }
        })
      }
      return () => {
        if (!usersDevice.mobile) documentRef.current.removeEventListener('keydown', handleKeyDown);
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
    setCurrentMove(structuredClone(field[number - 1]));
    setHistory(new Array);
    setCheckPoints(checkPointsArray);
  }


  return (
    <section className="game">
      <Header
        device={usersDevice}
        level={level}
        switchLevel={switchLevel}
      />
      <Playground playField={currentMove} />
      <Footer
        device={usersDevice}
        level={level}
        switchLevel={switchLevel}
        move={handleMove}
        undo={undoMove}
        history={history}
        follow={selectMove}
        win={winCondition}
      />
    </section>
  )

  
  function handleMove(move: string) {
    if (winCondition()) return;
    
    let newPlayerPosition: any = [];
    let playerPosition: any;
    let nextPosition: any;
    let positionBehindTheBox: any;
    const playgroundArray: number[][] = structuredClone(currentMove);

    currentMove.map((row, i) => {
      row.map((item, j) => {
        if (item == 4) playerPosition = [i, j];
      })
    })

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

    // main moving function
    const forwardBulldozer = () => {
      playgroundArray[playerPosition[0]][playerPosition[1]] = 0;
      playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] = 4;
      newPlayerPosition[0] = playerPosition[0] + nextPosition[0];
      newPlayerPosition[1] = playerPosition[1] + nextPosition[1];
      setCurrentMove(playgroundArray);
      setHistory([...history, playgroundArray]);

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
    }

    if (playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 0
      || playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 2
    ) {
      // nextPosition is a CHECK POINT or EMPTY
      forwardBulldozer();
    } else if (playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 3
      || playgroundArray[playerPosition[0] + nextPosition[0]][playerPosition[1] + nextPosition[1]] === 5
    ) {
      // nextPosition is a BOX or ACTIVE BOX
      switch (playgroundArray[playerPosition[0] + positionBehindTheBox[0]][playerPosition[1] + positionBehindTheBox[1]]) {
        case 2: {
          playgroundArray[playerPosition[0] + positionBehindTheBox[0]][playerPosition[1] + positionBehindTheBox[1]] = 5;
          forwardBulldozer();
          break;
        }
        case 0: {
          playgroundArray[playerPosition[0] + positionBehindTheBox[0]][playerPosition[1] + positionBehindTheBox[1]] = 3;
          forwardBulldozer();
          break;
        }
      }
    } else {
      newPlayerPosition = structuredClone(playerPosition);
    }
    
    // render the Check Point again if its position is EMPTY
    checkPoints.map((point) => {
      if (playgroundArray[point[0]][point[1]] === 0) playgroundArray[point[0]][point[1]] = 2;
    })
  }


  function winCondition() {
    let win: boolean = true;
    currentMove.map((row) => {
      row.map((item) => {
        if (item == 3) win = false;
      })
    })

    return win;
  }

  function undoMove() {
    if (winCondition()) return;
    if (history.length > 1) {
      setCurrentMove(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    } else {
      setCurrentMove(structuredClone(field[level - 1]));
      setHistory(new Array);
    }
  }

  function selectMove(number: number) {
    if (number === history.length - 1) return;
    if (number === 0) {
      setCurrentMove(structuredClone(field[level - 1]));
      setHistory(new Array);
    } else {
      setCurrentMove(history[number]);
      setHistory(history.slice(0, number + 1));
    }
  }
}


export default Sokoban