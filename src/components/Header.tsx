import { Level, Device } from "../Sokoban";

interface HeaderProps {
  device: Device
  levels: Level[]
  selectedLevel: number
  switchLevel: Function
}

const Header = ({device, levels, selectedLevel, switchLevel}: HeaderProps) => {
  return (
    <div className="header">
        <div className="title">
          <p>SOKOBAN</p>
          <img src="info.png" alt="info" />
        </div>
        {
          device.pcWideScreen
          ?
          <ul>
            {
            levels.map((item: Level, i: number) => {
              let bgStyling: React.CSSProperties = {
                backgroundColor: item.completed ? '#19913a' : 'rgba(0, 0, 0, 0.5)'
              }
              if (i + 1 === selectedLevel) bgStyling.backgroundColor = '#7f7f7f';
              return (
                <li
                  className="level"
                  id={(i + 1).toString()}
                  key={i + 1}
                  onClick={() => switchLevel(i + 1)}
                  style={bgStyling}
                >
                  Level: {i + 1}
                </li>
              )
            })
            }
          </ul>
          :
          <div>
            <p>Level: </p>
            <select className="level" onChange={() => switchLevel(Number((document.querySelector('.level') as HTMLSelectElement)?.value))}>
              {levels.map((_: Level, i: number) => (
                <option value={i + 1} key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        }
      </div>
  )
}

export default Header