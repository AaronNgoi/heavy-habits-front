import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import {collection, doc, writeBatch, getDocs} from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import {useHabits} from "../context/HabitsContext";
import { SettingsContext } from '../context/SettingsContext';
import { Tooltip } from 'react-tooltip'
import { toastSuccess } from '../helpers/toastSuccess';


import '../styles/button.css';

const Settings = () => {
    const { habitsCount } = useHabits()
    const { soundEffects, setSoundEffects, todaysHabitsOnly, setTodaysHabitsOnly } = useContext(SettingsContext);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    const currentUser = auth.currentUser;
    const initial = currentUser?.email.charAt(0).toUpperCase();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            toastSuccess('You have successfully logged out! Hope to see you again :)')
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (currentUser) {
                // Reference to the habits subcollection
                const habitsRef = collection(db, 'users', currentUser.uid, 'habits');

                // Get all habits for the current user
                const habitSnapshot = await getDocs(habitsRef);
                const habitDocs = habitSnapshot.docs;

                // Create a batch
                const batch = writeBatch(db);

                // Delete each habit
                for (let habitDoc of habitDocs) {
                    batch.delete(habitDoc.ref);
                }

                // Delete the user document
                const userDoc = doc(db, 'users', currentUser.uid);
                batch.delete(userDoc);

                // Commit the batch
                await batch.commit();

                // Delete the user account
                await deleteUser(currentUser);
                console.log("User account and associated Firestore document deleted successfully.");
                toastSuccess('We\'ve successfully deleted your account and any associated data.')
            } else {
                console.log("No user is currently signed in.");
            }
        } catch (error) {
            console.error("Error deleting user account and associated Firestore document:", error);
        }

        // Then close the modal
        setShowDeleteConfirmationModal(false);
    };

    const showDeleteModal = () => {
        setShowDeleteConfirmationModal(true);
    };

    return (
        <>
        <div className="standard-component p-8 text-lg flex flex-col gap-4 shadow-md drop-shadow-md pb-8">
            <div className='flex flex-row items-center'>

                <div className='mr-4 flex-shrink-0 w-14 h-14 flex align-center bg-biege-background items-center justify-center text-2xl rounded-full'>
                    {initial}
                </div>

            <div className='flex flex-col whitespace-nowrap overflow-clip overflow-ellipsis'>
            <div className="flex items-center justify-between ">
                <p className='whitespace-nowrap overflow-clip overflow-ellipsis text-lg'>{currentUser?.email}</p>
            </div>

            <div className='text-brown-add-button font-itim text-lg'>
                {habitsCount === 0 ? "No Habits yet" :
                    habitsCount === 1 ? "1 Habit" : `${habitsCount} Habits`}
            </div>
            </div>

            </div>

            <hr className="my-4 border-brown-add-button" />

            <div>
                <Link to="/reorderhabits">
                    <button className="flex items-center text-lg justify-center bg-orange-button text-brown-font py-1 px-3 rounded-2xl border-brown-component rounded-22px border-2 active:bg-orange-button-click transition-all duration-100 hover:bg-orange-button-click">Re-Order Habits</button>
                </Link>


                <div className="flex items-center w-full mt-4">
                    <label className='flex justify-between w-full items-center'>
                        <span>Sound Effects</span>


                        <div className="toggle-button-cover ">
                            <div className="button-cover">
                                <div className="button r" id="button-3">
                                    <input type="checkbox" className="checkbox"  checked={!soundEffects}
                                           onChange={() => setSoundEffects(!soundEffects)}
                                    />
                                    <div className="knobs"></div>
                                    <div className="layer"></div>
                                </div>
                            </div>
                        </div>


                    </label>
                </div>


                <div className="flex items-center w-full mt-3">
                    <label className='flex justify-between w-full items-center'>
                        <div className="flex justify-center tool-tooltip" data-tooltip-delay-show="600" data-tooltip-id="todays-habits-tooltip" data-tooltip-content="Selecting this option filters your view to only include the habits due for completion today. If a habit, designed to be fulfilled 3 times a week, has been accomplished 3 times within the week, it disappears until the following Monday. Likewise, habits designated for Tuesdays will only appear on Tuesdays.">
                            <span>Expected Habits Only</span>
                            <Tooltip id="todays-habits-tooltip" place="top" effect="solid" className="custom-tooltip" classNameArrow="custom-tooltip-arrow" border='1px solid #A97A40' opacity='1'/>
                        </div>
                        <div className="toggle-button-cover ">
                            <div className="button-cover">
                                <div className="button r" id="button-3">
                                    <input type="checkbox" className="checkbox" checked={!todaysHabitsOnly}
                                           onChange={() => setTodaysHabitsOnly(!todaysHabitsOnly)}
                                    />
                                    <div className="knobs"></div>
                                    <div className="layer"></div>
                                </div>
                            </div>
                        </div>


                    </label>
                </div>
            </div>

            <div className="flex justify-end mt-8 text-xl">
                <button className="mr-5 hover:scale-105 transition-200" onClick={handleLogout}>Logout</button>
                <button className="ml-5 mr-1 hover:scale-105 transition-200" onClick={showDeleteModal}>Delete</button>
            </div>





        </div>



            {showDeleteConfirmationModal &&
                <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="bg-biege-form-colour p-6 mx-auto max-w-md rounded-3xl shadow-lg z-10">
                        <h3 className="text-2xl text-center mb-4">Are you sure?</h3>
                        <p className="text-center mb-4 whitespace-normal font-itim">
                            <span className="font-bold">Warning:</span> Deleting this account will permanently remove all associated data.
                        </p>
                        <div className="flex justify-center">
                            <button onClick={handleDelete} className="bg-red text-FCE3BF  text-biege-form-colour py-2 px-4 rounded-3xl w-32 mr-4">
                                Delete
                            </button>
                            <button onClick={() => setShowDeleteConfirmationModal(false)} className="bg-green text-FCE3BF  text-biege-form-colour py-2 px-4 rounded-3xl w-32">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Settings;