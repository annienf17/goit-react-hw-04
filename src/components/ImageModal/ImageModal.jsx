import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

export default function ImageModal({ isOpen, onRequestClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div>
        {image ? (
          <img
            src={image.src} // Adjusted to use image.src
            alt={image.alt}
          />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </Modal>
  );
}
