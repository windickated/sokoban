function Square({object, i, j}: any) {
  let styling: object | undefined = undefined;
  if (!object) styling = {visibility: 'hidden'};

  return (
    <img
      className="field-item"
      id={(i).toString() + (j).toString()}
      style={styling}
      src={"/" + object + ".jpg"}
      alt={object}
    />
  )
}

export default Square