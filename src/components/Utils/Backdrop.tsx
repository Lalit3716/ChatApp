import { FC } from "react";
import { createPortal } from "react-dom";

const backdropPortal = document.getElementById("backdrop");

interface Props {
  onClose?: () => void;
}

const Backdrop: FC<Props> = ({ onClose }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-10 bg-black opacity-50"
      onClick={onClose}
    />,
    backdropPortal!
  );
};

export default Backdrop;
