import React, { createContext, useState, useContext, ReactNode } from 'react';
import { axiosInstanceWithAuth } from '../api/Axios';

interface JournalEntryData {
	content: string;
	createdAt: string;
	id: number;
	image: string;
	profileUid: string;
	title: string;
	updatedAt: string;
}

interface JournalContextType {
  entryData: JournalEntryData[];
  fetchJournalData: () => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entryData, setEntryData] = useState<JournalEntryData[]>([]);

  const fetchJournalData = async () => {
    try {
      const response = await axiosInstanceWithAuth.post("/journals");
      setEntryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <JournalContext.Provider value={{ entryData, fetchJournalData }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};