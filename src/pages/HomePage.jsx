import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import ShrunkHabitTracker from '../ShrunkHabitTracker';
// import { useHabits } from '../context/HabitContext';
import Header from "../components/Header";

import PageWrapper from '../components/PageWrapper';
import AddHabitIcon from '../assets/add_habit_icon.svg';
import ShrinkIcon from '../assets/shrink.svg';
import ExpandIcon from '../assets/expand.svg';


const HomePage = () => {
    return (
        <div className="">
        <Header text="TRACKER - TODAY" />
<PageWrapper>

            <div>
                Back Button

            </div>

    <Link to="/habit/new">
    <div>
        Go to new habits test
    </div>
    </Link>

            <div>
                Habits Mapped out here!

            </div>
</PageWrapper>
        </div>
    );
};

export default HomePage;