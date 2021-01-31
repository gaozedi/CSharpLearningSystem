import { IStackTokens, Stack } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { darkTheme, lightTheme } from "../../../themes";
import TutorialListItemNew from "../../../app/NewUI/TutorialListItemNew";
//in order to use the interface above, we neet to give our component a type, then we can use props object
//in our component
export const UnitDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { useDarkMode } = rootStore.commonStore;

  const { allunits, loadUnits } = rootStore.unitStore;
  useEffect(() => {
    if (allunits.length > 0) {
    } else {
      loadUnits();
    }

    //need to specify the dependencies in dependenciy array below
  }, [loadUnits]);
  // Tokens definition
  const stackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 30,
  };

  return (
    <ThemeProvider applyTo="body" theme={useDarkMode ? darkTheme : lightTheme}>
      <Stack.Item>
        <Stack tokens={stackTokens} className="frostedGlassbg2">
          <Stack.Item className="frostedGlassContainer">
            <Stack
              horizontal
              horizontalAlign="center"
              tokens={stackTokens}
              wrap
            >
              {allunits.map((unit) => (
                <Stack.Item>
                  <TutorialListItemNew tutorialUnit={unit} />
                  <br />
                  <TutorialListItemNew tutorialUnit={unit} />
                  <br />
                  <TutorialListItemNew tutorialUnit={unit} />
                </Stack.Item>
              ))}
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </ThemeProvider>
  );
};

export default observer(UnitDashboard);
