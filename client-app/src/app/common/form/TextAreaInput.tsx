import { TextField } from "@fluentui/react";
import React from "react";
import { FieldRenderProps } from "react-final-form";


interface IProps
  extends FieldRenderProps<string, HTMLTextAreaElement>
     {}

const TextAreaInput: React.FC<IProps> = ({
  input,

  meta: { touched, error },
}) => {
  return (
    <TextField >

    </TextField>
  );
};

export default TextAreaInput;
