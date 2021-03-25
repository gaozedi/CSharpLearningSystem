import {
  IStackTokens,
  Stack,
  TextField,
  ProgressIndicator,
  PrimaryButton,
  Slider,
  IStackItemStyles,
  IImageProps,
  CompoundButton,
} from "@fluentui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { ICode, IMFQAnswer } from "../../app/models/code";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Card, ICardTokens } from "@uifabric/react-cards";
import { FontWeights, Text, ITextStyles } from "office-ui-fabric-react";
import NavBarNew from "../../features/nav/NavBarNew";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { darkTheme, lightTheme } from "../../themes";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
const MFQs: React.FC = () => {
  const [content, setContent] = useState("");
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    sendSignal,
    signal,
    sendHeartbeat,
    beat_user,
    sendFightStart,
    fightResult,
    user1,
    user2,
    user1Status,
    user2Status
  } = rootStore.unitStore;

  const { useDarkMode, setDarkMode } = rootStore.commonStore;

  useEffect(() => {
    createHubConnection();
    setDarkMode();
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
  // Tokens definition

  const stackItemStyles: IStackItemStyles = {
    root: {
      alignItems: "center",

      display: "flex",
      justifyContent: "center",
    },
  };

  // Tokens definition
  const stackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 30,
  };

  const cardTokens: ICardTokens = { childrenMargin: 12 };

  const siteTextStyles: ITextStyles = {
    root: {
      color: "#025F52",
      fontWeight: FontWeights.semibold,
    },
  };
  const descriptionTextStyles: ITextStyles = {
    root: {
      color: "#333333",
      fontWeight: FontWeights.regular,
    },
  };

  const imageProps: IImageProps = {
    src: "https://unsplash.com/photos/nAjil1z3eLk/download?force=true&w=1920",
    imageFit: ImageFit.cover,
    maximizeFrame: true,
  };

  return (
    <>
      <ThemeProvider
        applyTo="body"
        theme={useDarkMode ? darkTheme : lightTheme}
      >
        <NavBarNew />
        <ProgressIndicator />
        <Stack horizontal tokens={stackTokens} grow id="test">
          <Stack.Item grow={3} styles={stackItemStyles}>
            <Stack>
              <Stack.Item>
                <Text variant="mega">
                  {" "}
                  <br />
                  <br />
                  Code Arena
                </Text>
              </Stack.Item>
              <Stack.Item>
                <Text variant="xLarge">
                  Instruction goes here Instruction goes here
                  <br />
                  Instruction goes here
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </Text>
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item grow={7} styles={stackItemStyles}>
            <Image {...imageProps} />
          </Stack.Item>
        </Stack>

        {/* ------------------------------------------------------------- */}
        <Stack horizontal tokens={stackTokens} horizontalAlign="space-around">
          <Stack.Item className="game_user1">
            <Text variant="mega">
              {user1} <br />
            </Text>
            <Text variant="mega" styles={siteTextStyles}>
              {user1Status} <br />
            </Text>
          </Stack.Item>
          <Stack.Item className="game_user2">
            <Text variant="mega">
            {user2}  <br />
            </Text>
            <Text variant="mega" styles={siteTextStyles}>
              {user2Status} <br />
            </Text>
          </Stack.Item>
        </Stack>
        
          <Stack tokens={stackTokens} className="frostedGlassContainer2">
            <Stack.Item styles={stackItemStyles}>
              <Stack horizontal tokens={stackTokens}>
                <Stack.Item grow={3} styles={stackItemStyles}>
                  <Text variant="xLarge" styles={siteTextStyles}>
                    {" "}
                    {signal}
                  </Text>
                </Stack.Item>
                <Stack.Item grow={2} styles={stackItemStyles}>
                  <Text variant="xLarge" styles={siteTextStyles}>
                    {" "}
                    {beat_user}
                  </Text>
                </Stack.Item>
                <Stack.Item grow styles={stackItemStyles}>
                  <Text variant="xLarge" styles={siteTextStyles}>
                    {" "}
                    {fightResult}
                  </Text>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <TextField
                autoAdjustHeight
                onChange={hanldeCodeChange}
                onFocus={() => sendHeartbeat("Typing...")}
                onBlur={() => sendHeartbeat("Thinking...")}
                value={content}
              />
            </Stack.Item>
            <Stack.Item align="end">
              <CompoundButton
                primary
                secondaryText="Send Code to Online Compiler and AICodeInspection API."
                onClick={submitCode}
              >
                Submit
              </CompoundButton>
            </Stack.Item>
            <Stack.Item align="end">
              <CompoundButton
                primary
                secondaryText="Send Code to Online Compiler and AICodeInspection API."
                onClick={() => sendFightStart()}
              >
                Fight!
              </CompoundButton>
            </Stack.Item>
          </Stack>
          <Stack
            horizontal
            style={{
              paddingLeft: "12%",
              background: "lightblue",
              color: "black",
              marginTop:30,
            }}
            gap="12%"
            wrap
          >
            <Stack.Item grow={4}>
              <Text
                style={{ fontSize: 50, fontWeight: 500, paddingLeft: "5%" }}
              >
                LESLIE UI DESIGN
              </Text>
            </Stack.Item>
            <Stack.Item grow={4}>
              <Text variant="xLarge">
                "True beauty
                <br />
                is something that attacks,
              </Text>
              <Text variant="xLarge">
                <br />
                overpowers,
                <br /> robs,
                <br /> and finally
                <br />
                destroys."
                <br />
              </Text>
            </Stack.Item>
          </Stack>
        
      </ThemeProvider>
    </>
  );
};
export default observer(MFQs);
