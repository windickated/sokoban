import { useEffect, useState } from "react";
import field from "../data/gameLevels";

interface Device {
  pc: boolean
  pcWideScreen: boolean
  mobile: boolean
  mobileSmallScreen: boolean
  touchScreen: boolean
}

const usersDevice: Device = {
  pc: window.outerWidth > 1024 ? true : false,
  pcWideScreen: window.outerWidth >= 1280 ? true : false,
  mobile: window.outerWidth < 768 ? true : false,
  mobileSmallScreen: (window.outerWidth < 768 && window.outerHeight <= 700) ? true : false,
  touchScreen: "ontouchstart" in document.documentElement ? true : false
}

const smallMobileScreenStyling: object | undefined = usersDevice.mobileSmallScreen ? {
  flexFlow: 'row nowrap',
  justifyContent: 'space-between'
} : undefined;


const Playground = () => {
  const [level, setLevel] = useState(1);

  function switchLevel(number: number) {
    setLevel(number);
  }

  useEffect(() => {
    if (usersDevice.pcWideScreen) {
      const levelsList: any = document.querySelectorAll('.level');
      Array.from(levelsList)?.map((listItem: any) => {
        if (Number(listItem.id) === level) listItem.style.backgroundColor = '#7f7f7f';
        else listItem.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      })
    }
  }, [level])

  return (
    <section className="playground">
      <div className="header">
        <div className="title">
          <p>SOKOBAN</p>
          <img src="info.png" alt="info" />
        </div>
        {
          usersDevice.pcWideScreen
          ?
          <ul>
            {
            field.map((_, index) => (
              <li className="level" id={(index + 1).toString()} key={index + 1} onClick={() => switchLevel(index + 1)}>Level: {index + 1}</li>
            ))
            }
          </ul>
          :
          <div>
            <p>Level: </p>
            <select className="level" onChange={() => switchLevel(Number((document.querySelector('.level') as HTMLSelectElement)?.value))}>
              {field.map((_, index) => (
                <option value={index + 1} key={index + 1}>{index + 1}</option>
              ))}
            </select>
          </div>
        }
      </div>
      <section className="field">
        {field[level - 1].map((row, i) => (
          <div className="field-row" key={i + 1}>
            {row.map((item, j) => {
              let itemObject: undefined | 'point' | 'box' | 'wall' | 'bulldozer';
              let emptyItemStyling: object | undefined = undefined;
              switch(item) {
                case 1: {
                  itemObject = 'wall';
                  break;
                }
                case 2: {
                  itemObject = 'point';
                  break;
                }
                case 3: {
                  itemObject = 'box';
                  break;
                }
                case 4: {
                  itemObject = 'bulldozer';
                  break;
                }
                default: {
                  itemObject = undefined;
                  emptyItemStyling = {visibility: 'hidden'};
                }
              }
              return (
                <img
                  className="field-item"
                  id={"field-item-" + (i + 1) + '-' + (j + 1)}
                  style={emptyItemStyling}
                  src={"/" + itemObject + ".jpg"}
                  alt={itemObject}
                  key={(i + 1).toString() + (j + 1).toString()}
                />
              )
            })}
          </div>
        ))}
      </section>
      <div className="footer">
        <div className="controls" style={smallMobileScreenStyling}>
          <div className="moves">
            <img className="undo-move" src="undo.png" alt="Undo" />
            <p className="moves-counter">Moves: 0</p>
          </div>
          <button className="restart">
            {usersDevice.mobileSmallScreen ? 'Restart' : 'Start over again'}
          </button>
        </div>
        {
          usersDevice.mobile
          ?
          <div className="mobile-controller">
            <div>
              <img src="arrow-top.png" alt="Top" />
              <img src="arrow-right.png" alt="Right" />
              <img className="visible" src="arrow-bottom.png" alt="Bottom" />
              <img src="arrow-left.png" alt="Left" />
            </div>
            <img src="mobile-controller.png" alt="Controller" />
          </div>
          :
          <div className="play-instructions">
            <div className="instruction">
              <p>
                <strong>R</strong> - Restart
              </p>
              <p>
                <strong>Q</strong> - Undo move
              </p>
            </div>
            <div className="instruction">
              <p>
                Use arrows to move:
              </p>
              <img src="arrows.png" alt="Arrows" />
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default Playground