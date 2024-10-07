function Playground ({gameField}: any) {
  return (
    <section className="playground">
      {gameField.map((row: number[], i: number) => (
        <div className="field-row" key={i + 1}>
          {row.map((item: number, j: number) => {
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
  )
}

export default Playground