interface IButtonEmojiProps {
  emoji: string;
  onClick: () => void;
}

const ButtonEmoji = ({ emoji, onClick }: IButtonEmojiProps) => {
  return (
    <button
      className="text-4xl hover:scale-125 hover:transition-transform hover:duration-200 duration-200"
      onClick={onClick}
    >
      {emoji}
    </button>
  );
};

export default ButtonEmoji;
