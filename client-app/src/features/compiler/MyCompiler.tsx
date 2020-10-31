import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Icon,
  Message,
  Rating,
  Segment,
} from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import UnitStore from "../../app/stores/unitStore";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { ICode } from "../../app/model/code";

const MyCompiler: React.FC = () => {
  const [code] = useState<ICode>();
  const store = useContext(UnitStore);
  const {
    compiledResult,
    compileCode,
    AICodeInspectAction,
    inspectResult,
  } = store;

  // const handleInputChange = (event: any) => {
  //   // const { name, value } = event.currentTarget;
  //   setCode(event.target.value);
  // };

  // const handleSubmit = () => {
  //   console.log(code);
  //   store.compileCode(code);
  //   //setRefresher(!refresher);
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values.codeStr);
    compileCode(values);
    AICodeInspectAction(values);
  };
  return (
    <Segment clearing>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        //handleSubmit is from render not we defined before
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="codeStr"
              //   onChange={handleInputChange}
              placeholder="Code input here"
              rows={3}
              value={code?.codeStr}
              component={TextAreaInput}
            />
            <Button
              //onClick={() => setRefresher(!refresher)}
              floated="right"
              type="submit"
              content="Compile!"
              color="linkedin"
            />
          </Form>
        )}
      />
      <br />
      <p>
        your code: <code>{code}</code>
      </p>

      <Message icon>
        <Icon name="bug" loading />
        <Message.Content>
          <Message.Header>AI code inspection running</Message.Header>
          Malicious Code Probability:{inspectResult?.score}
        </Message.Content>
        {inspectResult !== undefined && (
          <Rating
            icon="heart"
            defaultRating={10 - Math.floor(inspectResult.score * 10)}
            maxRating={10}
            size="large"
          />
        )}
      </Message>

      <Message
        success
        icon="inbox"
        header=" Compiled Result:"
        content={compiledResult}
      />
    </Segment>
  );
};
export default observer(MyCompiler);
