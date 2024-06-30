import { useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useEmoji } from "../context/EmojiContext";

interface IButtonEmojiProps {
  emoji: string;
  modalMode?: boolean;
}

const ButtonEmoji = ({ emoji, modalMode }: IButtonEmojiProps) => {
  const { isModalOpen, openCloseModal } = useModal();
  const { currentEmoji, updateEmojiSelection } = useEmoji();

  useEffect(() => {
    isModalOpen;
    currentEmoji;
  }, [])

  return (
    <button
      className={`${(currentEmoji == emoji) && modalMode ? 'scale-125' : ''} xl:text-4xl lg:text-3xl text-4xl mt-3 hover:transition-transform hover:duration-200 duration-200`}
      onClick={() => {
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
