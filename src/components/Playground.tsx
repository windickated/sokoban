const Playground = () => {
  const field: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 0, 3, 0, 2, 1, 1, 1],
    [1, 1, 1, 2, 0, 3, 4, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
  return (
    <>
      <section className="field">
        {field.map((row, i) => (
          <div className="field-row">
            {row.map((item, j) => {
              let itemObject: undefined | 'Point' | 'Box' | 'Wall' | 'Bulldozer';
              let emptyItemStyling: object | undefined = undefined;
              switch(item) {
                case 1: {
                  itemObject = 'Wall';
                  break;
                }
                case 2: {
                  itemObject = 'Point';
                  break;
                }
                case 3: {
                  itemObject = 'Box';
                  break;
                }
                case 4: {
                  itemObject = 'Bulldozer';
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
    </>
  )
}

export default Playground