const Footer = ({device, level, history, switchLevel, undo, follow, win}: any) => {

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
                  <p className="move" onClick={() => follow(index)}>{index + 1}</p>
                )
              })
            }
          </div>
        </section>
        {
          device.mobile
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
  )
}


export default Footer