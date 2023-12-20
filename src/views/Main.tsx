import React from "react";
import { categories, videos } from "../data/home";
import { CategoryTag } from "../components/CategoryTag";
import { VideoGridItem } from "../components/VideoItem";
import PageHeader from "../layouts/PageHeader";

export default function Main() {
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);

  return (
    <div className="flex flex-col max-h-screen">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <div>sidebar</div>
        <div className="px-8 pb-4 overflow-x-hidden">
          <div className="sticky top-0 z-10 pb-4 bg-white">
            <CategoryTag
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map((video) => (
              <VideoGridItem key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
