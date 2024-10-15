import { useEffect } from "react";
import field from "../data/gameLevels";

const Header = ({device, level, switchLevel}: any) => {
  useEffect(() => {
    if (device.pcWideScreen) {
      const levelsList: NodeList = document.querySelectorAll('.level');
      Array.from(levelsList)?.map((listItem: any) => {
        if (!listItem.className.match('completed')) {
          if (Number(listItem.id) === level) listItem.style.backgroundColor = '#7f7f7f';
          else listItem.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }
      })
    }
  }, [level])
  
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
            field.map((_, index) => (
              <li className="level" id={(index + 1).toString()} key={index + 1} onClick={() => switchLevel(index + 1)}>Level: {index + 1}</li>
            ))
            }
          </ul>
          :
          <div>
            <p>Level: </p>
            <select className="level" onChange={() => switchLevel(Number((document.querySelector('.level') as HTMLSelectElement)?.value))}>
              {field.map((_, index) => (
                <option value={index + 1} key={index + 1}>{index + 1}</option>
              ))}
            </select>
          </div>
        }
      </div>
  )
}

export default Header