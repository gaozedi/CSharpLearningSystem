import { action, computed, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import { observable } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from '../..';
import { toast } from "react-toastify";
export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  //use this computed property to identify if the user is logged in
  @computed get isLoggedIn() {
    return !!this.user;
  }
  //for user to log in.
  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      this.user = user;
      this.rootStore.commonStore.setToken(user.token);
      console.log(user);
      toast.info("your jwt token is: "+user.token);
      history.push('/tutorialUnits');
    } catch (error) {
      throw error;
    }
  };
  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
     
        this.user = user;
      
    } catch (error) {
      console.log(error);
    }
  };
}
