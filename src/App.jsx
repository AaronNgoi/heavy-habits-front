import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/output.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from "./pages/SignUpPage";
import { onAuthStateChanged } from 'firebase/auth';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import ErrorPage404 from "./pages/ErrorPage404";

// import '../dist/output.css';
// import NewHabitPage from './pages/NewHabitPage';
// import EditHabitPage from './pages/EditHabitPage';
import HomePage from './pages/HomePage';
import PrivateRoutes from "./components/auth/PrivateRoutes";
import {AuthProvider} from "./context/AuthContext";
import LoadingPage from "./pages/LoadingPage";
import PetDisplay from "./components/PetDisplay";
import NewHabitPage from "./pages/NewHabitPage";
import EditHabitPage from "./pages/EditHabitPage";
import AddHistoricalRecordPage from "./pages/AddHistoricalRecordPage";
// import useLocalStorage from './hooks/useLocalStorage';
// import AddHistoricalRecordPage from './pages/AddHistoricalRecordPage';
// import ReorderHabitsPage from './pages/ReorderHabitsPage';
// import { HabitProvider } from './context/HabitContext';
// import HabitControlsContext from './context/HabitControlsContext';
// import updateExpectedDatesForPreviousDay from './helpers/updateExpectedDatesForPreviousDay';
// import addIncompleteHabitForYesterday from './helpers/addIncompleteHabitForYesterday';
// import PetDisplay from './PetDisplay';
// import ReportWeekPage from './pages/ReportWeekPage';
// import ReportMonthPage from './pages/ReportMonthPage';
// import BottomNav from './components/BottomNav';


function App() {


  return (
      // <HabitProvider value={{ habits, handleAddNewHabit, handleDelete, handleUpdate, setHabits }}>
      //   <HabitControlsContext.Provider value={{ openedControl, setOpenedControl}}>
      //     <canvas id="canvas" style={{position: 'fixed', top: '0px', left: '0px', pointerEvents: 'none', zIndex: 100, height: '100vh', width: '100%'}}></canvas>

         <AuthProvider>

          <Router>
            <div className="App">

                {/*<AuthDetails/>*/}

              <Routes>
                  {/*Public Pages*/}
                  <Route exact path="/" element={<LandingPage/>} />
                  <Route path="/signin" element={<SignInPage/>} />
                  <Route path="/signup" element={<SignUpPage/>} />
                  <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />
                  <Route path='/loading' element ={<LoadingPage/>} />
                  <Route path='*' element ={<ErrorPage404/>} />


                {/*Private Pages*/}
                  <Route element={<PrivateRoutes/>}>
                      <Route path="/home" element={<HomePage/>} />
                      <Route path="/habit/new" element={<NewHabitPage />} />
                      <Route path="/habit/:id/edit" element={<EditHabitPage />} />
                      <Route path="/habit/:id/addRecord" element={<AddHistoricalRecordPage />} />
                  </Route>


                {/*<Route exact path="/" element={<HomePage />} />*/}


                {/*<Route path="/reorderHabits" element={<ReorderHabitsPage />} />*/}
                {/*<Route path="/reportWeek" element={<ReportWeekPage />} />*/}
                {/*<Route path="/reportMonth" element={<ReportMonthPage />} />*/}
              </Routes>
            </div>
          </Router>


         </AuthProvider>

      //   </HabitControlsContext.Provider>
      // </HabitProvider>
  );
};

export default App;