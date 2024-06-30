import React, { createContext, useState, useContext, ReactNode } from 'react';
import { axiosInstanceWithAuth } from '../api/Axios';

interface ProfileEntryData {
    fullname: string;
    happinessPoints: number;
    image: string;
    uid: string;
    updatedAt: Date;
    createdAt: Date;
    username: string;
}

interface ProfileContextType {
    entryData: ProfileEntryData;
    fetchProfileData: () => void;
    updateProfileData: (fullname: string, image: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [entryData, setEntryData] = useState<ProfileEntryData>({} as ProfileEntryData);

    const fetchProfileData = async () => {
        try {
            const response = await axiosInstanceWithAuth.get("/users");
            setEntryData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateProfileData = async (fullname: string, image: string) => {
        try {
            await axiosInstanceWithAuth.put("/users", { fullname, image });
            fetchProfileData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ProfileContext.Provider value={{ entryData, fetchProfileData, updateProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};