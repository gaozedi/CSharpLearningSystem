import * as React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
  ICommandBarStyles,
} from "office-ui-fabric-react/lib/CommandBar";
import { IButtonProps, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import {
  Coachmark,
  DefaultButton,
  DirectionalHint,
  Icon,
  IContextualMenuProps,
  IDropdownOption,
  IStackItemStyles,
  IStackStyles,
  IStackTokens,
  mergeStyles,
  Stack,
  TeachingBubbleContent,
  Toggle,
} from "@fluentui/react";
import DialogForm from "../../app/common/form/DialogForm";
import { Link, Text } from "office-ui-fabric-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useBoolean } from "@uifabric/react-hooks";
import { useEffect } from "react";
const overflowProps: IButtonProps = { ariaLabel: "More commands" };

const NavBarNew: React.FunctionComponent = () => {
  const rootStore = React.useContext(RootStoreContext);
  const { setDarkMode } = rootStore.commonStore;
  const { isLoggedIn, logout } = rootStore.userStore;

  const targetButton = React.useRef<HTMLDivElement>(null);
  const [
    isCoachmarkVisible,
    { setFalse: hideCoachmark, setTrue: showCoachmark },
  ] = useBoolean(false);
  const [
    coachmarkPosition,
    setCoachmarkPosition,
  ] = React.useState<DirectionalHint>(DirectionalHint.bottomCenter);

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
        <Stack.Item grow={1} align="center">
          <Text variant="xLarge">LESLIE UI DESIGN</Text>
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
    key: "newItem",
    text: "ITEM1",
    cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
    split: true,
    iconProps: { iconName: "Add" },

    subMenuProps: {
      items: [
        {
          key: "emailMessage",
          text: "Email message",
          iconProps: { iconName: "Mail" },
          ["data-automation-id"]: "newEmailButton", // optional
        },
        {
          key: "calendarEvent",
          text: "Calendar event",
          iconProps: { iconName: "Calendar" },
        },
      ],
    },
  },
  {
    key: "upload",
    text: "ITEM2",
    iconProps: { iconName: "Upload" },
    href: "https://developer.microsoft.com/en-us/fluentui",
  },
  {
    key: "share",
    text: "ITEM3",
    //style:{paddingLeft:200},
    iconProps: { iconName: "Share" },
    onClick: () => console.log("Share"),
  },
  {
    key: "download",
    text: "ITEM4",
    split: true,
    iconProps: { iconName: "Download" },
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
    text: "Grid view",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Grid view",
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
