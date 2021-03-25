import {
  CompoundButton,
  IStackTokens,
  ProgressIndicator,
  Rating,
  RatingSize,
  Stack,
  TextField,
} from "@fluentui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { ICode } from "../models/code";
import { RootStoreContext } from "../stores/rootStore";

import { Card, ICardTokens, ICardSectionTokens } from "@uifabric/react-cards";
import {
  FontWeights,
  Icon,
  IIconStyles,
  Text,
  ITextStyles,
} from "office-ui-fabric-react";
import { GooSpinner } from "react-spinners-kit";
import NavBarNew from "../../features/nav/NavBarNew";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 30,
};

const Game: React.FC = () => {
  const [content, setContent] = useState("");
  const store = useContext(RootStoreContext);
  const { sendSignal, signal, sendHeartbeat, beat_user,sendFightStart,fightResult } = store.unitStore;
  const rootStore = useContext(RootStoreContext);
  const { createHubConnection, stopHubConnection } = rootStore.unitStore;

  useEffect(() => {
    createHubConnection();
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection]);

  const sendCompile = () => {
    const codeToCompile: ICode = {
      codeStr: content,
    };
    sendHeartbeat("Compiling...");
  };
  const hanldeCodeChange = (e: any) => {
    setContent(e.target.value);
   
  };

  const submitCode = () => {
    sendSignal(content);
  };
  const iconStyles: IIconStyles = {
    root: {
      fontSize: "24px",
      height: "24px",
      width: "24px",
    },
  };
  return (
    <>
      <NavBarNew />
      <ProgressIndicator />
    <Stack tokens={stackTokens} horizontal>
      <Stack.Item>
        <Stack tokens={stackTokens}>
          <Stack.Item>
            <Text styles={titleTextStyles} variant="xxLargePlus">
              C# Game
            </Text>
          </Stack.Item>
          <Stack.Item>
            <h1>
              input one line of code to get a bigger result than other user
            </h1>
          </Stack.Item>

          <Stack.Item>
            <TextField
              autoAdjustHeight
              onChange={hanldeCodeChange}
              onFocus={()=>sendHeartbeat("Typing...")}
              onBlur={()=>sendHeartbeat("Thinking...")}
              value={content}
            />
          </Stack.Item>
          <Stack.Item align="end">
            <CompoundButton
              primary
              secondaryText="Send Code to Online Compiler and AICodeInspection API."
              onClick={submitCode}
            >
              Compile
            </CompoundButton>
          </Stack.Item>
          <Stack.Item align="end">
            <CompoundButton
              primary
              secondaryText="Send Code to Online Compiler and AICodeInspection API."
              onClick={()=>sendFightStart()}
            >
              Fight!
            </CompoundButton>
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        <h1> {signal}</h1>
        <h1> {beat_user}</h1>
        <h1> {fightResult}</h1>
      </Stack.Item>
    </Stack>
    </>
  );
};
export default observer(Game);
const titleTextStyles: ITextStyles = {
  root: {
    //  color: '#3F36E3',
    fontWeight: FontWeights.semibold,
  },
};

// const cardTokens: ICardTokens = { childrenMargin: 12 };
// const footerCardSectionTokens: ICardSectionTokens = { padding: "12px 0px 0px" };
// const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };
// const agendaCardSectionTokens: ICardSectionTokens = { childrenGap: 0 };
