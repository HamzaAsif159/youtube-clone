import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faMicrophone,
  faSquarePlus,
  faBell,
  faUser,
  faArrowLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useSidebarContext } from "../context/SidebarContext";
import YoutubeLogo from "../assets/youtubeLogo.png";
import { Button } from "../components/Button";
import { useAuthContext } from "../hooks/useAuthContext";
import { toastify } from "../common/toastify";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [modal, setModal] = useState(false);
  const { logout, user } = useAuthContext();

  function handleLogout() {
    logout();
    setModal(!modal);
    toastify("success", "Logged out successfully");
  }

  return (
    <>
      <div className="flex justify-between gap-10 pt-2 mx-4 mb-6 lg:gap-20">
        <PageHeaderFirstSection hidden={showFullWidthSearch} />
        <form
          className={`gap-4 flex-grow justify-center ${
            showFullWidthSearch ? "flex" : "hidden md:flex"
          }`}
        >
          {showFullWidthSearch && (
            <Button
              onClick={() => setShowFullWidthSearch(false)}
              type="button"
              size="icon"
              variant="ghost"
              className="flex-shrink-0"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          )}
          <div className="flex flex-grow max-w-[600px]">
            <input
              type="search"
              placeholder="Search"
              className="w-full px-4 py-1 text-lg border rounded-l-full shadow-inner outline-none border-secondary-border shadow-secondary focus:border-blue-500"
            />
            <Button className="flex-shrink-0 px-4 py-2 border border-l-0 rounded-r-full border-secondary-border">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
          <Button type="button" size="icon" className="flex-shrink-0">
            <FontAwesomeIcon icon={faMicrophone} />
          </Button>
        </form>
        <div
          className={`flex-shrink-0 md:gap-2 ${
            showFullWidthSearch ? "hidden" : "flex"
          }`}
        >
          <Button
            onClick={() => setShowFullWidthSearch(true)}
            size="icon"
            variant="ghost"
            className="md:hidden"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          <Button size="icon" variant="ghost">
            <FontAwesomeIcon icon={faSquarePlus} />
          </Button>
          <Button size="icon" variant="ghost">
            <FontAwesomeIcon icon={faBell} />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setModal(!modal)}>
            <FontAwesomeIcon icon={faUser} />
          </Button>
        </div>
      </div>
      {modal && (
        <div className="bg-[#F5F7F8] absolute top-[49px] right-6 max-w-[350px] flex flex-col z-50 font-normal">
          <div className="flex gap-1 items-center border border-[#EBEFFF] h-[50px] cursor-pointer p-5">
            <Button size="icon" variant="ghost">
              <FontAwesomeIcon icon={faUser} />
            </Button>
            <div className="flex flex-col">
              <div>{user?.user?.username}</div>
              <div className="text-sm font-light">{user?.user?.email}</div>
            </div>
          </div>
          <div
            className="flex gap-1 items-center border border-[#EBEFFF] h-[50px] cursor-pointer p-5"
            onClick={handleLogout}
          >
            <Button size="icon" variant="ghost">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Button>
            <div>Log out</div>
          </div>
        </div>
      )}
    </>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div className={`items-center flex-shrink-0 ${hidden ? "hidden" : "flex"}`}>
      <Button onClick={toggle} variant="ghost" size="icon">
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <a href="/">
        <img src={YoutubeLogo} className="h-6" />
      </a>
    </div>
  );
}
