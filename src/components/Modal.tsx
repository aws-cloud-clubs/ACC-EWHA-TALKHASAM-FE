interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-10 mx-auto flex h-screen max-w-[500px] items-center justify-center bg-black/70"
        onClick={handleOutsideClick}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
