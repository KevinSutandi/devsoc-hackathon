import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarLayout = () => (
    <>
        <Sidebar />
        <div className='lg:ml-64'>
            <Outlet />
        </div>
    </>
);

export default SidebarLayout;