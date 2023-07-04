import React from 'react';
import { Link} from 'react-router-dom';
import Header from '../components/Header';
import AddHistoricalRecord from '../components/AddHistoricalRecord';
import { useParams } from 'react-router-dom';
import BackIcon from '../assets/back_icon.svg';
import PageWrapper from '../components/PageWrapper';

const AddHistoricalRecordPage = () => {
    const { id } = useParams();

    return (
        <div>
            <Header text="ADD RECORD" />
            <PageWrapper>
                    <div className="px-6">
                        <div className="pt-3 pb-6 flex">

                            <Link to="/home" className=''>
                                <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF py-2 px-4 border-brown-font border-2 rounded-22px active:bg-brown-button-press active:scale-95 hover:bg-brown-button-press">
                                    <img src= {BackIcon} alt="Back" className="h-5 w-5 inline-block"/>
                                    <span className="ml-2">Back</span>

                                </button>
                            </Link>

                        </div>
                        <AddHistoricalRecord habitId={id} className="standard-page" />
                    </div>
            </PageWrapper>
        </div>
    );
};

export default AddHistoricalRecordPage;



