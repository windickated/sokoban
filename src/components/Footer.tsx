const Footer = ({device, level, history, switchLevel, move, undo, follow, win}: any) => {

  return (
    <div className="footer">
        <div className="controls" >
          <div className="moves">
            <img className="undo-move" src="undo.png" alt="Undo" onClick={undo} />
            <p className="moves-counter">Moves: {history.length}</p>
          </div>
          <button className="restart" onClick={() => switchLevel(level)}>
            Restart
          </button>
        </div>
        <section className="moves-history">
          <p className="history-title">{win() ? 'You won!' : 'Moves history:'}</p>
          <div className="history">
            {
              history.map((_: number[][], index: number) => {
                return (
                  <p className="move" key={index} onClick={() => follow(index)}>{index + 1}</p>
                )
              })
            }
          </div>
        </section>
        {
          device.mobile
          ?
          <div className="mobile-controller">
            <img onClick={() => move('ArrowUp')} src="mobile-button.png" alt="Top" />
            <div>
              <img onClick={() => move('ArrowLeft')} style={{transform: 'rotate(270deg)'}} src="mobile-button.png" alt="Left" />
              <img onClick={() => move('ArrowRight')} style={{transform: 'rotate(90deg)'}} src="mobile-button.png" alt="Right" />
            </div>
            <img onClick={() => move('ArrowDown')} style={{transform: 'rotate(180deg)'}} src="mobile-button.png" alt="Bottom" />
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
  )
}

export default Footer