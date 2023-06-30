import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import BrandContainer from "../components/auth/BrandContainer";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');

    const sendResetEmail = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setEmailSent(true);
            })
            .catch((error) => {
                let errorMessage = '';
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email. Please provide a valid email address.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'User not found. Please check your email address.';
                        break;
                    default:
                        errorMessage = 'An error occurred. Please try again later.';
                }

                setError(errorMessage);
            });
    };

    return (
        <div className='landingWrapper'>

            <BrandContainer/>

            <div className='sign-in-container max-w-lg py-6 px-6 mx-auto'>
                <form onSubmit={sendResetEmail} className='standard-component flex flex-col p-8 text-lg flex flex-col gap-3 shadow-md drop-shadow-md pb-8 lg:mt-12'>
                    <h1 className='text-3xl tracking-wide'>Forgot Password?</h1>
                    {!emailSent ? (
                        <>
                            <div className='flex flex-col my-2'>
                                <h3 className='text-xl'>Email</h3>
                                <input
                                    type='text'
                                    className='my-2 font-itim'
                                    placeholder=''
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {error && <p className="">{error}</p>}
                            <button
                                className='text-xl tracking-wide my-3 flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95'
                                type='submit'
                            >
                                Reset Password
                            </button>
                        </>
                    ) : (
                        <div className='flex flex-col'>
                            <p className='text-center mt-4 mb-3'>Password reset email has been sent to {email}. Check your inbox!</p>
                            <Link to='/login' className='text-xl tracking-wide my-3 flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95'>
                                Return to Login
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
