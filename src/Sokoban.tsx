import "./styles/index.scss"
import Playground from "./components/Playground"

function Sokoban() {

  return (
    <>
      <div className="header">
        <img src="/Title.jpg" alt="Sokoban" />
        <button className="play-button">Play</button>
      </div>
      <Playground />
    </>
  )
}

export default Sokoban
