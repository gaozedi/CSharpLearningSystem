import {
  CompoundButton,
  IStackTokens,
  Rating,
  RatingSize,
  Stack,
  TextField,
} from "@fluentui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { ICode } from "../../app/models/code";
import { RootStoreContext } from "../../app/stores/rootStore";

import { Card, ICardTokens, ICardSectionTokens } from "@uifabric/react-cards";
import {
  FontWeights,
  Icon,
  IIconStyles,
  Text,
  ITextStyles,
} from "office-ui-fabric-react";
import {  GooSpinner } from "react-spinners-kit";

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

  const sendCompile = () => {
    const codeToCompile: ICode = {
      codeStr: code,
    };
    compileCode(codeToCompile);
    AICodeInspectAction(codeToCompile);
  };
  const hanldeCodeChange = (e: any) => {
    setCode(e.target.value);
  };
  const iconStyles: IIconStyles = {
    root: {
      fontSize: "24px",
      height: "24px",
      width: "24px",
    },
  };
  return (
    <Stack tokens={stackTokens} horizontal>
      <Stack.Item>
        <Stack tokens={stackTokens}>
          <Stack.Item>
            <Text styles={titleTextStyles} variant="xxLargePlus">
              Built-in Compiler
            </Text>
          </Stack.Item>

          <Stack.Item>
            <TextField
              multiline
              rows={7}
              autoAdjustHeight
              onChange={hanldeCodeChange}
              value={code}
            />
          </Stack.Item>
          <Stack.Item align="end">
            <CompoundButton
              primary
              secondaryText="Send Code to Online Compiler and AICodeInspection API."
              onClick={sendCompile}
            >
              Compile
            </CompoundButton>
          </Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <Card
          aria-label="Clickable vertical card with image bleeding at the top of the card"
          tokens={cardTokens}
        >
          <Card.Section
            fill
            verticalAlign="end"
            tokens={backgroundImageCardSectionTokens}
          >
            <Text variant="large" styles={titleTextStyles}>
              Security Score
            </Text>
            <Text variant="superLarge" styles={titleTextStyles}>
              {inspectResult?.score
                ? 100 - Math.floor(inspectResult.score * 100)
                : 0}
            </Text>
          </Card.Section>
          <Card.Section>
            <Text variant="large" styles={titleTextStyles}>
              Compiled Result
            </Text>
            <Text variant="xxLargePlus" styles={titleTextStyles}>
              {compiledResult ? compiledResult : "Not Compiled"}
            </Text>
          </Card.Section>
          <Card.Section tokens={agendaCardSectionTokens}>
            <Text variant="large">Code Quality:</Text>
            {inspectResult !== undefined ? (
              <>
              <br />
              <Rating
                rating={5 - Math.floor(inspectResult.score * 5)}
                size={RatingSize.Large}
                ariaLabelFormat={"Select {0} of {1} stars"}
                color="#3498DB"
              />
              </>
            ) : (
              <>
                <GooSpinner color="cornflowerblue" />
                <Text variant="large">API Standing by</Text>
              </>
            )}
          </Card.Section>
          <Card.Item grow={1}>
            {/* {inspectResult?.prediction}
            {inspectResult?.score} */}
          </Card.Item>

          <Card.Section horizontal tokens={footerCardSectionTokens}>
            <Icon iconName="RedEye" styles={iconStyles} />
            <Icon iconName="SingleBookmark" styles={iconStyles} />
            <Stack.Item grow={1}>
              <Text variant="large"></Text>
            </Stack.Item>
            <Icon iconName="MoreVertical" styles={iconStyles} />
          </Card.Section>
        </Card>
      </Stack.Item>
    </Stack>
  );
};
export default observer(MyCompiler);
const titleTextStyles: ITextStyles = {
  root: {
    //  color: '#3F36E3',
    fontWeight: FontWeights.semibold,
  },
};

const cardTokens: ICardTokens = { childrenMargin: 12 };
const footerCardSectionTokens: ICardSectionTokens = { padding: "12px 0px 0px" };
const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };
const agendaCardSectionTokens: ICardSectionTokens = { childrenGap: 0 };
