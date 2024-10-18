import { useRef } from "react"

interface ModalProps {
  showModal: boolean
  modalType: 'info' | 'win' | null
  completedLevel: number
  history: number[][][]
  switchLevel: Function
  handleModal: Function
}

const bestScore: number[] = [13, 88, 114, 32, 50, 999, 999, 44, 195, 36, 69];

const Modal = ({showModal, modalType, completedLevel, history, switchLevel, handleModal}: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  showModal ? dialog.current?.showModal() : dialog.current?.close();

  const levelInfo = (
    <>
      <div className="win-info">
        <h1>LEVEL {completedLevel} COMPLETED!</h1>
        <p>Your result: <strong>{history.length}</strong> moves</p>
        <p>Best result: <strong>{bestScore[completedLevel - 1]}</strong> moves</p>
      </div>
      <div className="dialog-buttons">
        <button onClick={() => switchLevel(completedLevel)}>
          TRY AGAIN
        </button>
        <button disabled={completedLevel === 11} onClick={() => switchLevel(completedLevel + 1)}>
          NEXT LEVEL
        </button>
      </div>
    </>
  )

  const gameInfo = (
    <>
      <h1>Sokoban - Dimon's version</h1>
      <p>The main point of this game is to move all boxes to the red 'X' marks.</p>
      <p><strong>Move conditions:</strong></p>
      <ul>
        <li>Only one box can be moved at the time.</li>
        <li>Boxes can only be pushed.</li>
        <li>Neither bulldozer nor boxes cannot pass through walls.</li>
      </ul>
      <p><strong>Win condition:</strong></p>
      <ul>
        <li>All boxes are placed on 'X' points.</li>
      </ul>
      <p>There are 11 levels of difficulty in total, after completing them all the game can be considered as completed.</p>
      <h2>This game is a rebirth of an old student project built with antediluvian Delphi (Object Pascal).</h2>
    </>
  )

  return (
    <dialog ref={dialog} onClick={() => handleModal(null)}>
      <div onClick={(event) => event.stopPropagation()}>
        <button className="close-dialog" onClick={() => handleModal(null)}>
          ❌
        </button>
        <section>
          {modalType === 'win' && levelInfo}
          {modalType === 'info' && gameInfo}
        </section>
      </div>
    </dialog>
  )
}

export default Modal