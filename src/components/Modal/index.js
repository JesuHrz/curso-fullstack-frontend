import DefaultModal from 'react-modal'

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const Modal = ({ isOpen, closeModal, children, ...props }) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      {...props}
    >
      {children}
    </DefaultModal>
  )
}
