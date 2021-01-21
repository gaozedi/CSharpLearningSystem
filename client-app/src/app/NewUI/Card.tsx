import * as React from "react";
import { Separator } from "office-ui-fabric-react/lib/Separator";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Stack, IStackTokens } from "office-ui-fabric-react/lib/Stack";
import { Text } from "office-ui-fabric-react/lib/Text";
import { FontIcon, Icon, IIconStyles } from "@fluentui/react";

const stackTokens: IStackTokens = { childrenGap: 12 };

const HorizontalSeparatorStack = (props: { children: JSX.Element[] }) => (
  <>
    {React.Children.map(props.children, (child) => {
      return <Stack tokens={stackTokens}>{child}</Stack>;
    })}
  </>
);

const VerticalSeparatorStack = (props: { children: JSX.Element[] }) => (
  <Stack horizontal horizontalAlign="space-evenly">
    {React.Children.map(props.children, (child) => {
      return (
        <Stack horizontalAlign="center" tokens={stackTokens}>
          {child}
        </Stack>
      );
    })}
  </Stack>
);

const verticalStyle = mergeStyles({
  height: "200px",
});

const content = "Today";

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: "0 25px",
});

const iconStyles: IIconStyles = {
  root: {
    fontSize: "24px",
    height: "24px",
    width: "24px",
  },
};

export const SeparatorBasicExample: React.FC = () => (
  <Stack tokens={stackTokens} style={{ marginTop: "12%" }}>
    {/* <Stack tokens={stackTokens}>
      <Separator>
        <Icon iconName="Clock" styles={iconStyles} />
      </Separator>
    </Stack> */}
    <VerticalSeparatorStack>
      <>
        <Text variant='xLarge' block>PLACEHOLDER</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="CompassNW" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
      <>
        <Text variant='xLarge'>PLACEHOLDER</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="Dictionary" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
      <>
        <Text variant='xLarge'>PLACEHOLDER</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="CompassNW" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
      <>
        <Text variant='xLarge' >PLACEHOLDER</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="TrainSolid" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
    </VerticalSeparatorStack>
  </Stack>
);
