import { useState, useEffect, useRef } from "react"
import "./styles/index.scss"
import field from "./data/gameLevels"
import Playground from "./components/Playground"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Modal from "./components/Modal"
import TitlePicture from "./components/TitlePicture"


export interface Level {
  nr: number
  level: number[][]
  completed: boolean
  selected: boolean
}

export interface Device {
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

type DialogWindow = {
  showModal: boolean,
  type: 'info' | 'win' | null
};


function Sokoban() {
  const [levels, setLevels] = useState<Level[]>(field.map((lvl, i) => {
    return {
      nr: i + 1,
      level: lvl,
      completed: false,
      selected: i === 0 ? true : false
    }
  }))
  let selectedLevel: number = 1;
  levels.map((lvl) => {
    if (lvl.selected) selectedLevel = lvl.nr;
  })
  const [currentMove, setCurrentMove] = useState<number[][]>(structuredClone(field[selectedLevel - 1]));
  const [history, setHistory] = useState<number[][][]>(new Array)
  const [checkPoints, setCheckPoints] = useState<number[][]>([[2,5], [4,9], [5,3], [8,6]]);
  const [dialogWindow, setDialogWindow] = useState<DialogWindow>({showModal: false, type: null});
  const documentRef = useRef<Document>(document);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.match('Arrow')) handleMove(event.key);
    if (event.key.toLowerCase() === 'w') handleMove('ArrowUp');
    if (event.key.toLowerCase() === 'a') handleMove('ArrowLeft');
    if (event.key.toLowerCase() === 's') handleMove('ArrowDown');
    if (event.key.toLowerCase() === 'd') handleMove('ArrowRight');
    if (event.key.toLowerCase() === 'q') undoMove();
    if (event.key.toLowerCase() === 'r') switchLevel(selectedLevel);
    if (event.key.toLowerCase() === 'f') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    }
  } 

  useEffect(() => {
      if (!usersDevice.mobile) documentRef.current.addEventListener('keydown', handleKeyDown);
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
    setLevels(levels.map((lvl) => {
      if (lvl.selected) lvl.selected = false;
      if (lvl.nr === number) lvl.selected = true;
      return lvl;
    }))
    setCurrentMove(structuredClone(field[number - 1]));
    setHistory(new Array);
    setCheckPoints(checkPointsArray);
    dialogWindow?.showModal && handleModal(null);
  }


  return (
    <section className="game">
      <TitlePicture />
      <Header
        device={usersDevice}
        levels={levels}
        selectedLevel={selectedLevel}
        switchLevel={switchLevel}
        handleModal={handleModal}
      />
      <Playground playField={currentMove} />
      <Footer
        device={usersDevice}
        level={selectedLevel}
        history={history}
        switchLevel={switchLevel}
        onMove={handleMove}
        onUndo={undoMove}
        onSwitchMove={selectMove}
      />
      <Modal
        showModal={dialogWindow.showModal}
        modalType={dialogWindow.type}
        completedLevel={selectedLevel}
        history={history}
        switchLevel={switchLevel}
        handleModal={handleModal}
      />
    </section>
  )

  
  function handleMove(move: string) {
    let newPlayerPosition: any = [];
    let playerPosition: any;
    let nextPosition: any;
    let positionBehindTheBox: any;
    const playgroundArray: number[][] = structuredClone(currentMove);

    if (winCondition()) return;

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
          // check if player has won
          handleWin();
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

    function winCondition() {
      let win: boolean = false;
      let greenBoxesCount: number = 0;
      playgroundArray.map((row) => {
        row.map((item) => {
          if (item == 5) greenBoxesCount++;
        })
      })
      if (greenBoxesCount === checkPoints.length) win = true;
      return win;
    }

    function handleWin() {
      if (winCondition()) {
        setLevels(levels.map((lvl) => {
          if (lvl.nr === selectedLevel) lvl.completed = true;
          return lvl;
        }))
        handleModal('win');
      }
    }
  }


  function undoMove() {
    if (history.length > 1) {
      setCurrentMove(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    } else {
      setCurrentMove(structuredClone(field[selectedLevel - 1]));
      setHistory(new Array);
    }
  }

  function selectMove(number: number) {
    if (number === history.length - 1) return;
    if (number === 0) {
      setCurrentMove(structuredClone(field[selectedLevel - 1]));
      setHistory(new Array);
    } else {
      setCurrentMove(history[number]);
      setHistory(history.slice(0, number + 1));
    }
  }


  function handleModal(action: 'win' | 'info' | null) {
    if (action === 'win') setDialogWindow({showModal: true, type: 'win'});
    if (action === 'info') setDialogWindow({showModal: true, type: 'info'});
    if (action === null) setDialogWindow({showModal: false, type: null});   
  }
}


export default Sokoban