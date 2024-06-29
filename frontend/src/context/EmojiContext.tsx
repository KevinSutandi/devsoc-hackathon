import React, { createContext, useState, useContext, ReactNode } from 'react';

interface EmojiContextType {
  currentEmoji: string;
  updateEmojiSelection: (newEmoji: string) => void;
}

const EmojiContextType = createContext<EmojiContextType | undefined>(undefined);

export const EmojiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentEmoji, setEmoji] = useState('');

  const updateEmojiSelection = (newEmoji: string) => setEmoji(newEmoji);
  return (
    <EmojiContextType.Provider value={{ currentEmoji, updateEmojiSelection }}>
      {children}
    </EmojiContextType.Provider>
  );
};

export const useEmoji = (): EmojiContextType => {
  const context = useContext(EmojiContextType);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
