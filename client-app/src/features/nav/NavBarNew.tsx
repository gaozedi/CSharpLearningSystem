import * as React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
  ICommandBarStyles,
} from "office-ui-fabric-react/lib/CommandBar";
import { IButtonProps } from "office-ui-fabric-react/lib/Button";
import {
  Coachmark,
  DefaultButton,
  DirectionalHint,
  FontIcon,
  Icon,
  IContextualMenuProps,
  IStackItemStyles,
  IStackStyles,
  IStackTokens,
  mergeStyles,
  Stack,
  TeachingBubbleContent,
} from "@fluentui/react";
import DialogForm from "../../app/common/form/DialogForm";
import { Text } from "office-ui-fabric-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useBoolean } from "@uifabric/react-hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const overflowProps: IButtonProps = { ariaLabel: "More commands" };

const NavBarNew: React.FunctionComponent = () => {
  const rootStore = React.useContext(RootStoreContext);
  const { setDarkMode } = rootStore.commonStore;
  const { isLoggedIn, logout } = rootStore.userStore;

  const history = useHistory();

  const gotoPath = (path:string): void => {
    history.push(path);
  };

  const targetButton = React.useRef<HTMLDivElement>(null);
  const [
    isCoachmarkVisible,
    { setFalse: hideCoachmark, setTrue: showCoachmark },
  ] = useBoolean(false);
  const [coachmarkPosition] = React.useState<DirectionalHint>(
    DirectionalHint.bottomCenter
  );

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "logout",
        text: "Logout",
        iconProps: { iconName: "Leave" },
        onClick: logout,
      },
      {
        key: "accountCenter",
        text: "Account Center",
        iconProps: { iconName: "PlayerSettings" },
      },
    ],
  };

  function _alertClicked() {
    alert("Clicked");
  }
  const iconClass = mergeStyles({
    fontSize: 25,
    height: 25,
    width: 25,
    margin: "0 25px",
  });

  const iconClassBig = mergeStyles({
    fontSize: 60,
    height: 60,
    width: 60,
    margin: "0 25px",
  });

  const positioningContainerProps = React.useMemo(
    () => ({
      directionalHint: coachmarkPosition,
      doNotLayer: false,
    }),
    [coachmarkPosition]
  );
  useEffect(() => {
    showCoachmark();
    //need to specify the dependencies in dependenciy array below
  }, [showCoachmark]);
  return (
    <div>
      <Stack
        horizontal
        verticalAlign="stretch"
        styles={stackStyles}
        tokens={stackTokens}
        wrap
      >
        <Stack.Item grow={1} styles={stackItemStyles}>
          <FontIcon iconName="CSharp" className={iconClassBig} onClick={()=>gotoPath("/")}/>
          <Text  onClick={()=>gotoPath("/")} variant="xxLarge" >Learning</Text>
        </Stack.Item>
        <Stack.Item grow={2} styles={stackItemStyles}>
          <CommandBar
            items={_items}
            overflowItems={_overflowItems}
            overflowButtonProps={overflowProps}
            farItems={_farItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
            styles={commandBarStyles}
          />
        </Stack.Item>
        <Stack.Item styles={stackItemStyles}>
          {/* <Toggle
            // label="Change themes"
            onText="Dark Mode"
            offText="Light Mode"
            onChange={() => setDarkMode()}
          /> */}
          <Icon
            // secondaryText="Opens the Sample Dialog"
            onClick={setDarkMode}
            className={iconClass}
            iconName="Sunny"
          />
        </Stack.Item>
        <Stack.Item grow styles={stackItemStyles}>
          {isLoggedIn ? (
            <DefaultButton
              text="MyAccount"
              primary
              split
              splitButtonAriaLabel="See 2 options"
              aria-roledescription="split button"
              menuProps={menuProps}
              onClick={_alertClicked}
              // disabled={disabled}
              // checked={checked}
            />
          ) : (
            <div ref={targetButton}>
              <DialogForm />
            </div>
          )}
        </Stack.Item>
        {isCoachmarkVisible && (
          <Coachmark
            target={targetButton.current}
            positioningContainerProps={positioningContainerProps}
            ariaAlertText="A coachmark has appeared"
            ariaDescribedBy="coachmark-desc1"
            ariaLabelledBy="coachmark-label1"
            ariaDescribedByText="Press enter or alt + C to open the coachmark notification"
            ariaLabelledByText="Coachmark notification"
          >
            <TeachingBubbleContent
              headline="Instruction 1"
              hasCloseButton
              closeButtonAriaLabel="Close"
              // primaryButtonProps={buttonProps}
              // secondaryButtonProps={buttonProps2}
              onDismiss={hideCoachmark}
              ariaDescribedBy="example-description1"
              ariaLabelledBy="example-label1"
            >
              Click here to login or join the C# journey
            </TeachingBubbleContent>
          </Coachmark>
        )}
      </Stack>
    </div>
  );
};
export default observer(NavBarNew);
// Styles definition
const stackStyles: IStackStyles = {
  root: {
    //background: DefaultPalette.themeTertiary,
  },
};

const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: "center",
    //  background: DefaultPalette.themePrimary,
    //  color: DefaultPalette.white,
    display: "flex",
    height: 10,
    justifyContent: "center",
  },
};

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 30,
};

const commandBarStyles: ICommandBarStyles = {
  root: {
    // paddingLeft:200
  },
};

const _items: ICommandBarItemProps[] = [
  {
    key: "tutorialUnits",
    text: "UNITS",
    cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
    split: true,
    iconProps: { iconName: "AllApps" },
    href: "/tutorialUnits",
    subMenuProps: {
      items: [
        {
          key: "Unit1",
          text: "UNIT 1",
          iconProps: { iconName: "Edit" },
          href: "/tutorialUnits/1",
        },
        {
          key: "Unit2",
          text: "UNIT 2",
          iconProps: { iconName: "Edit" },
          href: "/tutorialUnits/2",
        },
        {
          key: "Unit2",
          text: "UNIT 2",
          iconProps: { iconName: "Edit" },
        },
        {
          key: "Unit3",
          text: "UNIT 3",
          iconProps: { iconName: "Edit" },
        },
        {
          key: "Unit4",
          text: "UNIT 4",
          iconProps: { iconName: "Edit" },
        },
        {
          key: "Unit5",
          text: "UNIT 5",
          iconProps: { iconName: "Edit" },
        },
        {
          key: "Unit6",
          text: "UNIT 6",
          iconProps: { iconName: "Edit" },
        },
      ],
    },
  },
  {
    key: "games",
    text: "GAMES",
    iconProps: { iconName: "Game" },
    href: "https://developer.microsoft.com/en-us/fluentui",
  },
  {
    key: "chat",
    text: "ZONE",
    //style:{paddingLeft:200},
    iconProps: { iconName: "CommentActive" },
    onClick: () => console.log("Share"),
  },
  {
    key: "assessment",
    text: "ASSESS",
    split: true,
    iconProps: { iconName: "AccountActivity" },
    onClick: () => console.log("Download"),
  },
];

const _overflowItems: ICommandBarItemProps[] = [
  {
    key: "move",
    text: "Move to...",
    onClick: () => console.log("Move to"),
    iconProps: { iconName: "MoveToFolder" },
  },
  {
    key: "copy",
    text: "Copy to...",
    onClick: () => console.log("Copy to"),
    iconProps: { iconName: "Copy" },
  },
  {
    key: "rename",
    text: "Rename...",
    onClick: () => console.log("Rename"),
    iconProps: { iconName: "Edit" },
  },
];

const _farItems: ICommandBarItemProps[] = [
  {
    key: "tile",
    text: "Dashboard",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Dashboard",
    iconOnly: true,
    iconProps: { iconName: "Tiles" },
    onClick: () => console.log("Tiles"),
  },
  {
    key: "info",
    text: "Info",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Info",
    iconOnly: true,
    iconProps: { iconName: "Info" },
    onClick: () => console.log("Info"),
  },
];
