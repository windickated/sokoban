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
      key={(i).toString() + (j).toString()}
    />
  )
}

export default Square