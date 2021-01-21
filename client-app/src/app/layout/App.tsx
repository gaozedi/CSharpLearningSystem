import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
//import "semantic-ui-css/semantic.min.css";
import NavBar from "../../features/nav/NavBar";
import { UnitDashboard } from "../../features/Units/dashboard/UnitDashboard";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import UnitDetails from "../../features/Units/details/UnitDetails";
import MyCompiler from "../../features/compiler/MyCompiler";
import { RootStoreContext } from "../stores/rootStore";
import LoginForm from "../../features/user/LoginForm";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoadingComponent from "./LoadingComponent";
import NewHomePage from "../NewUI/NewHomePage";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token,appLoaded,setCoachMark } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;
  //check if we have a token, if we have, get the user from api,
  //if we don't have a token, set the app as loaded
  //only return the app whe AppLoaded is true.
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
setCoachMark();
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) {
    return <LoadingComponent content='loading app'/>
  }
  

  return (
    <Fragment>
      <ToastContainer position='top-center'/>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/newUI" component={NewHomePage} />
      <Route exact path="/tutorialunits/:id" component={UnitDetails} />
      {/* when we are hitting the route with / and anything else, then the route matches*/}
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            {/* <NavBar /> */}
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/tutorialunits" component={UnitDashboard} />
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
               {/* <Route component={NotFound} /> */}
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
