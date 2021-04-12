import React, { useContext, useEffect } from "react";

//import "semantic-ui-css/semantic.min.css";
import { UnitDashboard } from "../../features/Units/dashboard/UnitDashboard";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import UnitDetails from "../../features/Units/details/UnitDetails";
import MyCompiler from "../../features/compiler/MyCompiler";
import { RootStoreContext } from "../stores/rootStore";
import LoginForm from "../../features/user/LoginForm";
import { ToastContainer } from "react-toastify";
import LoadingComponent from "./LoadingComponent";
import NewHomePage from "../NewUI/NewHomePage";
import { initializeIcons } from "@fluentui/react";
import MFQs from "../NewUI/MFQs";
import Game from "../NewUI/Game";
import VideoUnits from "../NewUI/VideoUnits";
import Notebook from "../NewUI/Notebook";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    setAppLoaded,
    token,
    appLoaded,
    setCoachMark,
  } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;
  //check if we have a token, if we have, get the user from api,
  //if we don't have a token, set the app as loaded
  //only return the app whe AppLoaded is true.
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
      initializeIcons();
      setCoachMark();
    } else {
      initializeIcons();
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token, setCoachMark]);

  if (!appLoaded) {
    return <LoadingComponent content="loading app" />;
  }

  return (
    <div>
      <ToastContainer position="top-center" />
      <Route exact path="/" component={NewHomePage} />
      <Route exact path="/newUI" component={NewHomePage} />
      <Route exact path="/tutorialunits/:id" component={UnitDetails} />
      <Route exact path="/tutorialunits" component={UnitDashboard} />
      <Route exact path="/mfqs" component={MFQs} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/videos" component={VideoUnits} />
      <Route exact path="/notebook" component={Notebook} />

      {/* when we are hitting the route with / and anything else, then the route matches*/}
      <Route
        path={"/(.+)"}
        render={() => (
          <div>
            {/* <NavBar /> */}
            <div style={{ marginTop: "7em" }}>
              {/* <Route path="/activities/:id" component={ActivityDetails} /> */}
              {/* whenever the location key changes which it dose when we navigate to create actvity 
        this component will rerender*/}
              {/* <Route path="/tutorialunits/:id" component={UnitDetails} /> */}
              {/* <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              /> */}
              <Route path="/compiler" component={MyCompiler} />
              <Route path="/login" component={LoginForm} />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default observer(App);
