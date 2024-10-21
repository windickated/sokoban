import { useRef } from "react";
import { Device } from "../Sokoban";

interface TitlePictureProps {
  device: Device
}

const TitlePicture = ({device}: TitlePictureProps) => {
  const titlePicture = useRef<HTMLElement>(null);

  const closeMenu = () => {
    titlePicture.current!.style.opacity = '0';
    titlePicture.current!.style.transform = 'scale(2)';
    setTimeout(() => {
      titlePicture.current!.style.display = 'none';
    }, 1000);
  }

  const pictureURL = device.mobile ? '/title-mobile.png' : 'title.png';

  return (
    <section className="title-picture" ref={titlePicture} onClick={closeMenu}>
      <h1>SOKOBAN</h1>
      <h2>Click anywhere to START</h2>
      <img src={pictureURL} alt="SOKOBAN" />
    </section>
  )
}

export default TitlePicture