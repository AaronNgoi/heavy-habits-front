import {createUserWithEmailAndPassword} from 'firebase/auth'
import React, { useState} from 'react';
import {auth} from '../firebase'
import BrandContainer from "../components/auth/BrandContainer";
const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) => {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'The email address is already in use by another account.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email. Please provide a valid email address.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password accounts are not enabled. Enable email/password in Firebase Console.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'The password is not strong enough. It should be at least 6 characters.';
                    break;
                default:
                    errorMessage = 'An error occurred. Please try again later.';
            }

            setError(errorMessage);
        })
    }

    return (
        <div className='landingWrapper'>
        <BrandContainer/>

        <div className='sign-up-container max-w-lg py-6 px-6 mx-auto lg:mt-12'>
            <form onSubmit = {signUp} className='standard-component flex flex-col p-8 text-lg flex flex-col gap-3 shadow-md drop-shadow-md pb-8'>
                <h1 className='text-3xl tracking-wide'> Sign Up</h1>
                <div className='flex flex-col my-2'>
                    <h3 className='text-xl'>Username</h3>
                    <input type='text' className='my-2 font-itim' placeholder = '' value ={email} onChange={(e) => setEmail(e.target.value)} />
                    <h3 className='text-xl'>Password</h3>
                    <input type='password' className='my-2' placeholder = '' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {error && <p className="">{error}</p>}
                </div>
                <button className='text-xl tracking-wide my-3 flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95' type='submit'>Sign Up</button>
            </form>
        </div>

        </div>
    )
};

export default SignUpPage