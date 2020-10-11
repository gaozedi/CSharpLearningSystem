import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

//instead of using interface, use {inverted?:boolean,content?:string} as type parameter directly
export const LoadingComponent: React.FC<{
  inverted?: boolean;
  content?: string;
  //set inverted a default value to true to have a white background (default false is black)
}> = ({ inverted = true, content }) => {
  return (
    <Dimmer active interted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
export default LoadingComponent;