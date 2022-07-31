import React from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/Activity.Dashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import TestErrors from "../../features/errors/TestError";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";




function App() {
 const location = useLocation();
 
  return (

    <>     

    <ToastContainer position="bottom-right"/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>

      
       

      <NavBar/>
      <Container style={{marginTop:"7em"}}>
          <Routes >
                <Route path='/activities' element={<ActivityDashboard/> } />
                <Route path='/activities/:id' element={<ActivityDetails/>} />
                <Route path='/createActivity' element={<ActivityForm/>} /> 
                <Route path='/manage/:id' element={<ActivityForm/>} />
                <Route path='/errors' element={<TestErrors/>} /> {/*  not done with errors handling*/}
                <Route element={<NotFound/>}/>
          </Routes>
        </Container>
        
      
    </>

   
  );
}

export default observer(App);
