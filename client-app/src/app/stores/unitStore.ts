import { IMFQAnswer } from "./../models/code";
import { RootStore } from "./rootStore";
import { IInspectResult } from "../models/inspectResult";
import { ICode } from "../models/code";
import { ITutorialUnit } from "../models/unit";
import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

//configure({ enforceActions: "always" });

export default class UnitStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable allunits: ITutorialUnit[] = [];
  @observable unit: ITutorialUnit | undefined = undefined;
  //observable for loading indicator
  @observable loadingInitial = false;

  // @observable unitsRegistry = new Map();
  @observable compiledResult = "";
  @observable inspectResult: IInspectResult | undefined = undefined;
  @observable MFQResult = "";
  @observable.ref hubConnection: HubConnection | null = null;
  @observable signal = "";
  @observable beat_user = "";
  @observable fightResult = "";
  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/signal", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .catch((error) => console.log("Error establishing connection:", error));
    this.hubConnection.on("ReceiveSignal", (signal) => {
      this.signal = signal;
    });
    this.hubConnection.on("ReceiveHeartbeat", (beat) => {
      this.beat_user = beat;
    });
    this.hubConnection.on("ReceiveFight", (result) => {
      this.fightResult = result;
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection!.stop();
  };

  @action sendSignal = async (values: any) => {
    try {
      //SendComment needs to match excatlt in ChatHub
      await this.hubConnection!.invoke("SendSignal", values);
    } catch (error) {
      console.log(error);
    }
  };

  @action sendFightStart = async () => {
    try {
      //SendComment needs to match excatlt in ChatHub
      await this.hubConnection!.invoke("SendFight");
    } catch (error) {
      console.log(error);
    }
  };


  @action sendHeartbeat = async (values: any) => {
    try {
      //SendComment needs to match excatlt in ChatHub
      await this.hubConnection!.invoke("SendHeartbeat", values);
    } catch (error) {
      console.log(error);
    }
  };
  @action loadUnits = async () => {
    try {
      const units = await agent.TutorialUnits.list();
      runInAction("loading units", () => {
        units.forEach((item) => {
          this.allunits.push(item);
          console.log(item.content);
        });
      });
    } catch (error) {
      runInAction("error", () => {
        console.log(error);
      });
    }
    // .then(() => console.log("from store:" + this.unitsRegistry.get(0)))
    //    .finally(() => (this.loadingInitial = false));
  };




  @action loadOneUnit = async (id: string) => {
    //if the user is from DashBoard, we can get an activity by calling method below
    let unit = this.getUnit(id);
    if (unit) {
      // can get the unit locally, just set this to selected unit.
      this.unit = unit;
    } else {
      //we can't get an unit, have to call the API
      this.loadingInitial = true;
      try {
        unit = await agent.TutorialUnits.details(id);
        runInAction("gettting unit from server", () => {
          this.unit = unit;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("get activity error", () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  //helper method, don't need to be an action because not mutating states
  getUnit = (id: string) => {
    return this.allunits.find((a) => a.id === id);
  };

  @action compileCode = async (code: ICode) => {
    try {
      this.compiledResult = await agent.TutorialUnits.compile(code);
      runInAction("logging", () => {
        console.log(this.compiledResult);
      });
    } catch (error) {
      runInAction("error", () => {
        console.log(error);
      });
    }
  };

  @action AICodeInspectAction = async (code: ICode) => {
    try {
      this.inspectResult = await agent.TutorialUnits.AICodeInspect(code);
      runInAction("logging", () => {
        console.log(Math.ceil(this.inspectResult!.score * 10));
      });
    } catch (error) {
      runInAction("error", () => {
        console.log(error);
      });
    }
  };

  @action AIMFQAction = async (answer: IMFQAnswer) => {
    try {
      this.MFQResult = await agent.TutorialUnits.AIMFQ(answer);
      // runInAction("logging", () => {
      //   console.log(Math.ceil(this.inspectResult!.score * 10));
      // });
    } catch (error) {
      runInAction("error", () => {
        console.log(error);
      });
    }
  };
}

//export default createContext(new UnitStore());
