import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faMicrophone,
  faSquarePlus,
  faBell,
  faUser,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "../components/Button";
import Logo from "../../public/youtubeLogo.png";

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = React.useState(false);

  return (
    <div className="flex items-center justify-between gap-10 pt-1 mb-6 md:pt-2 md:mx-4 lg:gap-16">
      {showFullWidthSearch && (
        <div className="flex flex-grow gap-1 md:hidden">
          <Button
            variant="default"
            size="icon"
            className="flex-shrink-0"
            onClick={() => setShowFullWidthSearch(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <form className=" gap-1 flex-grow max-w-[600px] self-center">
            <div className="flex flex-grow w-full">
              <input
                type="text"
                placeholder="Search"
                className="inset-0 w-full px-4 text-base border rounded-l-full shadow-inner outline-none border-secondary-border shadow-secondary focus:border-blue-500"
              />
              <Button className="flex-shrink-0 px-4 py-2 border border-l-0 rounded-r-full border-secondary-border">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </div>
          </form>
        </div>
      )}
      <div
        className={`${
          showFullWidthSearch ? "hidden md:flex" : "flex"
        } items-center flex-shrink-0`}
      >
        <Button variant="ghost" size="icon">
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <img src={Logo} alt="logo" className="h-16 mt-0 -ml-2 md:-ml-1" />
      </div>
      <form className=" gap-1 flex-grow max-w-[600px] self-center hidden md:flex">
        <div className="flex flex-grow w-full">
          <input
            type="text"
            placeholder="Search"
            className="inset-0 w-full px-4 text-base border rounded-l-full shadow-inner outline-none border-secondary-border shadow-secondary focus:border-blue-500"
          />
          <Button className="flex-shrink-0 px-4 py-2 border border-l-0 rounded-r-full border-secondary-border">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
        <Button variant="default" size="icon">
          <FontAwesomeIcon icon={faMicrophone} />
        </Button>
      </form>
      <div
        className={`${
          showFullWidthSearch ? "hidden md:flex" : "flex"
        } items-center`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
        <Button variant="ghost" size="icon">
          <FontAwesomeIcon icon={faSquarePlus} />
        </Button>
        <Button variant="ghost" size="icon">
          <FontAwesomeIcon icon={faBell} />
        </Button>
        <Button variant="ghost" size="icon">
          <FontAwesomeIcon icon={faUser} />
        </Button>
      </div>
    </div>
  );
}
