import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponnet";
import { useStore } from "../../../app/Store/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";



export default observer( function ActivityDashboard() {

const{activityStore}=useStore();

useEffect(() => {
  activityStore.loadActivities();
},[activityStore])


if(activityStore.loadingInitial) return<LoadingComponent content='Loading Activities ...'/>

  return (
    <Grid>
        
      <Grid.Column width="10">
        <ActivityList/>
        
      </Grid.Column>

      <Grid.Column width="6">
      <ActivityFilters/>
      </Grid.Column>

    </Grid>
  );
})
