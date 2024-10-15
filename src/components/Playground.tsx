import Square from "./Square";

function Playground ({playField}: any) {

  return (
    <section className="playground">
      {playField.map((row: number[], i: number) => (
        <div className="field-row" key={i + 1}>
          {row.map((item: number, j: number) => {
            type Item = undefined | 'point' | 'box' | 'wall' | 'bulldozer' | 'box-active';
            let itemObject: Item;
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
              default: itemObject = undefined;
            }
            return <Square object={itemObject} i={i} j={j} key={(i).toString() + (j).toString()}/>
          })}
        </div>
      ))}
    </section>
  )
}

export default Playground