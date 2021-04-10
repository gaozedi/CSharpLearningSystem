import {
  INavLinkGroup,
  IStackTokens,
  Nav,
  ProgressIndicator,
  Stack,
} from "@fluentui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../stores/rootStore";

import NavBarNew from "../../features/nav/NavBarNew";
import VideoPlayer from "./VideoPlayer";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { darkTheme, lightTheme } from "../../themes";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 30,
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: "Unit 1 Type Basics",
        url: "http://example.com",
        target: "_blank",
        expandAriaLabel: "Expand Parent link 1",
        collapseAriaLabel: "Collapse Parent link 1",
        links: [
          {
            name: "Child link 1",
            url: "http://example.com",
            target: "_blank",
          },
          {
            name: "Child link 2",
            url: "http://example.com",
            target: "_blank",
            expandAriaLabel: "Expand Child link 2",
            collapseAriaLabel: "Collapse Child link 2",
            links: [
              {
                name: "3rd level link 1",
                url: "http://example.com",
                target: "_blank",
              },
              {
                name: "3rd level link 2",
                url: "http://example.com",
                target: "_blank",
              },
            ],
          },
          {
            name: "Child link 3",
            url: "http://example.com",
            target: "_blank",
          },
        ],
      },
      {
        name: "Unit 2 Creating Types",
        url: "http://example.com",
        target: "_blank",
        expandAriaLabel: "Expand Parent link 2",
        collapseAriaLabel: "Collapse Parent link 2",
        links: [
          {
            name: "Child link 4",
            url: "http://example.com",
            target: "_blank",
          },
        ],
      },
      {
        name: "Unit 3 Polymorphism",
        url: "http://example.com",
        target: "_blank",
        expandAriaLabel: "Expand Parent link 2",
        collapseAriaLabel: "Collapse Parent link 2",
        links: [
          {
            name: "Child link 4",
            url: "http://example.com",
            target: "_blank",
          },
        ],
      },
      {
        name: "Unit 4 Advanced C#",
        url: "http://example.com",
        target: "_blank",
        expandAriaLabel: "Expand Parent link 2",
        collapseAriaLabel: "Collapse Parent link 2",
        links: [
          {
            name: "Child link 4",
            url: "http://example.com",
            target: "_blank",
          },
        ],
      },
    ],
  },
];

const VideoUnits: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { useDarkMode, setDarkMode } = rootStore.commonStore;

  useEffect(() => {

    setDarkMode();
  
  }, [setDarkMode]);
  return (
    <>
        <ThemeProvider
        applyTo="body"
        theme={useDarkMode ? darkTheme : lightTheme}
      >
      <NavBarNew />
      <ProgressIndicator />

      <Stack tokens={stackTokens} horizontal>
        <Stack.Item>
          <Nav
            ariaLabel="Nav example with nested links"
            groups={navLinkGroups}
          />
        </Stack.Item>
        <Stack.Item>
          <VideoPlayer embedId="N775KsWQVkw" />
        </Stack.Item>
      </Stack>
      </ThemeProvider>
    </>
  );
};

export default observer(VideoUnits);
