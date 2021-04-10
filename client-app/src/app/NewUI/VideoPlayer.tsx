import React, { useContext, useEffect } from "react";

interface IProps {
  embedId: string;
}

// Tokens definition

const VideoPlayer: React.FC<IProps> = ({ embedId }) => {
  return (
    <>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </>
  );
};
export default VideoPlayer;
