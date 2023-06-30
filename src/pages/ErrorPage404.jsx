import React from 'react';
import { Link } from 'react-router-dom';
import BrandContainer from '../components/auth/BrandContainer';
import PetDisplay from "../components/PetDisplay";
import Header from "../components/Header";

const ErrorPage404 = () => {
    return (
        <div className="landingWrapper">
            <div className="bg-brown-pet-bg relative h-44"> </div>
            <PetDisplay/>
            <Header text='404 ERROR!' />
            <div className="flex flex-col items-center justify-center pt-28 lg:pt-36">
                <h1 className="text-3xl font-bold">404 Error!</h1>
                <p className="text-lg mt-4">Page not found</p>
                <Link to="/home">
                    <button className="text-lg mt-4 bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage404;
