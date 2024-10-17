import { useRef } from "react";

const TitlePicture = () => {
  const titlePicture = useRef<any>(null);

  const closeMenu = () => {
    titlePicture.current!.style.opacity = '0';
    titlePicture.current!.style.transform = 'scale(2)';
    setTimeout(() => {
      titlePicture.current!.style.display = 'none';
    }, 1000);
  }

  return (
    <section className="title-picture" ref={titlePicture} onClick={closeMenu}>
      <h1>SOKOBAN</h1>
      <h2>Click anywhere to START</h2>
      <img src="title.jpg" alt="SOKOBAN" />
    </section>
  )
}

export default TitlePicture