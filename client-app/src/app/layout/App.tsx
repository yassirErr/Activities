import React from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/Activity.Dashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";

function App() {
 const location = useLocation();
  return (

    <>     
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>

        <Container style={{marginTop:"7em"}}>
          <NavBar/>
            <Routes>
                
                <Route path='/activities' element={<ActivityDashboard/>} />
                <Route path='/activities/:id' element={<ActivityDetails/>} />
                <Route path='/createActivity' element={<ActivityForm/>} /> 
                <Route path='/manage/:id' element={<ActivityForm/>} />
          
            </Routes>
        </Container>
    </>

   
  );
}

export default observer(App);
