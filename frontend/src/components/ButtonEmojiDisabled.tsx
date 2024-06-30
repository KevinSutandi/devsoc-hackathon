
interface IButtonEmojiProps {
  emoji: string;
  emojiSelected: string;
}

const ButtonEmoji = ({ emoji, emojiSelected }: IButtonEmojiProps) => {
  const buttonDoNothing = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  console.log(emoji, emojiSelected);
  return (
    <button
      onClick={buttonDoNothing}
      className={`${(emojiSelected == emoji) ? 'scale-150' : ''} xl:text-4xl lg:text-3xl text-4xl mt-3 hover:transition-transform hover:duration-200 duration-200`}
    >
      {emoji}
    </button>
  );
};

export default ButtonEmoji;
