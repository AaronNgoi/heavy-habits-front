import { useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../firebase';

const useDeleteConfirmation = (habitId) => {
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

        } catch (error) {
            console.error("Error deleting habit", error);
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
