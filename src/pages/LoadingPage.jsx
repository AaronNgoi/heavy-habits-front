import PetDisplay from "../components/PetDisplay";
import React from "react";
import Header from "../components/Header";

const LoadingPage = () => {
    return (
        <div className="landingWrapper">
            <div className="bg-brown-pet-bg relative h-44"> </div>
            <PetDisplay/>
            <Header text="LOADING..." />
            <div className="sign-in-container max-w-lg py-6 px-6 mx-auto lg:mt-12">
                <div className="standard-component flex flex-col p-8 text-lg flex flex-col gap-3 shadow-md drop-shadow-md pb-8">
                    <h1 className="text-3xl tracking-wide">Loading...</h1>
                    <p className="text-lg font-itim">
                        Please wait while we prepare Heavy Habits for you.
                    </p>
                    <div className="flex justify-center items-center mt-5">
                        <div className="animate-spin rounded-full rounded-max h-8 w-8 border-b-2 border-r-2 border-green"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;
