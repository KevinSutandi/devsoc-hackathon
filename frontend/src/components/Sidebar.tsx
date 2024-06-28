import { useEffect } from 'react';
import Profile from './NavbarComponents/Profile';
import SidebarButton from './NavbarComponents/SidebarButton';
import {
    HomeIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ButtonAddEvent from './ButtonAddEvent';

const Sidebar = () => {
    const navigation = useNavigate()

    const token = Cookies.get('token');
    useEffect(() => {
        if (token === undefined) {
            navigation('/')
        }
    }, [navigation, token]);

    return (
        <div className='fixed flex flex-col w-64 bg-white items-center h-screen shadow-xl rounded-r-xl pt-10'>
            <div className='flex flex-col w-full items-center gap-1'>
                <div className="text-center font-extralight py-4 text-3xl tracking-wide">
                    Mental <br /> Aquarium
                </div>
            </div>

            <div className='flex flex-col w-full gap-14 mt-20 mb-10'>
                <SidebarButton href='/' Icon={<HomeIcon />} text='Home' />
                <SidebarButton href='/courses' text='Journal' Icon={<BookOpenIcon />} />
                <div className='flex justify-center w-full'>
                    <ButtonAddEvent />
                </div>
            </div>

            <Profile />
        </div>
    );
};

export default Sidebar;
