import { observer } from "mobx-react-lite";
import React, {useContext, useState } from "react";
import { Button, Divider, Form, Label, Message, Segment } from "semantic-ui-react";
import UnitStore from "../../app/stores/unitStore";

export const MyCompiler = () => {
  const [code, setCode] = useState("");
  const store = useContext(UnitStore);
  const { compiledResult } = store;
  const [refresher, setRefresher] = useState(false);

  const handleInputChange = (event: any) => {
    // const { name, value } = event.currentTarget;
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    console.log(code);
    store.compileCode(code);
    //setRefresher(!refresher);
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.TextArea
          onChange={handleInputChange}
          rows={2}
          placeholder="Code input here"
        />
        <Button
          //onClick={() => setRefresher(!refresher)}
          floated="right"
          type="submit"
          content="Compile!"
          color="linkedin"
        />
      </Form>
     <br/>
  <p>your code: <code>{code}</code></p>
      <Message success icon="inbox" header=" Compiled Result:" content={compiledResult} />
     
      <br/>
    </Segment>
  );
};
export default observer(MyCompiler);
