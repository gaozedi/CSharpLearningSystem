import React, { useState, FormEvent, useContext } from "react";

import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

import { IUserFormValues } from "../../models/user";
import { Stack, TextField } from "@fluentui/react";
import { RootStoreContext } from "../../stores/rootStore";

const NewUIForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const sendLogin = () => {
    console.log(userEmail);
    console.log(userPassword);
    const user: IUserFormValues = {
      email: userEmail,
      password: userPassword,
    };
    login(user);
  };
  const setEmail = (e: any) => {
    setUserEmail(e.target.value);
  };
  const setPassword = (e: any) => {
    setUserPassword(e.target.value);
  };

  return (
    <Stack>
      <Stack>
        <Stack.Item grow>
          <TextField
            placeholder="Email"
            value={userEmail}
            onChange={setEmail}
          />
          <TextField
            placeholder="Password"
            value={userPassword}
            onChange={setPassword}
          />
        </Stack.Item>
        <PrimaryButton onClick={sendLogin}>Login</PrimaryButton>
      </Stack>
    </Stack>
  );
};
export default NewUIForm;
