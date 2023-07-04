import React from 'react';
import Header from '../components/Header';
import PageWrapper from '../components/PageWrapper';
import ReportMonth from '../components/ReportMonth';


function ReportMonthPage () {

    return (
        <div>
            <Header text="REPORT - MONTHLY" />
            <PageWrapper>
                <ReportMonth/>
            </PageWrapper>
        </div>
    );
};

export default ReportMonthPage;