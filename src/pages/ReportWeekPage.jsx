import React, {useState} from 'react';
import Header from '../components/Header';
import PageWrapper from '../components/PageWrapper';
import ReportWeek from '../components/ReportWeek';



function ReportWeekPage () {

    return (
        <div>
            <Header text="REPORT - WEEKLY" />
            <PageWrapper>
                <ReportWeek/>
            </PageWrapper>
        </div>
    );
};

export default ReportWeekPage;