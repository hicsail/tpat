import Modal from "react-modal";
import { useState } from "react";

function ModalComponent(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="My dialog"
      className="mymodal"
      overlayClassName="myoverlay"
      closeTimeoutMS={500}
    >
      <div style={{ paddingBottom: "4%" }}>{props.description}</div>
      <button onClick={toggleModal}>Close modal</button>
    </Modal>
  );
}

export default ModalComponent;
