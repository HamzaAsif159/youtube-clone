import { formatTimeAgo } from "../utils/formatTimeAgo";

type SuggestedVideoItemProps = {
  id?: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration?: number;
  thumbnailUrl: string;
  videoUrl?: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function SuggestedVideoItem({
  title,
  channel,
  views,
  postedAt,
  thumbnailUrl,
}: SuggestedVideoItemProps) {
  return (
    <div className="flex mb-4 lg:max-w-[400px] gap-2">
      <img
        src={thumbnailUrl}
        alt="thumbnail"
        className="max-w-[150px] max-h-[100px] lg:max-w-[150px] lg:max-h-[200px] object-cover rounded-lg"
      />
      <div className="flex flex-col justify-evenly">
        <div className="overflow-hidden text-base lg:text-lg font-medium leading-6 text-ellipsis lg:w-[200px]">
          {title}
        </div>
        <div className="text-secondary-text">
          <div className="mb-2 text-xs font-medium">{channel.name}</div>
          <div className="flex gap-3 text-xs md:text-sm">
            <div> {VIEW_FORMATTER.format(views)} Views</div>
            <div>• {formatTimeAgo(postedAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
