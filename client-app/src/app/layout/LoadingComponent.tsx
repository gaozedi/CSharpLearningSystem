import React from "react";
import { CombSpinner } from "react-spinners-kit";
import { Text } from 'office-ui-fabric-react/lib/Text';

//instead of using interface, use {inverted?:boolean,content?:string} as type parameter directly
export const LoadingComponent: React.FC<{
  inverted?: boolean;
  content?: string;
  //set inverted a default value to true to have a white background (default false is black)
}> = ({  content }) => {
  return (
    <div className="center">
    <CombSpinner size={150} color="royalblue" />
    <br />
    <br />
    <Text variant="large">
    {content}
    </Text>
    </div>
  );
};
export default LoadingComponent;