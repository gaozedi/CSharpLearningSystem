import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
//import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MyCompiler from "../../compiler/MyCompiler";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {
  Breadcrumb,
  DefaultPalette,
  IBreadcrumbItem,

  IStackItemStyles,
  IStackStyles,
  IStackTokens,
  ProgressIndicator,
  Stack,
} from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { darkTheme, lightTheme } from "../../../themes";
import { Text } from "office-ui-fabric-react/lib/Text";
import NavBarNew from "../../nav/NavBarNew";

interface DetailParams {
  id: string;
}
interface IProps {
  language: any;
  value: any;
  // any other props that come into the component
}

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    //background: DefaultPalette.themeTertiary,
  },
};

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 30,
};


const itemsWithHref: IBreadcrumbItem[] = [
  // Normally each breadcrumb would have a unique href, but to make the navigation less disruptive
  // in the example, it uses the breadcrumb page as the href for all the items
  { text: "Home", key: "Files", href: "/NewUI" },
  { text: "C# Learning", key: "f3", href: "/NewUI" },
  { text: "Tutorial Units", key: "f1", href: "#/controls/web/breadcrumb" },
  {
    text: "Tutorial Unit 1",
    key: "f2",
    href: "#",
    isCurrentItem: true,
  },
  // { text: 'Folder 3', key: 'f3', href: '#/controls/web/breadcrumb' },
  // { text: 'Folder 4 (non-clickable)', key: 'f4' },
  // { text: 'Folder 5', key: 'f5', href: '#/controls/web/breadcrumb'},
];

//use interface DetailParams to specify the route parameter is "id", otherwise we can't `use match.params.id`
const UnitDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  //we can set a alia by using ":"
  const { unit, loadOneUnit, loadingInitial } = rootStore.unitStore;
  const { useDarkMode } = rootStore.commonStore;
  const renderers = {
    code: ({ language, value }: IProps) => {
      return (
        <SyntaxHighlighter
          style={useDarkMode ? vscDarkPlus : vs}
          language={language}
          children={value}
        />
      );
    },
  };
  const markdown = `## Demo Unit

#### Using Delegates with Covariant Type Parameters

The following example illustrates the benefits of covariance support in the generic **Func** delegates. The **FindByTitle** method takes a parameter of the \`String\` type and returns an object of the \`Employee\` type. However, you can assign this method to the \`Func<String, Person>\` delegate because \`Employee\` inherits \`Person\`.

~~~cs
// Simple hierarchy of classes. 
using System;
public class Person { }
public class Employee : Person { }
class Program
{
    static Employee FindByTitle(String title)
    {
        // This is a stub for a method that returns 
        // an employee that has the specified title. 
        return new Employee();
    }
    static void Test()
    {
        // Create an instance of the delegate without using variance. 
        Func<String, Employee> findEmployee = FindByTitle;
        
        
        // The delegate expects a method to return Person, 
        // but you can assign it a method that returns Employee. 
        Func<String, Person> findPerson = FindByTitle;
        
        // You can also assign a delegate  
        // that returns a more derived type  
        // to a delegate that returns a less derived type. 
        findPerson = findEmployee;
    }
}
~~~
`;
  useEffect(() => {

    loadOneUnit(match.params.id);
    //pass loadActivity as dependency so the useEffect run only once.
  }, [loadOneUnit, match.params.id]);
  //check if it's loading or the activity is undefined
  if (loadingInitial || !unit)
    return <LoadingComponent content="Loading one unit..." />;

  return (
    <ThemeProvider applyTo="body" theme={useDarkMode ? darkTheme : lightTheme}>
      <NavBarNew />
      <ProgressIndicator />

      <Stack styles={stackStyles} tokens={stackTokens} wrap>
        <Stack.Item>
          <Stack horizontal horizontalAlign="space-between">
            <Stack.Item>
              <Breadcrumb
                items={itemsWithHref}
                maxDisplayedItems={3}
                ariaLabel="Breadcrumb with items rendered as links"
                overflowAriaLabel="More links"
              />
            </Stack.Item>
            <Stack.Item>
              <Text variant="xxLargePlus">
                &nbsp;&nbsp;&nbsp;&nbsp;Tutorial Unit 1
              </Text>
            </Stack.Item>
          </Stack>
        </Stack.Item>
        {/* <Stack.Item styles={stackItemStyles}>
          <Text variant="xxLargePlus">
            &nbsp;&nbsp;&nbsp;&nbsp;Tutorial Unit 1
          </Text>
        </Stack.Item> */}
        <Stack.Item>
          <ReactMarkdown
            plugins={[gfm]}
            renderers={renderers}
            children={markdown}
          />
        </Stack.Item>

        <Stack.Item className="frostedGlassbg">
          <div className="frostedGlassContainer2">
            <MyCompiler />
          </div>
        </Stack.Item>
      </Stack>

      <Stack
        horizontal
        style={{
          paddingLeft: "12%",
          background: "rgb(204, 230, 255)",
        }}
        gap="12%"
        wrap
      >
        <Stack.Item grow={4}>
          <Text style={{ fontSize: 50, fontWeight: 500, paddingLeft: "5%" }}>
            C# Learning
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
    </ThemeProvider>
  );
};

export default observer(UnitDetails);
