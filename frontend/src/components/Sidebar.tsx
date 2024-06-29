import Profile from "./NavbarComponents/Profile";
import SidebarButton from "./NavbarComponents/SidebarButton";
import { HomeIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import ButtonAddEvent from "./ButtonAddEvent";
import NewEntryModal from "./NewEntryModal";
import { useModal } from "../context/ModalContext";

const Sidebar = () => {
  const { isModalOpen, openCloseModal } = useModal();
  return (
    <>
      <NewEntryModal open={isModalOpen} close={openCloseModal} />
      <div className="fixed flex flex-col w-64 bg-white items-center h-screen shadow-xl rounded-r-xl pt-10">
        <div className="flex flex-col w-full items-center gap-1">
          <div className="text-center font-extralight py-4 text-2xl tracking-wide">
            Mental <br /> Aquarium
          </div>
        </div>
        <div className="flex flex-col w-full gap-10 mt-14 mb-10">
          <SidebarButton href="/" Icon={<HomeIcon />} text="Home" />
          <SidebarButton
            href="/journal"
            text="Journal"
            Icon={<BookOpenIcon />}
          />
          <div className="flex justify-center w-full mt-8">
            <ButtonAddEvent open={isModalOpen} setOpen={openCloseModal} />
          </div>
        </div>
        <Profile />
      </div>
    </>
  );
};

export default Sidebar;
