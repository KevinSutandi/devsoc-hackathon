import { useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useEmoji } from "../context/EmojiContext";

interface IButtonEmojiProps {
  emoji: string;
  onClick: () => void;
  modalMode?: boolean; 
}

const ButtonEmoji = ({ emoji, onClick, modalMode }: IButtonEmojiProps) => {
  const { isModalOpen, openCloseModal } = useModal();
  const { currentEmoji, updateEmojiSelection } = useEmoji();

  useEffect(() => {
    isModalOpen;
    currentEmoji;
  }, [])

  return (
    <button
      className={`text-4xl ${(currentEmoji == emoji) && modalMode ? 'scale-125' : 'hover:scale-125'} hover:transition-transform hover:duration-200 duration-200`}
      onClick={() => {
        onClick();
        if (!modalMode) {
          openCloseModal();
        }
        updateEmojiSelection(emoji)
      }}
    >
      {emoji}
    </button>
  );
};

export default ButtonEmoji;
