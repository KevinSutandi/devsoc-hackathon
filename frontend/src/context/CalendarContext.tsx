import React, { createContext, useState, useContext, ReactNode } from 'react';
import { axiosInstanceWithAuth } from '../api/Axios';

interface CalendarEntryData {
    uid: string;
    id: number;
    day: number;
    month: number;
    year: number;
    mood: string;
}

interface CalendarContextType {
    entryData: CalendarEntryData[];
    fetchCalendarData: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [entryData, setEntryData] = useState<CalendarEntryData[]>([]);

    const fetchCalendarData = async () => {
        try {
            console.log("Fetching calendar data");
            const response = await axiosInstanceWithAuth.get("/calendar/");
            setEntryData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CalendarContext.Provider value={{ entryData, fetchCalendarData }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendar = (): CalendarContextType => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
};