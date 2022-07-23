import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container} from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/Activity.Dashboard";
import {v4 as uuid} from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined)
  const[editMode,setEditeMode]=useState(false)

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, [])

        function handleSelectActivity(id:string){
            setSelectedActivity(activities.find(x=>x.id===id))
        }

        function handlCancelSelectActivity(){
          setSelectedActivity(undefined)
        }

        function handelFormOpen(id?:string){

          id ? handleSelectActivity(id) : handlCancelSelectActivity();
          setEditeMode(true);
        }
        function handelFormClose(){
          setEditeMode(false);
        }

        function handleCreatOrEditActivity(activity:Activity){
          activity.id
          ? setActivities([...activities.filter(x=>x.id !==activity.id),activity])
          : setActivities([...activities,{...activity,id:uuid()}]);

          setEditeMode(false);
          setSelectedActivity(activity);
        }

        function handleDeleteActivity(id:string){
          setActivities([...activities.filter(x => x.id !==id)])
        }

  return (
    <>
      <NavBar openForm={handelFormOpen}/>
      <Container style={{marginTop:"7em"}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handlCancelSelectActivity}
          editeMode={editMode}
          openForm={handelFormOpen}
          closeForm={handelFormClose}
          creatOrEdit={handleCreatOrEditActivity}
         deleteActivity={handleDeleteActivity}

        />
      </Container>
     
    </>
  );
}

export default App;
