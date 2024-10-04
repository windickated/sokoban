import field from "../data/gameLevels";

let level = 1;
const mobileDevice: boolean = window.outerWidth <= 768 ? true : false;

const Playground = () => {
  return (
    <section className="playground">
      <div className="header">
        <p>SOKOBAN</p>
        {
          mobileDevice
          ?
          <div>
            <p>Level: </p>
            <select className="level" >
              {field.map((_, index) => (
                <option value={index + 1}>{index + 1}</option>
              ))}
            </select>
          </div>
          :
          <ul className="levels-list">
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
          <div className="field-row">
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
                />
              )
            })}
          </div>
        ))}
      </section>
      <div className="footer">
        <div className="moves">
          <img className="undo-move" src="undo.png" alt="Undo" />
          <p className="moves-counter">Moves: 0</p>
        </div>
      </div>
    </section>
  )
}

export default Playground