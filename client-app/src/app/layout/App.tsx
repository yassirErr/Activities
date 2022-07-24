import React, { useEffect, useState } from "react";
import { Container} from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/Activity.Dashboard";
import {v4 as uuid} from 'uuid'
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponnet";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined)
  const[editMode,setEditeMode]=useState(false)
  const[Loading,setLoading]=useState(true); 
  const[submitting,setSubmitting] = useState(false);



  useEffect(() => {
    agent.Activities.list().then(response => {
       //bring the date formate without time 
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
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
          setSubmitting(true);
          if (activity.id) {
            agent.Activities.update(activity).then(() => {
              setActivities([...activities.filter(x => x.id !== activity.id), activity])
              setSelectedActivity(activity);
              setEditeMode(false);
              setSubmitting(false);
            })
          }else{
            activity.id=uuid();
            agent.Activities.create(activity).then(()=>{
              setActivities([...activities,activity])
              setSelectedActivity(activity);
              setEditeMode(false);
              setSubmitting(false);
            })
          }
        }


        function handleDeleteActivity(id:string){
          setSubmitting(true)
          agent.Activities.delete(id).then(()=>{
            setActivities([...activities.filter(x => x.id !==id)])
            setSubmitting(false)
          })
          
        }

if(Loading) return<LoadingComponent content='Loading App'/>

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
         submitting={submitting}

        />
      </Container>
     
    </>
  );
}

export default App;
