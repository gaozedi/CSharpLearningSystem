import * as React from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import {
  Card,
  ICardTokens,
  ICardSectionStyles,
  ICardSectionTokens,
} from "@uifabric/react-cards";
import {
  FontWeights,
  Icon,
  IIconStyles,
  Image,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
} from "office-ui-fabric-react";
import { IImageProps, ImageFit } from "@fluentui/react";
import { ITutorialUnit } from "../models/unit";




interface IProps{
  tutorialUnit:ITutorialUnit
}
const TutorialListItemNew : React.FC<IProps> =({tutorialUnit})=> {
  const history = useHistory();

  const gotoDetails = (): void => {
    let path = `tutorialunits/${tutorialUnit.id}`; 
    history.push(path);
  };

    const siteTextStyles: ITextStyles = {
      root: {
        //    color: '#025F52',
        fontWeight: FontWeights.semibold,
      },
    };
    const descriptionTextStyles: ITextStyles = {
      root: {
        //   color: '#333333',
        fontWeight: FontWeights.regular,
      },
    };
    const helpfulTextStyles: ITextStyles = {
      root: {
        //    color: '#333333',
        fontWeight: FontWeights.regular,
      },
    };
    const iconStyles: IIconStyles = {
      root: {
        color: "#0078D4",
        fontSize: 16,
        fontWeight: FontWeights.regular,
      },
    };
    const footerCardSectionStyles: ICardSectionStyles = {
      root: {
        alignSelf: "stretch",
        borderLeft: "1px solid #F3F2F1",
      },
    };

    const sectionStackTokens: IStackTokens = { childrenGap: 20 };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens: ICardSectionTokens = {
      padding: "0px 0px 0px 12px",
    };
    const imageProps: Partial<IImageProps> = {
      imageFit: ImageFit.contain,
      width: 75,
      height: 75,
      
    };
    return (


      <Stack tokens={sectionStackTokens}>
        {/* <Card aria-label="Basic horizontal card" horizontal tokens={cardTokens}>
          <Card.Item>
            <Text>Basic horizontal card</Text>
          </Card.Item>
        </Card> */}

        <Card
          aria-label="Clickable horizontal card "
          horizontal
          onClick={gotoDetails}
          tokens={cardTokens}
        >
          <Card.Item align="center">
            <Image
              // width={75}
              // height={110}
              src="/assets/next.png"
              alt="Placeholder image."
              {...imageProps}
            />
          </Card.Item>
          <Card.Section>
            <Text variant="medium" styles={siteTextStyles}>
              Tutorial {tutorialUnit.id}
            </Text>
            <Text styles={descriptionTextStyles}>
              {tutorialUnit.content} {tutorialUnit.content}
            </Text>
            <Text variant="small" styles={helpfulTextStyles}>
              some test test test test content 
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
      </Stack>
    );
  }

export default observer(TutorialListItemNew);