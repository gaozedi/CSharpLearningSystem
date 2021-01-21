import { action, reaction } from "mobx";
import { observable } from "mobx";
import { RootStore } from "./rootStore";
export default class CommonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      // what is we want to react on
      () => this.token,
      //what we want to do when the token changed
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @observable token: string | null = window.localStorage.getItem('jwt');
  @observable useDarkMode = false;
  @observable showCoachMark = false;
  @observable appLoaded = false;
  @action setToken = (token: string | null) => {
    //we do not neet to set token here
    // window.localStorage.setItem("jwt", token!);
    this.token = token;
  };
  @action setDarkMode=()=>{
    this.useDarkMode = ! this.useDarkMode;
  };
  @action setCoachMark=()=>{
    this.showCoachMark = ! this.showCoachMark;
  };
  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
