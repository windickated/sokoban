function Playground ({playField}: any) {

  return (
    <section className="playground">
      {playField.map((row: any, i: number) => (
        <div className="field-row" key={i + 1}>
          {row.map((item: number, j: number) => {
            let itemObject: undefined | 'point' | 'box' | 'wall' | 'bulldozer' | 'box-active';
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
              case 5: {
                itemObject = 'box-active';
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
                id={(i).toString() + (j).toString()}
                style={emptyItemStyling}
                src={"/" + itemObject + ".jpg"}
                alt={itemObject}
                key={(i).toString() + (j).toString()}
              />
            )
          })}
        </div>
      ))}
    </section>
  )
}


export default Playground