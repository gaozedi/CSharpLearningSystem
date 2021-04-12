
import React, { useContext, useEffect } from "react";
import MarkdownEditor from '@uiw/react-markdown-editor';


const Notebook: React.FC= () => {
    const [value, setValue] = React.useState("# My Notebook \n>Leslie Gao 11th April\n**below is my important code**\n```csharp\n Console.WriteLine(\"Hello,World!\")\n``` \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
  return (
    <>
          <MarkdownEditor
        value={value}
      />
  
    </>
  );
};
export default Notebook;
