import {
  CompoundButton,
  IStackTokens,
  Rating,
  RatingSize,
  Stack,
  TextField,
  Image,
  ProgressIndicator,
} from "@fluentui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { ICode } from "../../app/models/code";
import { RootStoreContext } from "../../app/stores/rootStore";
import {
  Card,
  ICardTokens,
  ICardSectionTokens,
  ICardSectionStyles,
} from "@uifabric/react-cards";
import {
  FontWeights,
  Icon,
  IIconStyles,
  Text,
  ITextStyles,
} from "office-ui-fabric-react";
import { GooSpinner } from "react-spinners-kit";
import NavBarNew from "../../features/nav/NavBarNew";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 30,
};

const MFQs: React.FC = () => {
  const [code, setCode] = useState("");
  const store = useContext(RootStoreContext);
  const { compileCode, AICodeInspectAction } = store.unitStore;

  const alertClicked = (): void => {
    alert("Clicked");
  };
  const hanldeCodeChange = (e: any) => {
    setCode(e.target.value);
  };
  const iconStyles: IIconStyles = {
    root: {
      fontSize: "24px",
      height: "24px",
      width: "24px",
    },
  };
  const sectionStackTokens: IStackTokens = { childrenGap: 20 };
  const cardTokens: ICardTokens = { childrenMargin: 12 };
  const footerCardSectionTokens: ICardSectionTokens = {
    padding: "0px 0px 0px 12px",
  };

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
  const helpfulTextStyles: ITextStyles = {
    root: {
      color: "#333333",
      fontWeight: FontWeights.regular,
    },
  };

  const footerCardSectionStyles: ICardSectionStyles = {
    root: {
      alignSelf: "stretch",
      borderLeft: "1px solid #F3F2F1",
    },
  };

  return (
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
          <Text variant="small" styles={siteTextStyles}>
            Contoso
          </Text>
          <Text styles={descriptionTextStyles}>
            Contoso Denver expansion design marketing hero guidelines
          </Text>
          <TextField></TextField>
          <Text variant="small" styles={helpfulTextStyles}>
            Is this recommendation helpful?
          </Text>
        </Card.Section>
        <Card.Section
          styles={footerCardSectionStyles}
          tokens={footerCardSectionTokens}
        >
          <Icon iconName="RedEye" styles={iconStyles} />
          <Icon iconName="SingleBookmark" styles={iconStyles} />
          <Stack.Item grow={1}>
            <span />
          </Stack.Item>
          <Icon iconName="MoreVertical" styles={iconStyles} />
        </Card.Section>
      </Card>

  );
};
export default observer(MFQs);
