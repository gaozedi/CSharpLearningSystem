import { IStackItemStyles, IStackStyles, IStackTokens, Stack } from '@fluentui/react'
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../stores/rootStore';
import TutorialListItemNew from './TutorialListItemNew';


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
      height: 50,
      justifyContent: "center",
    },
  };
  
  // Tokens definition
  const stackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 30,
  };

const UnitsListNew:React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { allunits,loadUnits } = rootStore.unitStore;
    useEffect(() => {
        loadUnits();
        //need to specify the dependencies in dependenciy array below
      }, [loadUnits]);
    
    return (
        <Stack horizontal horizontalAlign="center" styles={stackStyles} tokens={stackTokens} wrap >
        {allunits.map((unit)=>(
        <Stack.Item><TutorialListItemNew  tutorialUnit={unit}/></Stack.Item>
        ))}
    
      </Stack >
    )
}

export default observer(UnitsListNew)
