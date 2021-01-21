import React from "react";
import { Dimmer, Loader} from "semantic-ui-react";

//instead of using interface, use {inverted?:boolean,content?:string} as type parameter directly
export const LoadingComponent: React.FC<{
  inverted?: boolean;
  content?: string;
  //set inverted a default value to true to have a white background (default false is black)
}> = ({  content }) => {
  return (
    <Dimmer active >
      <Loader content={content} />
    </Dimmer>
  );
};
export default LoadingComponent;