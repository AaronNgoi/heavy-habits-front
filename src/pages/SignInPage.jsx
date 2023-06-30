import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { Link } from 'react-router-dom';
import React, { useState} from 'react';
import {auth} from '../firebase'
import google from '../assets/google.svg'
import BrandContainer from "../components/auth/BrandContainer";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) => {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email. Please provide a valid email address.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'User not found. Please check your email address.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password. Please check your password.';
                    break;
                default:
                    errorMessage = 'An error occurred. Please try again later.';
            }

            setError(errorMessage);
        })
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='landingWrapper'>

        <BrandContainer/>


        <div className='sign-in-container max-w-lg py-6 px-6 mx-auto'>
            <form onSubmit = {signIn} className='standard-component flex flex-col p-8 text-lg flex flex-col gap-3 shadow-md drop-shadow-md pb-8 lg:mt-12'>
                <h1 className='text-3xl tracking-wide'>Sign In</h1>
                <div className='flex flex-col my-2'>
                <h3 className='text-xl'>Username</h3>
                <input type='text' className='my-2 font-itim' placeholder = '' value ={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='flex justify-between'> <h3 className='text-xl'>Password</h3> <Link to="/forgotpassword" className='font-itim text-right flex my-auto text-sm hover:underline cursor-pointer'> <span>Forgot Password?</span> </Link></div>
                <input type='password' className='my-2' placeholder = '' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {error && <p className="">{error}</p>}
                </div>
                <button className='text-xl tracking-wide my-3 flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95' type='submit'>Sign In</button>


                <div className='flex items-center justify-center'>
                    <div className='border-t border-brown-header-bottom w-full'></div>
                    <span className='px-4 py-2 text-brown-button-press text-lg tracking-wider'>OR</span>
                    <div className='border-t border-brown-header-bottom w-full'></div>
                </div>
                <button
                    className='text-xl tracking-wide my-3 flex items-center justify-center bg-red text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full hover:bg-red-clicked hover:scale-105 hover:border-red hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95'
                    onClick={signInWithGoogle}
                >
                    <img src={google} alt="Google" className="mr-4 w-6 h-6" /> Sign in with Google
                </button>

                <Link to="/signup">
                <p className='text-center mt-4 font-itim hover:underline cursor-pointer'>
                    Don't have an account? Sign up
                </p>
                </Link>

                <p className='text-center mt-4 font-itim hover:underline cursor-pointer'>
                    Or click here for a quick demo account
                </p>

                <Link to="/home">
                    <p className='text-center mt-4 font-itim hover:underline cursor-pointer'>
                        Logged In? Click here to go to Home
                    </p>
                </Link>

            </form>
        </div>
        </div>
    )
};

export default SignInPage