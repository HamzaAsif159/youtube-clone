import ReactPlayer from "react-player";

type VideoPlayerProps = {
  url: string;
  maxWidth?: string;
  maxHeight?: string;
};

export function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <>
      <ReactPlayer controls={true} url={url} width="100%" height="100%" />
    </>
  );
}
