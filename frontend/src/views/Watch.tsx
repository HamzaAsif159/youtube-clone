import { PageHeader } from "../layouts/PageHeader";
import { Sidebar } from "../layouts/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { SuggestedVideoItem } from "../components/SuggestedVideoItem";
import { videos } from "../data/home";

export default function Watch() {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col max-h-screen">
          <PageHeader />
          <div className="lg:flex">
            <div className="min-w-[225px]">
              <Sidebar smallSideBar={false} largeSideBar={false} />
            </div>
            <div className="w-full md:grid grid-cols-[1fr,auto] flex-grow-1 overflow-auto lg:w-[60%]">
              <div className="w-full aspect-video">
                <VideoPlayer url="https://www.youtube.com/watch?v=PeJzZThvrlo" />
              </div>
            </div>
            <div className="flex flex-col mx-4">
              {videos.map((video) => (
                <SuggestedVideoItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
