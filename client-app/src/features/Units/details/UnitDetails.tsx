import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {  Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import unitStore from "../../../app/stores/unitStore";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vs} from 'react-syntax-highlighter/dist/esm/styles/prism'
//import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MyCompiler from "../../compiler/MyCompiler";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}
interface IProps {
  language: any;
  value:any;
  // any other props that come into the component
}

//use interface DetailParams to specify the route parameter is "id", otherwise we can't `use match.params.id`
const UnitDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  //we can set a alia by using ":"
  const { unit, loadOneUnit, loadingInitial } = rootStore.unitStore;

  const renderers = {
    code: ({language, value}:IProps) => {
      return <SyntaxHighlighter style={vs} language={language} children={value} />
    }
  }
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
`
  useEffect(() => {
    loadOneUnit(match.params.id);
    //pass loadActivity as dependency so the useEffect run only once.
  }, [loadOneUnit,match.params.id]);
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
    <Segment>
      
 
 
    <ReactMarkdown plugins={[gfm]} renderers={renderers} children={markdown} />
    <MyCompiler />
<Segment clearing basic >
  
<Button floated="right" circular color='facebook' icon='facebook' />
    <Button floated="right" circular color='twitter' icon='twitter' />
    <Button floated="right" circular color='linkedin' icon='linkedin' />
    <Button floated="right" circular color='google plus' icon='google plus' />
</Segment>
    </Segment>
  );
};

export default observer(UnitDetails);
