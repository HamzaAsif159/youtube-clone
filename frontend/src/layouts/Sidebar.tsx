import { Children, ElementType, ReactNode, useState } from "react";
import {
  IconDefinition,
  faBagShopping,
  faBookmark,
  faClapperboard,
  faClock,
  faDownLong,
  faFilm,
  faFireFlameCurved,
  faGamepad,
  faHistory,
  faHouse,
  faLightbulb,
  faMusic,
  faNewspaper,
  faPodcast,
  faRadio,
  faRepeat,
  faShirt,
  faSquare,
  faTrophy,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { twMerge } from "tailwind-merge";

import { playlists, subscriptions } from "../data/sidebar";
import { Button, buttonStyles } from "../components/Button";
import { useSidebarContext } from "../context/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`hidden sticky top-0 overflow-y-auto scrollbar-hidden pb-4 md:flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={faHouse} title="Home" url="/" />
        <SmallSidebarItem Icon={faRepeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={faClapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={faBookmark} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="sticky top-0 px-2 pt-2 pb-4 bg-white lg:hidden">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImgUrl={faHouse}
            title="Home"
            url="/"
          />
          <LargeSidebarItem
            IconOrImgUrl={faClapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={faBookmark}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={faHistory}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={faSquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={faClock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={faPlaystation}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={faFireFlameCurved}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={faBagShopping}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={faMusic} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={faFilm}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={faRadio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={faGamepad}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem
            IconOrImgUrl={faNewspaper}
            title="News"
            url="/news"
          />
          <LargeSidebarItem
            IconOrImgUrl={faTrophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={faLightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={faShirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={faPodcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: IconDefinition | ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <FontAwesomeIcon icon={Icon as IconDefinition} />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? faUpLong : faDownLong;

  return (
    <div>
      {title && <div className="mt-2 mb-1 ml-4 text-lg">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="flex items-center w-full gap-4 p-3 rounded-lg"
        >
          <FontAwesomeIcon icon={ButtonIcon} />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImgUrl: IconDefinition | ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <FontAwesomeIcon icon={IconOrImgUrl as IconDefinition} />
      )}
      <div className="overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </div>
    </a>
  );
}
