import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, HTMLInputElement> {}

const TextInputNew: React.FC<IProps> = ({ input }) => {
  return (
    <div>
      <input {...input} />
      <TextField label="Standard"  >
        
      </TextField>
    </div>
  );
};
export default TextInputNew;