import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import { useEffect } from "react";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const { entryData, fetchProfileData } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <Menu
      as="div"
      className="relative inline-block w-full text-left mt-auto bg-white hover:bg-gray-50"
    >
      <div>
        <MenuButton className="flex w-full justify-start items-center gap-x-5 rounded-md px-7 py-5 text-sm text-gray-900">
          <img
            className="w-10 h-10 rounded-full"
            src={entryData.image ? entryData.image : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
            alt="Rounded avatar"
          />
          <div className="flex flex-col w-full justify-start items-start tracking-widest">
            <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-36">
              {entryData.fullname}
            </p>
          </div>
        </MenuButton>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          anchor="top"
          className="absolute right-0 z-[60] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <a
                  href="/profile"
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  Account settings
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <a
                  href="/"
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm",
                  )}
                  onClick={handleLogout}
                >
                  Sign out
                </a>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
