import {
  IStackTokens,
  Stack,
  TextField,
  ProgressIndicator,
  PrimaryButton,
  Slider,
  CompoundButton,
} from "@fluentui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { IMFQAnswer } from "../../app/models/code";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Card, ICardTokens } from "@uifabric/react-cards";
import { FontWeights, Text, ITextStyles } from "office-ui-fabric-react";
import NavBarNew from "../../features/nav/NavBarNew";
import { CombSpinner, WaveSpinner } from "react-spinners-kit";

const MFQs: React.FC = () => {
  const [userAnswerSort, setUserAnswerSort] = useState("");
  const [userAnswerCode, setUserAnswerCode] = useState("");
  const store = useContext(RootStoreContext);
  const { AIMFQAction, MFQResult } = store.unitStore;

  const [sliderValue, setSliderValue] = React.useState(0);
  const sliderOnChange = (value: number) => setSliderValue(value);

  const onUserAnswerSortChange = (e: any) => {
    setUserAnswerSort(e.target.value);
  };

  const onUserAnswerCodeChange = (e: any) => {
    setUserAnswerCode(e.target.value);
  };

  const sendMFQAnswer = () => {
    const answer: IMFQAnswer = {
      content: userAnswerSort + " " + sliderValue + " " + userAnswerCode,
    };
    console.log(answer.content);
    AIMFQAction(answer);
  };

  // Tokens definition
  const stackTokens: IStackTokens = {
    childrenGap: 10,
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

  return (
    <>
      <NavBarNew />
      <ProgressIndicator />
      <Stack horizontal horizontalAlign="space-around" verticalAlign="center">
        <Stack.Item>
          <Stack>
           
            <Stack.Item>
              <Text variant="mega" className="rainbow2">
                AI MFQ System
              </Text>
            </Stack.Item>
        
            <Stack.Item>
              <Text variant="xLarge">
                Please answer questions on the right.
                <br />
              </Text>
              <Text variant="large">
                This system runs a RNN machine learning model,
                <br />
                which will assest your learning outcome,
                <br />
                and provide you with the personalized recommendations.
                <br /><br />
              </Text>
            </Stack.Item>
            <Stack.Item>
              <WaveSpinner size={90} color="lightblue" />
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item>
          <Stack tokens={stackTokens}>
            <Stack.Item>
              <Card
                aria-label="Clickable horizontal card "
                horizontal
                // onClick={alertClicked}
                tokens={cardTokens}
              >
                {/* <Card.Item fill>
                  <Image src="/assets/next.png" alt="Placeholder image." />
                </Card.Item> */}
                <Card.Section>
                  <Text variant="large" styles={siteTextStyles}>
                    1. Please sort the below code from most familiar to least
                    familiar
                  </Text>
                  <Text variant="mediumPlus">
                    <b>a:</b> <code>Int a; </code>
                    <b>b:</b> <code>if else; </code>
                    <b>c:</b> <code>Int a; </code>
                    <b>d:</b> <code>Int a; </code>
                    <b>e:</b> <code>Int a; </code>
                  </Text>
                  <TextField
                    value={userAnswerSort}
                    onChange={onUserAnswerSortChange}
                  ></TextField>
                </Card.Section>
              </Card>
            </Stack.Item>
            <Stack.Item className="frostedGlassContainerWithPadding">
              <Text styles={siteTextStyles} variant="large">
                2. Please choose your satisfaction value for this app.
              </Text>
              <Slider
                showValue
                value={sliderValue}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={sliderOnChange}
              />
            </Stack.Item>
            <Stack.Item>
              <Card
                aria-label="Clickable horizontal card "
                horizontal
                // onClick={alertClicked}
                tokens={cardTokens}
              >
                {/* <Card.Item fill>
                  <Image src="/assets/next.png" alt="Placeholder image." />
                </Card.Item> */}
                <Card.Section>
                  <Text variant="large" styles={siteTextStyles}>
                    3. Please Input one of your most unfamiliar code you can
                    think of.
                  </Text>
                  <Text styles={descriptionTextStyles}>
                    Please Input one of your most unfamiliar code you can think
                    of.
                  </Text>
                  <TextField
                    value={userAnswerCode}
                    onChange={onUserAnswerCodeChange}
                  ></TextField>
                  {/* <Text variant="small" styles={helpfulTextStyles}>
                    Is this recommendation helpful?
                  </Text> */}
                </Card.Section>
                {/* <Card.Section
                  styles={footerCardSectionStyles}
                  tokens={footerCardSectionTokens}
                >
                  <Icon iconName="RedEye" styles={iconStyles} />
                  <Icon iconName="SingleBookmark" styles={iconStyles} />
                  <Stack.Item grow={1}>
                    <span />
                  </Stack.Item>
                  <Icon iconName="MoreVertical" styles={iconStyles} />
                </Card.Section> */}
              </Card>
            </Stack.Item>
            <Stack.Item align="end">
              <CompoundButton
                primary
                secondaryText="By submit you agree that your data will be used anonymously to improved the ML model"
                onClick={sendMFQAnswer}
              >
                Submit
              </CompoundButton>
            </Stack.Item>
            <Stack.Item>{MFQResult}</Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </>
  );
};
export default observer(MFQs);
