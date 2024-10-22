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

  const pictureURL: string = device.mobile ? '/title-mobile' : '/title';

  return (
    <section className="title-picture" ref={titlePicture} onClick={closeMenu} onKeyDown={closeMenu}>
      <h1>SOKOBAN</h1>
      <h2>Click anywhere to START</h2>
      <picture>
        <source srcSet={pictureURL + ".avif"} type="image/avif" />
        <img src={pictureURL + ".png"} alt="SOKOBAN" />
      </picture>
    </section>
  )
}

export default TitlePicture