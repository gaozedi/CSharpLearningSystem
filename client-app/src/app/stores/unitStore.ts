import { ITutorialUnit } from "./../model/unit";
import { action, configure, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { createContext } from "react";

//configure({ enforceActions: "always" });

class UnitStore {
  @observable allunits: ITutorialUnit[] = [];
  @observable unit: ITutorialUnit | undefined = undefined;

  //observable for loading indicator
  @observable loadingInitial = false;
  @observable title = "Test for mobx";
  // @observable unitsRegistry = new Map();
  @observable compiledResult = "";

  @action loadUnits = async () => {
    try {
      const units = await agent.TutorialUnits.list();
      runInAction("loading units", () => {
        units.forEach((item) => {
          this.allunits.push(item);
        });
      });
    } catch (error) {
      runInAction("error", () => {});
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
      //we can't get an activity, have to call the API
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
    return this.allunits.find((a) => a.id == id);
  };

  @action compileCode = async (code: string) => {
    try {
      this.compiledResult = await agent.TutorialUnits.compile(code);
      runInAction("logging",()=>{
        console.log(this.compiledResult);
      });
     
    } catch (error) {
      runInAction("error", () => {});
    }
  };
}
export default createContext(new UnitStore());
