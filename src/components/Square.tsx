import { Item } from "./Playground"

interface SquareProps {
  object: Item
  i: number
  j: number
}

function Square({object, i, j}: SquareProps) {
  let styling: object | undefined = undefined;
  if (!object) styling = {visibility: 'hidden'};

  return (
    <img
      className="field-item"
      id={(i).toString() + (j).toString()}
      style={styling}
      src={object + ".png"}
      alt={object}
    />
  )
}

export default Square