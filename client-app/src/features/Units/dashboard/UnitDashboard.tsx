import {
  DefaultButton,
  ILabelStyles,
  IStackTokens,
  IStyleSet,
  Label,
  Pivot,
  PivotItem,
  ProgressIndicator,
  Stack,
} from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { darkTheme, lightTheme } from "../../../themes";
import NavBarNew from "../../nav/NavBarNew";
import { Nav, INavStyles, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import UnitsList from "./UnitsList";
import MyCompiler from "../../compiler/MyCompiler";
import MFQs from "../../../app/NewUI/MFQs";
//in order to use the interface above, we neet to give our component a type, then we can use props object
//in our component

export const UnitDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { useDarkMode } = rootStore.commonStore;

  const navStyles: Partial<INavStyles> = {
    root: {
      width: 208,
      height: 350,
      boxSizing: "border-box",
      border: "1px solid #eee",
      overflowY: "auto",
    },
  };
  // Tokens definition
  const stackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 30,
  };

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Home",
          url: "/",
          expandAriaLabel: "Expand Home section",
          collapseAriaLabel: "Collapse Home section",
          links: [
            {
              name: "Activity",
              url: "http://msn.com",
              key: "key1",
              target: "_blank",
            },
            {
              name: "MSN",
              url: "http://msn.com",
              disabled: true,
              key: "key2",
              target: "_blank",
            },
          ],
          isExpanded: true,
        },
        {
          name: "Tutorial Units",
          url: "http://example.com",
          key: "key3",
          isExpanded: true,
          target: "_blank",
        },
        {
          name: "Pages",
          url: "http://msn.com",
          key: "key4",
          target: "_blank",
        },
        {
          name: "Notebook",
          url: "http://msn.com",
          key: "key5",
          disabled: true,
        },
        {
          name: "Communication and Media",
          url: "http://msn.com",
          key: "key6",
          target: "_blank",
        },
        {
          name: "GitHub",
          url: "https://github.com/gaozedi/CSharpLearning",
          icon: "News",
          key: "key7",
          target: "_blank",
        },
      ],
    },
  ];
  const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
  };
  return (
    <ThemeProvider applyTo="body" theme={useDarkMode ? darkTheme : lightTheme}>
      <NavBarNew />
      <ProgressIndicator />
      <Stack horizontal tokens={stackTokens} >
        <Stack.Item className="frostedGlassContainer">
          <Nav
            selectedKey="key3"
            ariaLabel="Nav basic example"
            styles={navStyles}
            groups={navLinkGroups}
          />
        </Stack.Item>
        <Stack.Item>
          <Pivot aria-label="Count and Icon Pivot Example" >
            <PivotItem headerText="Units list" itemIcon="CustomList">
              <Label styles={labelStyles}>
                <UnitsList />
              </Label>
            </PivotItem>
            <PivotItem headerText="Compiler" itemIcon="Articles">
              <Label styles={labelStyles} className="frostedGlassbg">
                <Stack className="frostedGlassContainer2" >
                  <MyCompiler />
                </Stack>
              </Label>
            </PivotItem>
            <PivotItem headerText="Placeholder" itemIcon="Globe">
              <Label styles={labelStyles}>Pivot #3</Label>
            </PivotItem>
            <PivotItem
              headerText="Shared with me"
              itemIcon="Ringer"
              itemCount={1}
            >
              <Label styles={labelStyles}></Label>
            </PivotItem>
            <PivotItem headerText="Customized Rendering" itemIcon="Feedback">
              <Label styles={labelStyles}>Customized Rendering</Label>
            </PivotItem>
          </Pivot>
        </Stack.Item>
      </Stack>
    </ThemeProvider>
  );
};

export default observer(UnitDashboard);
