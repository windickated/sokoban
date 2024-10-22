import { Device } from "../Sokoban"

interface FooterProps {
  device: Device
  level: number
  history: number[][][]
  switchLevel: Function
  onMove: Function
  onUndo: VoidFunction
  onSwitchMove: Function
}

const Footer = ({device, level, history, switchLevel, onMove, onUndo, onSwitchMove}: FooterProps) => {
  return (
    <div className="footer">
        <div className="controls" >
          <div className="moves">
            <img className="undo-move" src="undo.png" alt="Undo" onClick={onUndo} />
            <p className="moves-counter">
              Moves: {!device.mobile
              ? history.length
              : history.length > 0 ? <select className="moves-selector" onChange={(event: any) => onSwitchMove(event.target.value - 1)}>
                {history.map((_, index) => (
                  <option key={index} selected={history.length === index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              : '0'}
            </p>
          </div>
          <button className="restart" onClick={() => switchLevel(level)}>
            Restart
          </button>
        </div>
        {!device.mobile && history.length > 0 && <section className="moves-history">
          <p className="history-title">Moves history:</p>
          <div className="history">
            {
              history.map((_: number[][], index: number) => {
                return (
                  <button className="move" key={index} onClick={() => onSwitchMove(index)}>{index + 1}</button>
                )
              })
            }
          </div>
        </section>}
        {
          device.mobile
          ?
          <div className="mobile-controller">
            <img className="mobile-button" onClick={() => onMove('ArrowUp')} src="mobile-button.png" alt="Top" draggable="false" />
            <div>
              <img className="mobile-button" onClick={() => onMove('ArrowLeft')} style={{transform: 'rotate(270deg)'}} src="mobile-button.png" alt="Left" draggable="false" />
              <img className="mobile-button" onClick={() => onMove('ArrowRight')} style={{transform: 'rotate(90deg)'}} src="mobile-button.png" alt="Right" draggable="false" />
            </div>
            <img className="mobile-button" onClick={() => onMove('ArrowDown')} style={{transform: 'rotate(180deg)'}} src="mobile-button.png" alt="Bottom" draggable="false" />
          </div>
          :
          <div className="play-instructions">
            <div className="instruction">
              <img src="r-button.png" alt="R" />
              <p> - Restart</p>
            </div>
            <div className="instruction">
              <img src="q-button.png" alt="Q" />
              <p>- Undo move</p>
            </div>
            <div className="instruction">
              <img src="f-button.png" alt="F" />
              <p>- Fullscreen</p>
            </div>
            <div className="instruction">
              <p>Use arrows or WASD to move</p>
            </div>
          </div>
        }
      </div>
  )
}

export default Footer