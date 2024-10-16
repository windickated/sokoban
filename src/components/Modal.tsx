import { useRef } from "react"

interface ModalProps {
  showModal: boolean
  completedLevel: number
  history: number[][][]
  switchLevel: Function
}

const Modal = ({showModal, completedLevel, history, switchLevel}: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  showModal ? dialog.current?.showModal() : dialog.current?.close();

  const levelInfo = (
  <>
    <div className="win-info">
      <h1>LEVEL {completedLevel} COMPLETED!</h1>
      <p>Your result: <strong>{history.length}</strong> moves</p>
      <p>Best result: <strong>13</strong> moves</p>
    </div>
    <div className="dialog-buttons">
      <button onClick={() => switchLevel(completedLevel)}>
        TRY AGAIN
      </button>
      <button onClick={() => switchLevel(completedLevel + 1)}>
        NEXT LEVEL
      </button>
    </div>
  </>
  )

  return (
    <dialog ref={dialog}>
      <button className="close-dialog" onClick={() => {dialog.current?.close()}}>
        ❌
      </button>
      <section>
        {showModal && levelInfo}
      </section>
    </dialog>
  )
}

export default Modal