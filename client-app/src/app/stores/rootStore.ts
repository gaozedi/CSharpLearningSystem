import { createContext } from 'react';
import CommonStore from './commonStore';
import UnitStore from './unitStore';
import UserStore from './userStore';

export class RootStore{
    unitStore:UnitStore;
    userStore:UserStore;
    commonStore: CommonStore;
    constructor(){
        //pass this root store to ActivityStore
        this.unitStore = new UnitStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());