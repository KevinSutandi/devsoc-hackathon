import { useEffect } from "react";
import { useModal } from "../context/ModalContext";

interface IButtonEmojiProps {
  emoji: string;
  onClick: () => void;
  enlarge?: boolean;
  modalMode?: boolean; 
}

const ButtonEmoji = ({ emoji, onClick, enlarge, modalMode }: IButtonEmojiProps) => {
  const { isModalOpen, openCloseModal } = useModal();

  useEffect(() => {
    isModalOpen;
  })
  return (
    <button
      className={`text-4xl ${enlarge ? 'scale-125' : 'hover:scale-125'} hover:transition-transform hover:duration-200 duration-200`}
      onClick={() => {
        onClick();
        if (!modalMode) {
          openCloseModal();
        }
      }}
    >
      {emoji}
    </button>
  );
};

export default ButtonEmoji;
