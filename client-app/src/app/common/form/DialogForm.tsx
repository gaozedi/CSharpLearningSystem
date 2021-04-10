import * as React from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";
import {
  PrimaryButton,
  DefaultButton,
} from "office-ui-fabric-react/lib/Button";
import { useBoolean } from "@uifabric/react-hooks";
import {
  Icon,
  mergeStyles,
  TextField,
} from "@fluentui/react";
import { IUserFormValues } from "../../models/user";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};

const dialogContentProps = {
  type: DialogType.largeHeader,
  title: "Login",
  subText:
    "Your password will NOT be stored on the server. Instead, it will be encryped using SHA-512, the most secure most secure hashing algorithm in the world",
};

const DialogForm: React.FC = () => {

  const rootStore = React.useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const sendLogin = () => {
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
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const iconClass = mergeStyles({
    fontSize: 25,
    height: 25,
    width: 25,
    margin: "0 25px",
  });

  return (
    <>
      <Icon
        // secondaryText="Opens the Sample Dialog"
        onClick={toggleHideDialog}
        className={iconClass}
        iconName="SignIn"
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <TextField
          label="Email"
          placeholder="Email"
          value={userEmail}
          onChange={setEmail}
        />
        <TextField
          label="Email"
          placeholder="Password"
          value={userPassword}
          onChange={setPassword}
        />
        <DialogFooter>
          <PrimaryButton onClick={sendLogin}>Login</PrimaryButton>
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default observer(DialogForm);
