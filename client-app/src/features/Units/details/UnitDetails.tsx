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
  initializeIcons,
  IStackStyles,
  IStackTokens,
  ProgressIndicator,
  Stack,
} from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { darkTheme, lightTheme } from "../../../themes";

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
    initializeIcons();
    loadOneUnit(match.params.id);
    //pass loadActivity as dependency so the useEffect run only once.
  }, [loadOneUnit, match.params.id]);
  //check if it's loading or the activity is undefined
  if (loadingInitial || !unit)
    return <LoadingComponent content="Loading one unit..." />;

  return (
    // <Card fluid>
    //   {/* we use ! mark to tell TS we won't get null here */}
    //   {/* <Image
    //     src={`/assets/logo.png`}
    //     wrapped
    //     ui={false}
    //   /> */}
    //   <Card.Content>
    //     <Card.Header>{unit!.id}</Card.Header>
    //     <Card.Meta>
    //       <span>{unit!.content}</span>
    //     </Card.Meta>
    //     <Card.Description>{unit!.content}</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths={2}>

    //       {/* <Button
    //         onClick={() => openEditForm(activity!.id)}
    //         basic
    //         color="blue"
    //         content="Edit"
    //       />
    //     */}
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
    <ThemeProvider applyTo="body" theme={useDarkMode ? darkTheme : lightTheme}>
      <NavBarNew />
      <ProgressIndicator />
      <Stack styles={stackStyles} tokens={stackTokens} wrap>
        <Stack.Item>
          <ReactMarkdown
            plugins={[gfm]}
            renderers={renderers}
            children={markdown}
          />
        </Stack.Item>
        <Stack.Item>
          <MyCompiler />
        </Stack.Item>
      </Stack>
    </ThemeProvider>
  );
};

export default observer(UnitDetails);
