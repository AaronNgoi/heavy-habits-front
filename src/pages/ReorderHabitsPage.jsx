import Header from '../components/Header';
import PageWrapper from '../components/PageWrapper';
import ReorderHabits from '../components/ReorderHabits';


function ReorderHabitsPage () {

    return (
        <div>
            <Header text="REORDER HABITS" />
            <PageWrapper>
                <ReorderHabits/>
            </PageWrapper>
        </div>
    );
};

export default ReorderHabitsPage;