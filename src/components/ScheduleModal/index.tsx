import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  ReactModal.setAppElement('#root'); // You should call this once in your app

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border w-96 shadow-lg rounded-md bg-white p-5"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;