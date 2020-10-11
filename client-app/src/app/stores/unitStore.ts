import { ITutorialUnit } from "./../model/unit";
import { action, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class UnitStore {
  @observable allunits: ITutorialUnit[] = [];
  @observable title = "hello from mobx";
  @observable loadingInitial = false;
  @observable unitsRegistry = new Map();

  @action loadUnits =  () => {
    //start the loading indicator
    this.loadingInitial = true;
    agent.TutorialUnits.list()
      .then(units => {
        units.forEach((unit) => {
       //   this.unitsRegistry.set(unit.id,unit)
         this.allunits.push(unit)
        });
      })
     .then(() => console.log("from store:" + this.unitsRegistry.get(0)))
      .finally(() => (this.loadingInitial = false));
  };
}
export default createContext(new UnitStore());
