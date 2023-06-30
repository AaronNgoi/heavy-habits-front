import React from 'react';
import { Link } from 'react-router-dom';
import BrandContainer from '../components/auth/BrandContainer';

const LandingPage = () => {
    return (
        <div className="landingWrapper">
            <BrandContainer />

            <div className="sign-in-container  max-w-lg py-6 px-6 mx-auto lg:mt-12">
                <div className="standard-component flex flex-col p-8 text-lg flex flex-col gap-3 shadow-md drop-shadow-md pb-8">
                    <h1 className="text-3xl tracking-wide">Why Choose Heavy Habits?</h1>
                    <p className="text-lg font-itim">
                        Heavy Habits is a powerful habit tracking application designed to help you stay organized, motivated, and
                        focused on your goals. Whether you want to build healthy habits, break bad ones, or improve your overall
                        productivity, Heavy Habits has you covered.
                    </p>
                    <p className="text-lg font-itim">
                        With Heavy Habits, you can track your progress, set reminders, and gain insights into your habits. Stay
                        accountable, measure your success, and create a better version of yourself.
                    </p>


                    <div className="flex flex-col gap-4 mt-5">
                        <Link to="/signin">
                            <button className="text-xl tracking-wide flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95">
                                Get Started Now!
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;