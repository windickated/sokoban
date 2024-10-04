import field from "../data/gameLevels";

let level = 1;
const mobileDevice: boolean = window.outerWidth <= 768 ? true : false;
const shortMobile: boolean = (mobileDevice && window.outerHeight <= 700) ? true : false;
const shortMobileStyling: object | undefined = shortMobile ? {
  flexFlow: 'row nowrap',
  justifyContent: 'space-between'
} : undefined;

const Playground = () => {
  return (
    <section className="playground">
      <div className="header">
        <div className="title">
          <p>SOKOBAN</p>
          <img src="info.png" alt="info" />
        </div>
        {
          mobileDevice
          ?
          <div>
            <p>Level: </p>
            <select className="level" >
              {field.map((_, index) => (
                <option value={index + 1} key={index + 1}>{index + 1}</option>
              ))}
            </select>
          </div>
          :
          <ul>
            {
            field.map((_, index) => (
              <li className="level" key={index + 1}>Level: {index + 1}</li>
            ))
            }
          </ul>
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
        <div className="controls" style={shortMobileStyling}>
          <div className="moves">
            <img className="undo-move" src="undo.png" alt="Undo" />
            <p className="moves-counter">Moves: 0</p>
          </div>
          <button className="restart">
            {shortMobile ? 'Restart' : 'Start over again'}
          </button>
        </div>
        {
          mobileDevice
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
            <p className="instruction">
              <strong>R</strong> - Restart
            </p>
            <p className="instruction">
              <strong>Q</strong> - Undo move
            </p>
            <p className="instruction">
              Use arrows to move:
            </p>
            <img src="arrows.png" alt="Arrows" />
          </div>
        }
      </div>
    </section>
  )
}

export default Playground