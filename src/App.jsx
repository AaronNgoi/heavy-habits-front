import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/output.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import ErrorPage404 from "./pages/ErrorPage404";

import HomePage from './pages/HomePage';
import PrivateRoutes from "./components/auth/PrivateRoutes";
import {AuthProvider} from "./context/AuthContext";
import LoadingPage from "./pages/LoadingPage";
import NewHabitPage from "./pages/NewHabitPage";
import EditHabitPage from "./pages/EditHabitPage";
import AddHistoricalRecordPage from "./pages/AddHistoricalRecordPage";
import ReportWeekPage from "./pages/ReportWeekPage";
import ReportMonthPage from "./pages/ReportMonthPage";
import SettingsPage from "./pages/SettingsPage";
import ReorderHabitsPage from './pages/ReorderHabitsPage';

function App() {


  return (
         <AuthProvider>
          <Router>
            <div className="App">
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
                      <Route path="/reportWeek" element={<ReportWeekPage />} />
                      <Route path="/reportMonth" element={<ReportMonthPage />} />
                      <Route path="/settings" element={<SettingsPage/>} />
                      <Route path="/reorderHabits" element={<ReorderHabitsPage />} />


                  </Route>
              </Routes>
            </div>
          </Router>
         </AuthProvider>
  );
};

export default App;