import React, { useContext, useState } from "react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import {
  IStackStyles,
  IStackTokens,
  ProgressIndicator,
  Stack,
} from "@fluentui/react";
import { darkTheme, lightTheme } from "../../themes";

import { initializeIcons } from "@uifabric/icons";
import { Text } from "office-ui-fabric-react/lib/Text";
import { SeparatorBasicExample } from "./Card";
import { Image } from "office-ui-fabric-react/lib/Image";

import DialogForm from "../common/form/DialogForm";

import UnitsListNew from "./UnitsListNew";
import { observer } from "mobx-react-lite";
import NavBarNew from "../../features/nav/NavBarNew";
import { RootStoreContext } from "../stores/rootStore";

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    //background: DefaultPalette.themeTertiary,
  },
};

// const stackItemStyles: IStackItemStyles = {
//   root: {
//     alignItems:"center",
//     //  background: DefaultPalette.themePrimary,
//     //  color: DefaultPalette.white,
//     display: "flex",
//     height: 40,
//     justifyContent: "center",
//   },
// };

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 30,
};

const NewHomePage: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { useDarkMode } = rootStore.commonStore;

  initializeIcons();

  return (
    <ThemeProvider applyTo="body" theme={useDarkMode ? darkTheme : lightTheme}>
      <NavBarNew />

      <ProgressIndicator />
      <Stack tokens={stackTokens}>
        <Stack.Item>
          <Stack
            horizontal
            verticalAlign="center"
            horizontalAlign="space-around"
            gap={"10%"}
            style={{  paddingTop: "5%"}}
          >
            <Stack.Item grow={2}>
              <Text style={{ fontSize: 180, paddingLeft: "5%"}}>My</Text>
              <Text className="rainbow" style={{ fontSize: 200 }}>
                Home
              </Text>
            </Stack.Item>
            <Stack.Item grow={4}>
              <Text style={{ marginRight: "10%" }} variant="xLarge">
                "When people concentrate on the idea of beauty, they are,
                without realizing it, confronted with the darkest thoughts that
                exist in this world. "
                <br />
                <br />
                <Text variant="large">
                  ― Yukio Mishima, The Temple of the Golden Pavilion
                </Text>
              </Text>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>

      <SeparatorBasicExample />

      <Stack
        horizontal
        style={{
          paddingLeft: "12%",
          background: "lightblue",
          color: "black",
        }}
        gap="12%"
        wrap
      >
        <Stack.Item grow={4}>
          <Text style={{ fontSize: 50, fontWeight: 500, paddingLeft: "5%" }}>
            Leslie UI Design
          </Text>
        </Stack.Item>
        <Stack.Item grow={4}>
          {/* <Text variant='mega'>
          "
          </Text> */}
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

      <Stack
        horizontal
        verticalAlign="center"
        styles={stackStyles}
        tokens={stackTokens}
      >
        <Stack.Item>
          <Text variant="xLarge">
            Amid the moon and the stars,
            <br />
            amid the clouds of the night, amid the hills which bordered on the
            sky with their magnificent silhouette of pointed cedars, amid the
            speckled patches of the moon, amid the temple buildings that emerged
            sparkling white out of the surrounding darkness - amid all this,
            <br />I was intoxicated by the pellucid beauty of Uiko's treachery.
          </Text>
        </Stack.Item>
        <Stack.Item>
          <Image src="https://static2.sharepointonline.com/files/fabric/fabric-website/images/discover-resources-1x.png" />
        </Stack.Item>
      </Stack>
      {/* <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
          <div>

          </div>
      </div>
      </div> */}
      <UnitsListNew />
    </ThemeProvider>
  );
};
export default observer(NewHomePage);
