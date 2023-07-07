import { useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { toast } from 'react-toastify';
import {toastError} from "../helpers/toastError";
import {toastSuccess} from "../helpers/toastSuccess";


const useDeleteConfirmation = (habitId, habitName) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleDeleteModalClick = () => {
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userRef = doc(db, 'users', userId);
            const habitRef = doc(userRef, 'habits', habitId);

            await deleteDoc(habitRef);
            toastSuccess(`${habitName} has been successfully deleted!`);

        } catch (error) {
            console.error(`Error deleting ${habitName}`);
            toastError(`Failed to delete ${habitName}. Please try again later.`);

        }
        setShowDeleteConfirmation(false);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteConfirmation(false);
    };

    return {
        showDeleteConfirmation,
        handleDeleteModalClick,
        handleDeleteConfirm,
        handleDeleteModalClose,
    };
};

export default useDeleteConfirmation;
