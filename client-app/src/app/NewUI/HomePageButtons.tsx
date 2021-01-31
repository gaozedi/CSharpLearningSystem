import * as React from "react";
import { Separator } from "office-ui-fabric-react/lib/Separator";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Stack, IStackTokens } from "office-ui-fabric-react/lib/Stack";
import { Text } from "office-ui-fabric-react/lib/Text";
import { FontIcon } from "@fluentui/react";

const stackTokens: IStackTokens = { childrenGap: 12 };


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


const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: "0 25px",
});


export const HomePageButtons: React.FC = () => (
  <Stack tokens={stackTokens} style={{ marginTop: "12%" }}>
    {/* <Stack tokens={stackTokens}>
      <Separator>
        <Icon iconName="Clock" styles={iconStyles} />
      </Separator>
    </Stack> */}
    <VerticalSeparatorStack>
      <>
        <Text variant='xLarge' block>Tutorial Units</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="Library" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
      <>
        <Text variant='xLarge'>Code Arena</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="Game" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
      <>
        <Text variant='xLarge'>Video Tutorial</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="MSNVideosSolid" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
      <>
        <Text variant='xLarge' >Learning Zone</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="CommentActive" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
      <>
        <Text variant='xLarge' >Learning Assessment</Text>
        <Stack.Item className={verticalStyle}>
          <Separator vertical alignContent="start">
            <FontIcon iconName="ComplianceAudit" className={iconClass} />
          </Separator>
        </Stack.Item>
      </>
    </VerticalSeparatorStack>
  </Stack>
);
