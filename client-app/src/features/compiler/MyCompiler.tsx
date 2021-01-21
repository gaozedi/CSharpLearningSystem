import {
  CompoundButton,
  DefaultButton,
  IStackTokens,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { Stats } from "fs";
import { observer } from "mobx-react-lite";
import React, { FormEvent, useContext, useState } from "react";

import { Form as FinalForm, Field, Form } from "react-final-form";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { ICode } from "../../app/models/code";
import { RootStoreContext } from "../../app/stores/rootStore";


// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 30,
};

const MyCompiler: React.FC = () => {
  const [code, setCode] = useState("");
  const store = useContext(RootStoreContext);
  const {
    compiledResult,
    compileCode,
    AICodeInspectAction,
    inspectResult,
  } = store.unitStore;

  // const handleInputChange = (event: any) => {
  //   // const { name, value } = event.currentTarget;
  //   setCode(event.target.value);
  // };

  // const handleSubmit = () => {
  //   console.log(code);
  //   store.compileCode(code);
  //   //setRefresher(!refresher);
  // };

  const sendCompile = () => {
    const codeToCompile: ICode = {
      codeStr: code,
    };
    console.log(codeToCompile);
     compileCode(codeToCompile);
    // AICodeInspectAction(values);
  };
  const hanldeCodeChange = (e: any) => {
    setCode(e.target.value);
  };
  return (
    <Stack  tokens={stackTokens}>
      <Stack.Item>
        <TextField
          label="Input Your Code"
          multiline
          autoAdjustHeight
          onChange={hanldeCodeChange}
          value={code}
        />
      </Stack.Item>
      <Stack.Item>
        <CompoundButton primary secondaryText="Send Code to Online Compiler and AICodeInspection API." onClick={sendCompile}>Compile</CompoundButton>
      </Stack.Item>

      <br />
      <p>
        your code: <code>{code}</code>
      </p>

      {/* <Message icon>
        <Icon name="bug" loading />
        <Message.Content>
          <Message.Header>AI code inspection running</Message.Header>
          Malicious Code Probability:{inspectResult?.score}
        </Message.Content>
        {inspectResult !== undefined && (
          <Rating
            icon="heart"
            defaultRating={10 - Math.floor(inspectResult.score * 10)}
            maxRating={10}
            size="large"
          />
        )}
      </Message>

      <Message
        success
        icon="inbox"
        header=" Compiled Result:"
        content={compiledResult}
      /> */}
      <Stack.Item>Result: {compiledResult}</Stack.Item>
    </Stack>
  );
};
export default observer(MyCompiler);
