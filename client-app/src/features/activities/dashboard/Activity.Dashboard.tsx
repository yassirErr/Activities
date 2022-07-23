import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity:Activity|undefined;
  selectActivity:(id:string)=>void;
  cancelSelectActivity:()=>void;
  editeMode:boolean;
  openForm:(id:string)=>void;
  closeForm:()=>void;
  creatOrEdit:(activity:Activity)=>void;
  deleteActivity:(id:string)=>void;
}

export default function ActivityDashboard({ 
    activities,selectedActivity,selectActivity,
    cancelSelectActivity ,editeMode,openForm,closeForm ,creatOrEdit,deleteActivity}: Props) {
  return (
    <Grid>
        
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
      </Grid.Column>

      <Grid.Column width="6">
        {selectedActivity && !editeMode &&
        <ActivityDetails 
        activity={selectedActivity} 
        cancelSelectActivity={cancelSelectActivity}
        openForm={openForm}
        
        />}
        
        {editeMode &&
        <ActivityForm closeForm={closeForm} activity={selectedActivity} creatOrEdit={creatOrEdit} />}
      </Grid.Column>

    </Grid>
  );
}
