import React, { useEffect, useState } from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/Activity.Dashboard";
import LoadingComponent from "./LoadingComponnet";
import { useStore } from "../Store/store";
import { observer } from "mobx-react-lite";

function App() {
  const {activityStore} = useStore();


  useEffect(() => {
    activityStore.loadActivities();
  },[activityStore])


if(activityStore.loadingInitial) return<LoadingComponent content='Loading App'/>

  return (
    <>
      <NavBar/>
      <Container style={{marginTop:"7em"}}>
        <ActivityDashboard />
      </Container>
     
    </>
  );
}

export default observer(App);
