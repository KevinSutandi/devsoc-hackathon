import Profile from "./NavbarComponents/Profile";
import SidebarButton from "./NavbarComponents/SidebarButton";
import { HomeIcon, BookOpenIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ButtonAddEvent from "./ButtonAddEvent";
import { useState } from "react";
import NewEntryModal from "./NewEntryModal";
import { useProfile } from "../context/ProfileContext";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <>
      <NewEntryModal open={open} close={() => setOpen(false)} />
      {/* Toggle Button for Mobile */}
      <div className="fixed top-4 left-4 lg:hidden z-50 w-64">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed flex flex-col w-64 bg-white items-center h-screen shadow-xl pt-10 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 z-40`}
      >
        <div className="flex flex-col w-full items-center gap-1">
          <div className="text-center font-extralight py-4 text-2xl tracking-wide">
            Mental <br /> Aquarium
          </div>
        </div>
        <div className="flex flex-col w-full gap-10 mt-14 mb-10">
          <SidebarButton href="/" Icon={<HomeIcon />} text="Home" />
          <SidebarButton href="/journal" text="Journal" Icon={<BookOpenIcon />} />
          <div className="flex justify-center w-full mt-8">
            <ButtonAddEvent open={open} setOpen={setOpen} />
          </div>
        </div>
        <Profile />
      </div>
      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
